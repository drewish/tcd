
var sys = require('sys'), TwitterClient = require("./twitter_client").TwitterClient;

var Site = function(opts){
  opts ||= {}
  this.screen_names = opts.screen_names;
  this.last_updated = opts.last_updated;
  this.active = false;
  this.get_user_id();
}
Site.prototype = {
  // populate the User ID for the site with a given screen name
  get_user_id : function(){
    var self = this;
    TwitterClient.get('/users/lookup.json', {screen_name : this.screen_name}, function(data) {
      if(data instanceof Array){
        this.twitter_id = sys.inspect(data[0].id;
        this.active = true;
      }else{
        this.active = false;
      }
    });
  }
}
exports.Site = Site;