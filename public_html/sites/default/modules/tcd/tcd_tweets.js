(function($){
  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      var username = settings.twitter.userName;
      var hashTag = settings.twitter.hashTag;
      var type = settings.twitter.tweetType;
      // Format these weird twitter search params.
      var userparam = 'from:' + username;
      var tagparam = '&tag:' + hashTag;

      var url ='http://search.twitter.com/search.json?q=' + userparam + tagparam;
      $.ajax({
        url: url,
        dataType: 'jsonp',
        success: updatePage,
        error: errorCallback,
      });

      function updatePage(res) {
        // Put it on the page.
        var tweet;
        if (type == 'last') {
          // If it's the last tweet then we're just going to want to get the 0 key
          tweet  = res.results[0];
          $('.field.field-name-field-mode .field-label').text(tweet.text);
        }
        else {
          var count = res.results.length;
          var key = Math.floor(Math.random() * count);
          tweet  = res.results[key];
          $('.field.field-name-field-mode .field-label').text(tweet.text);    
        }
      }

      function checkUpdate(res) {
        // Check for timestamp
        console.log(res);
      }

      function updateTweet(res) {
        // Update the Tweet in the DB.
        console.log(res);
      }

      function errorCallback(res) {
        // Error
        console.log(res);
        console.log("ERROR");
      }
    }
  };
})(jQuery);
