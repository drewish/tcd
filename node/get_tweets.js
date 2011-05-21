
// twitter-node does not modify GLOBAL, that's so rude
var TwitterNode = require('twitter-node').TwitterNode, sys = require('sys');

// you can pass args to create() or set them on the TwitterNode instance
var twit = new TwitterNode({
  user: 'dlangevin', 
  password: 'Piazza32',
  host: 'my_proxy.my_company.com',         // proxy server name or ip addr
  port: 8080,                              // proxy port!
  follow: [12345, 67890]
});

// http://apiwiki.twitter.com/Streaming-API-Documentation#QueryParameters
twit.params['count'] = 100;

// http://apiwiki.twitter.com/Streaming-API-Documentation#Methods
twit.action = 'filter'; // 'filter' is default

twit.headers['User-Agent'] = 'whatever';

// Make sure you listen for errors, otherwise
// they are thrown
twit.addListener('error', function(error) {
  console.log(error.message);
});

twit
  .addListener('tweet', function(tweet) {
    sys.puts("@" + tweet.user.screen_name + ": " + tweet.text);
  })

  .addListener('limit', function(limit) {
    sys.puts("LIMIT: " + sys.inspect(limit));
  })

  .addListener('delete', function(del) {
    sys.puts("DELETE: " + sys.inspect(del));
  })

  .addListener('end', function(resp) {
    sys.puts("wave goodbye... " + resp.statusCode);
  })

  .stream();

// This will reset the stream
twit.stream();




