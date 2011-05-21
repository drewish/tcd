var sys = require('sys'),
  Site = require('./site').Site,
  TwitterClient = require('./twitter_client');

var StreamConsumer = function(){};
StreamConsumer.prototype = {
  sites : {},
  /* Main method */
  main : function(){
    this.running = true;
    // set up the timer, we will check for new sites every 30 seconds
    this.get_site_interval = setInterval(this.get_sites, 30000);
    this.get_sites();
    // hang out here until somebody kills us
    while(this.running){}
    
    // when killed, remove the timer
    removeInterval(this.get_site_interval);
    // and gracefully stop the server
    this.stop_server();
  },
  // method to exit gracefully
  exit : function(){
    this.running = false;
  },
  // start up the TwitterClient stream
  start_server : function(){
    
    this.server = TwitterClient.stream('statuses/sample', function(stream) {
      stream.on('data', function (data) {
        // get some data
        sys.puts(sys.inspect(data));
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
    this.sites['a'] = new Site({last_modified : new Date(), screen_names : ['dlangevin']})
    restart_server = true;
    if(restart_server){
      this.restart_server();
    }
  },
  add_site : function(){},
  add_tweet : function(){}
}
exports.StreamConsumer = StreamConsumer;