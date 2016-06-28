$(document).ready(function(){
  var $tweets = $('ul');
  $tweets.html('');

  var index = streams.home.length - 1;
  while(index >= 0) {
    var tweet = streams.home[index];
    var timestamp = moment().startOf('second').fromNow();
    var $tweet = $('<li class="tweets"></li>');
    var $user = $('<a href="#" class="user"></a>');
    
    $user.attr('data-user', tweet.user);
    $user.text('@' + tweet.user);
    $tweet.text(': ' + tweet.message + " ....... " + timestamp);

    $user.prependTo($tweet);
    $tweet.appendTo($tweets)
    index -= 1;
  }

  $('.btn').on('click', function() {
    var $tweet = $('<li class="tweets"></li>');
    var newTweet = $('.textbox').val();
    $tweet.text('@visitor' + ': ' + newTweet + " ....... " + timestamp);
    $tweet.prependTo($tweets);
  })
});


// when the DOM's ready
// append two sets of elements to html
  // 1. user info, including...
    // a. user icon
    // b. linked user name
    // c. time stamp
  // 2. text box containing tweet