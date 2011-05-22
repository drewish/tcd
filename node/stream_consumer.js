/* Config */
HOST = "tcd.localhost.com";


var sys = require('sys'),
  Site = require('./site').Site,
  TwitterClient = require('./twitter_client').TwitterClient,
  http = require("http"),
  querystring = require("querystring"),
  AddTweet = require("./add_tweet").AddTweet;

var StreamConsumer = function(push_socket){
  this.push_socket = push_socket;
};
StreamConsumer.prototype = {
  // map of user name to twitter id
  user_ids : [],
  // map of site id to Site
  sites : {},
  // queue of tweet data we flush periodically
  tweet_data : [],
  // flush every x posts
  max_queue_length : 0,
  
  /* Main method */
  main : function(){
    var self = this;
    this.running = true;
    // set up the timer, we will check for new sites every 30 seconds
    this.get_site_interval = setInterval(function(){self.get_sites()}, 30000);
    this.get_sites();
  },
  // method to exit gracefully
  exit : function(){
    this.running = false;
  },
  // start up the TwitterClient stream
  start_server : function(){
    var self = this;
    console.log("Starting Server with " + this.user_ids.join(", "));
    this.server = TwitterClient.stream('statuses/filter', {"follow" : this.user_ids.join(',')}, function(stream) {
      stream.on('data', function (data) {
        // get some data
        if(data.text){
          try{
            self.add_tweet(data);
          // handle this - for the time being at least we won't die
          } catch(e){
            console.log(e);
          }
        }
      });
    });
  },
  stop_server : function(){
    if(this.server){}
    return true;
  },
  // stop server and restart
  restart_server : function(){
    this.stop_server();
    this.start_server();
  },
  // pull in a list of sites
  get_sites : function(){
    var self = this;
    options = {
      host : HOST,
      path : "/api/follow",
      port : 80
    }
    http.get(options, function(res){
      res.on("data",function(data){
        try{
          self.user_names_to_get = [];
          data = JSON.parse("" + data);
          for(var id in data){
            if(typeof(self.sites[id]) == "undefined" || self.sites[id].last_modified < data.last_modified){
              self.add_site(new Site(id, data[id]))
            }
          }
          self.get_user_ids_and_restart();
        }catch(e){console.log(e)}
      })
    })
  },
  get_user_ids_and_restart : function(){
    var self = this;
    this.user_names_to_get.forEach(function(name){
      TwitterClient.get('/users/lookup.json', {screen_name : name}, function(data) {
        if(data instanceof Array){
          self.user_ids.push(data[0].id);
        }
        self.user_names_to_get.splice(self.user_names_to_get.indexOf(name));
        if(self.user_names_to_get.length == 0){
          self.restart_server();
        }
      });
    });
  },
  // add the site to this StreamConsumer
  add_site : function(site){
    var self = this;
    this.sites[site.id] = site;
    site.screen_names.forEach(function(name){
      if(self.user_names_to_get.indexOf(name) == -1){
        self.user_names_to_get.push(name);
      }
    });
  },
  // helper method
  sites_as_array : function(){
    var sites = [];
    for(var i in this.sites){
      sites.push(this.sites[i]);
    }
    return sites;
  },
  // add a tweet to the 
  add_tweet : function(tweet_data){
    var self = this;
    
    this.sites_as_array().forEach(function(site){
      // includes test for hash tags
      if(site.is_valid(tweet_data)){
        self.tweet_data.push(site.format_data(tweet_data))
      }
    })
    
    if(this.tweet_data.length > this.max_queue_length){
      // persist to mysql
      AddTweet.save_tweet(this.tweet_data);
      // and send this to any currently connected clients
      this.push_socket.push_data(this.tweet_data[this.tweet_data.length - 1]);
    
      this.tweet_data = [];
    }
  }
}
exports.StreamConsumer = StreamConsumer;