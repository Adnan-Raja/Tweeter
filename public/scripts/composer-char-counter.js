$(document).ready(function() {
  // "keypress registers a keyboard character except for arrow entries"
  const $tweetText = $("#tweet-text");
  const tweetCounter = $(".counter")[0];
  tweetCounter.value = 140;
   
  $tweetText.on("input", function tweetListener() {
    // console.log(tweetCounter)
    
    if (this) {
      tweetCounter.value = 140 - this.value.length;
    }
    if ((tweetCounter.value) > -1) {
      $(".counter").css({"color": "black"});
    }
    else {
      $(".counter").css({"color": "red"});
    }
    
  });
  $tweetText.on("keydown", function tweetIncreaseChar(e) {
    const key = e.key;
    if (key === "Backspace" && tweetCounter.value < 140) {
      tweetCounter.value++;
    }
    if (tweetCounter.value >= 0) {
      $(".counter").css({"color": "black"});
    }
  });
});
