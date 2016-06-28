$(document).ready(function(){
  var $tweets = $('ul');
  var $tweet = $('<li class="tweets"></li>');
  // $twitts.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<li class="tweets"></li>');
    var timestamp = moment().startOf('second').fromNow();
    var $user = $('<a href  ="#" class="user"></a>');
    
    $tweet.text('@' + tweet.user + ': ' + tweet.message + " ....... " + timestamp);
    $tweet.appendTo($tweets);
    index -= 1;
  }

  $('.btn').on('click', function() {
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