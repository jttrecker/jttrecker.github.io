$(document).ready(function(){
  var $tweets = $('ul');
  $tweets.html('');

  // history of most recent tweets 
  var index = streams.home.length - 1;
  while(index >= 0) {
    var tweet = streams.home[index];
    var timestamp = moment(tweet.created_at).fromNow();
    var $tweet = $('<li class="tweets"></li>');
    var $user = $('<a href="#" class="user"></a>');
    
    $user.attr('data-user', tweet.user);
    $user.text('@' + tweet.user);
    $tweet.text(': ' + tweet.message + " ....... " + timestamp);

    $user.prependTo($tweet);
    $tweet.appendTo($tweets)
    index--;
  }

  // visitor tweet behavior
  $('.btn').on('click', function() {
    var $tweet = $('<li class="tweets"></li>');
    var newTweet = $('.textbox').val();
    $tweet.text('@visitor' + ': ' + newTweet + " ....... " + timestamp);
    $tweet.prependTo($tweets);
  })

  // user tweet history
  $('.user').on('click', function() {
    $('li').remove();
    $('.inputs').remove();

    var user = $(this).data('user');
    var index = streams.users[user].length - 1;
    $('.title').text(user + "'s tweets");
    var tweetNum = 0;

    while(tweetNum <= index) {
      var $tweet = $('<li class="tweets"></li>');
      var tweet = streams.users[user][tweetNum];
      var timestamp = moment(tweet.created_at).fromNow();

      $tweet.text(tweet.message + " ....... " + timestamp);
      $tweet.appendTo($tweets);

      tweetNum++;
    }

  })

});