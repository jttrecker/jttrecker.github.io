// event bindings for interacting with the DOM
$(document).ready(function(){
  // load the first round of tweets.
  app.update(app.currentStream());

  // check to see if new tweets have been submitted
  setInterval(function(){app.checkForNew(app.currentStream())},app.updateSpeed);

  // enable text input for username and change focus to it when click on edit button
  $(".editIcon").on("click",function(){
    $("#userName").prop("disabled",false);
    $("#userName").focus();
  });
  // disable username input field when focus is lost
  $("#userName").on("focusout",function(){
    $(this).prop("disabled",true);
  });
  // when a username in a message is clicked on go to that users stream
  $("body").on("click",".userName",function(){
    var selectedUser = $(this).text().slice(1);
    app.selectStream(selectedUser);
  });
  // when a users icon in their message is clicked go to that users steram
  $("body").on("click",".icon",function(){
    var selectedUser = $(this).parent().find(".userName").text().slice(1);
    app.selectStream(selectedUser);
  });
  // send a message when enter key is pressed in the message input field
  $("#newInputText").on("keydown",function(event){
    if(event.which === 13) { // check if enter key is pressed.
      app.addNewTweet();
    }
  });
  // send a message when the post button is clicked
  $("#newInputButton").on("click",function(){
    app.addNewTweet();
  });
  // load all new unloaded message when clicked
  $("#showNewText").on("click",function(){
    app.update(app.currentStream());
  });
  // revert stream to the main stream, showing all users
  $(".showAll").on("click",function(){
    app.showAll();
  });
});

// using module design pattern to structure code.
var app = (function(){
  var updateSpeed = 500; // check for new tweets ever 1/2 second by default
  var currentTweets = 0; // start counter for tweets at 0
  var defaultStream = streams.home; // set the default stream for viewing all posts by all users
  var currentStream = defaultStream; // initialize the current stream to the default stream
  // change the stream back to default and switch to main interface
  function showAll(){
    currentStream = defaultStream;
    update(currentStream);
    $("#currentFilter").slideUp();
    $("#inputWrapper").slideDown();
  }
  // change from main stream to a single users stream and change interface
  function selectStream(selectedUser){
    currentStream = streams.users[selectedUser];
    update(currentStream);

    var $icon = $("#heroIcon");
    $icon.jdenticon(md5(selectedUser));

    $("#currentFilter").slideDown();
    $("#filteredUser").text(selectedUser);
    $("#inputWrapper").slideUp();
    $("html, body").animate({ scrollTop: 0 },"slow");
  }
  // Check username and content of tweet and add new tweet if both are not empty
  function addNewTweet(){
    var userName = $("#userName").val();
    if(userName !== "") {
      visitor = userName;
    } else {
      $("#userName").val("visitor");
      visitor = "visitor";
    }

    if(!streams.users[visitor]){
      streams.users[visitor] = [];
    }

    var updateText = $("#newInputText").val();
    if(updateText !== "") {
      writeTweet(updateText);
      $("#newInputText").val("");
      update(currentStream);
    }
  }
  // check if there have been new tweets since last update and if so display a link to load them
  function checkForNew(stream){
    var newNumber = stream.length;
    var diff = newNumber - currentTweets;
    if(currentTweets < newNumber){
      $("#showNewText").slideDown();
      $("#showNewText").text("Load " + diff + " new tweets");
    } else {
      $("#showNewText").slideUp();
    }
  }
  // go through all tweets for the currently selected stream and append them to the page after clearing it of all old tweets.
  function update(stream){
    currentTweets = stream.length;
    var $tweets = $("#tweets");
    $tweets.html('');
    var index = stream.length - 1;
    while(index >= 0){
      var tweet = stream[index];
      var $tweet = $("<div class='tweet padTwentyFive overflowAuto'></div>");
      var $userWrapper = $("<div class='widthTwenty centerText left'></div>");
      var $icon = $("<canvas width='100' height='100' id='icon' class='pointer whiteBack icon' />");
      $icon.jdenticon(md5(tweet.user));
      var $user = $("<p class='userName pointer blueText boldFont underLined padFive'></p> ");
      $user.text("@" + tweet.user);
      var $time = $("<p class='blueLightText padFive'></p>");
      var time = " " + moment(tweet.created_at).fromNow();
      $time.text(time);
      var $message = $("<div class='right message bigFont whiteBack padFive widthEighty heightOneHundred'></div>");
      $message.text(tweet.message);
      $icon.appendTo($userWrapper);
      $user.appendTo($userWrapper);
      $time.appendTo($userWrapper);
      $userWrapper.appendTo($tweet);
      $message.appendTo($tweet);
      $tweet.appendTo($tweets);
      index -= 1;
    }
  }
  // return object to manipulate the app
  return {
    update: update,
    showAll: showAll,
    updateSpeed: updateSpeed,
    checkForNew: checkForNew,
    addNewTweet: addNewTweet,
    selectStream: selectStream,
    currentStream: function(){return currentStream}
  }
})();