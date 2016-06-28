$(document).ready(function(){
  var $tweets = $('ul');
  // $twitts.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<li class="tweets"></li>');
    var $user = $('<a href="#" class="user"></a>');
    
    
    
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($tweets);
    index -= 1;
  }

});


// when the DOM's ready
// append two sets of elements to html
  // 1. user info, including...
    // a. user icon
    // b. linked user name
    // c. time stamp
  // 2. text box containing tweet