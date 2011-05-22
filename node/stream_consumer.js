/* Config */
HOST = "tcd.localhost.com";


var sys = require('sys'),
  Site = require('./site').Site,
  TwitterClient = require('./twitter_client').TwitterClient,
  http = require("http"),
  querystring = require("querystring");

var StreamConsumer = function(){};
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
    this.server = TwitterClient.stream('user', {track : this.user_ids}, function(stream) {
      stream.on('data', function (data) {
        // get some data
        if(data.text){
          //try{
            self.add_tweet(data);
          // handle this - for the time being at least we won't die
          // }catch(e){
          //   console.log(e);
          // }
        }
      });
    });
  },
  stop_server : function(){
    if(this.server){
      
    }
    return true;
  },
  restart_server : function(){
    this.stop_server();
    this.start_server();
  },
  get_sites : function(){
    var self = this;
    options = {
      host : HOST,
      path : "/?q=api/follow",
      port : 80
    }
    http.get(options, function(res){
      res.on("data",function(data){
        self.user_names_to_get = [];
        data = JSON.parse("" + data);
        for(var id in data){
          if(typeof(self.sites[id]) == "undefined" || self.sites[id].last_modified < data.last_modified){
            self.add_site(new Site(id, data[id]))
          }
        }
        self.get_user_ids_and_restart();
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
    this.tweet_data.push(tweet_data);
      //this.format_data(tweet_data));
    if(this.tweet_data.length > this.max_queue_length){
      var post_data = querystring.stringify({json : JSON.stringify(this.tweet_data)});
      var options = {
        host : HOST,
        path : "?q=api/add_tweets",
        port : 80,
        method : "POST",
        headers: {  
          'Content-Type': 'application/x-www-form-urlencoded',  
          'Content-Length': post_data.length  
        }
      }
      req = http.request(options,function(res){
        res.on("data",function(data){
          console.log("" + data);
        });
      });
      req.write(post_data);
      req.end();
      this.tweet_data = [];
    }
  },
  format_data : function(tweet_data){
    var data = {};
    data.text = tweet_data.text;
    data.tweet_id = tweet_data.id_str;
    data.created_at = new Date(tweet_data.created_at).getTime();
    data.screen_name = tweet_data.user.screen_name;
    data.site_ids = this.sites_as_array().filter(function(site){
        return site.screen_names.indexOf(data.screen_name) > -1;
      }).map(function(site){
        return site.id
      });
    return data;
  }
}
exports.StreamConsumer = StreamConsumer;