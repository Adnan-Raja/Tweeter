/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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

renderTweets(data);







$(document).ready(function () {


// catch the form submit

$("#search-frm").on('submit', function (event) {
  // prevent form submission
  event.preventDefault();

  // this => <form>...</form>
  console.log($( this ).serialize())
  const formData = $( this ).serialize();

// const inputBox = $(this).children('textarea[id="tweet-text"]');
// const string = JSON.stringify(this[0]);




const url = `http://localhost:8080/tweets`;

$.ajax("/tweets", {method: "POST", data: formData})
// $.ajax({
//   url: url,
//   method: 'POST',
// })
  .done((results) => {
    console.log(results); // array of objects

    renderTweets(results);

    // with the results => create the HTML element => attach to the DOM
  })
  .fail((err) => {
    console.log(`Error: ${err.message}`);
  })
  .always(() => {
    console.log('This is a tweet');
  });

});






 
  
  
  // const $tweet = createTweetElement(tweetData);

  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  
});