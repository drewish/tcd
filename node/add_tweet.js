var sys = require('sys'), 
  http = require('http'),
  querystring = require("querystring");

var AddTweet = {
  // wrapper save method - we use this in two places
  save_tweet : function(tweet_data){
    var post_data = querystring.stringify({json : JSON.stringify(tweet_data)});
    var options = {
      host : HOST,
      path : "/api/add_tweets",
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
  }
}

exports.AddTweet = AddTweet;