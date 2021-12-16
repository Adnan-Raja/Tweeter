/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



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
   <div><p>${tweetData.content.text}</p></div>
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
// loops through tweets
for (let showObj of tweets) {
  // Targetting the container and appending the item to it
  // calls createTweetElement for each tweet
  const showElement = createTweetElement(showObj);
  $('#tweets-container').append(showElement);
  // takes return value and appends it to the tweets container
}

};

//renderTweets(data);







$(document).ready(function () {


// catch the form submit

$("#search-frm").on('submit', function (event) {
  // prevent form submission
  event.preventDefault();
  const formData = $( this ).serialize();
  const myLength = $("#tweet-text").val().length;
  console.log(myLength)
  if (myLength > 140 || myLength === 0) {
   alert("Character length exceded");
  } else {
    $.ajax("/tweets", {
      method: "POST", 
      data: formData
    
    })
    .done((results) => {
      console.log(results); // array of objects
    
      loadtweets();
    
      // with the results => create the HTML element => attach to the DOM
    })
    .fail((err) => {
      console.log(`Error: ${err.message}`);
    })
    .always(() => {
      console.log('request to TV Maze done');
    });
    
  }

  // this => <form>...</form>
    
  
  //console.log(formData)
  













const loadtweets = function() {
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
  .done(function (result) {
    renderTweets(result.reverse())
   //console.log('Success: ', JSON.stringify(result));
    
  });
}










  // .done((results) => {
  //   console.log(results); // array of objects

  //   renderTweets(results);

  //   // with the results => create the HTML element => attach to the DOM
  // })
  // .fail((err) => {
  //   console.log(`Error: ${err.message}`);
  // })
  // .always(() => {
  //   console.log('This is a tweet');
  // });

});






 
  
  
  // const $tweet = createTweetElement(tweetData);

  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  
});