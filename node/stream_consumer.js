var sys = require('sys'),
  Site = require('./site').Site,
  TwitterClient = require('./twitter_client').TwitterClient;

var StreamConsumer = function(){};
StreamConsumer.prototype = {
  // map of user name to twitter id
  user_ids : [],
  sites : {},
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
    console.log("starting Server");
    this.server = TwitterClient.stream('user', {track : this.user_ids}, function(stream) {
      stream.on('data', function (data) {
        // get some data
        console.log(sys.inspect(data));
        if(data.text){
          self.add_tweet(data);
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
    // var restart_server = false;
    // // perform a get to pull in some data about sites
    // [].each(function(index, el){
    //   if(!this.sites[index] || this.sites[index].last_modified < el.last_modified){
    //     this.sites[index] = new Site(el);
    //     restart_server = true;
    //   }
    // })
    this.user_names_to_get = [];
    if(this.user_ids.length == 0){
      this.add_site(new Site({last_modified : new Date(), screen_names : ['dlangevin']}));
    }
    this.get_user_ids_and_restart();
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
  // add the site to this
  add_site : function(site){
    var self = this;
    this.sites[site.id] = site;
    console.log(site.screen_names);
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
  add_tweet : function(tweet_data){
    console.log(this.sites_as_array());
    
  }
}
exports.StreamConsumer = StreamConsumer;