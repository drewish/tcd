
var sys = require('sys'), TwitterClient = require("./twitter_client").TwitterClient;

var Site = function(opts){
  opts = opts || {};
  this.screen_names = opts.screen_names;
  this.last_updated = opts.last_updated;
}
Site.prototype = {}
exports.Site = Site;