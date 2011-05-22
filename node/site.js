
var sys = require('sys'), 
  TwitterClient = require("./twitter_client").TwitterClient, 
  AddTweet = require("./add_tweet").AddTweet;

var Site = function(id, opts){
  opts = opts || {};
  this.id = id;
  this.hash_tag = opts.hash_tag || "";
  this.screen_names = opts.screen_names;
  this.last_updated = opts.last_updated;
  this.get_recent_tweets();
}
Site.prototype = {
  format_data : function(tweet_data){
    var data = {};
    data.text = tweet_data.text.replace("#" + this.normalized_hash_tag(),'');
    data.tweet_id = tweet_data.id_str;
    data.created_at = new Date(tweet_data.created_at).getTime();
    if(typeof(tweet_data.user) != "undefined"){
      data.screen_name = tweet_data.user.screen_name;
    }else{
      data.screen_name = tweet_data.from_user;
    }
    data.site_id = this.id
    return data;
  },
  // we get recent tweets when we load a site
  get_recent_tweets : function(){
    var self = this;
    var hash_tag = this.normalized_hash_tag();
    var tweet_data = [];
    this.screen_names.forEach(function(name){
      var query = "from:" + name;
      if(hash_tag.length > 0){
        query += " #" + hash_tag;
      }
      // search for posts and try to add them to the db
      TwitterClient.get('/search.json', {q : query}, function(data) {
        if(data.results instanceof Array){
          var post_data = [];
          data.results.forEach(function(res){
            post_data.push(self.format_data(res));
          });
          try{
            AddTweet.save_tweet(post_data);
          }catch(e){console.log(e)}
        }
      });
    })
    var query = this.screen_names;
  },
  // check to see if a given tweet is valid for this site
  is_valid : function(tweet_data){
    // check to make sure we have the right screen name
    if(this.screen_names.indexOf(tweet_data.user.screen_name) <= -1){
      return false;
    }
    // if we have a hash tag - test it here
    if(typeof(this.hash_tag == "string")){
      hash_tag = this.normalized_hash_tag();
      if(hash_tag.length > 0){
        return new RegExp("(^| )#" + hash_tag + "( |$)").test(tweet_data.text);
      }
    }
    return true
  },
  // normalize hash tag by only including alphanumeric characters
  normalized_hash_tag : function(){
    return this.hash_tag.replace(/[^a-z0-9_\-]/ig,'');
  }
}
exports.Site = Site;