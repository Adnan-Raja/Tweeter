/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//renderTweets();


$(document).ready(function () {




  const createTweetElement = function(tweetData) {
    const date = timeago.format(tweetData.created_at)
    const $tweet = $(`
    <article>
    <div >
      <header class="head">
        <div class="namePic"><img class="icon" src=${tweetData.user.avatars}>
        <p class="name">${tweetData.user.name}</p> </div>
        <div class="mrIsaac">${tweetData.user.handle}</div>
      </header>   
    
    </div>
     <div><p>${escape(tweetData.content.text)}</p></div>
    <footer>
      <p class="timeCount">${date}</p>
      <div class="rightFoot">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-retweet"></i>        
      </div>
    </footer>
    </article>
    `)
    return $tweet;
  
  };
  
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    // loops through tweets
  for (let showObj of tweets) {
    // Targetting the container and appending the item to it
    // calls createTweetElement for each tweet
    const showElement = createTweetElement(showObj);
    $('#tweets-container').prepend(showElement);
    // takes return value and appends it to the tweets container
  }
  
  };
  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


// catch the form submit

$("#search-frm").on('submit', function (event) {
  // prevent form submission
  event.preventDefault();

  //Form data is serialized.
  const formData = $( this ).serialize();

  //length of message is checked and validated
  const myLength = $("#tweet-text").val().length;
  //console.log(myLength)
  if (myLength === 0) {
   alert("Write something to post");
  } else if (myLength > 140) {
    alert("Character limit exceded");
   }  else {
     //post form data to /tweets
    $.ajax("/tweets", { 
      method: "POST", 
      data: formData
    
    })
    //.then(loadtweets)
    .done((results) => {
        loadtweets(results);
    
    })
    .fail((err) => {
      console.log(`Error: ${err.message}`);
    })
    .always(() => {
      console.log('request to Tweet done');
    });
    
  }




});

const loadtweets = function() {
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
  .done(function (result) {
    renderTweets(result)
  });
}
loadtweets();

});