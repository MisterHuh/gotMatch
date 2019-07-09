$( document ).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardSource = null;
var secondCardSource = null;
var matches = 0;
var max_matches = 9;
var attempts = 0;
var games_played = 0;

function initializeApp() {

   console.log("ready to roll")

  $(".lfz-bgi").on("click", handleCardClick);

  $(".winButton").on("click", resetStats);

}

function handleCardClick(event) {
  console.log(event);
  $(event.currentTarget).addClass("hidden");

  /*
  $("div:first-child").addClass("hidden"); // selects all divs that are first childs
  $(".lfz-bgi").addClass("hidden"); // selects ALL .lfz-bgi cards
  $("div .lfz-bgi").addClass("hidden"); // selects ALL .lfz-bgi cards
  */

  if (firstCardClicked === null) {
    firstCardClicked = $(event.target);
    firstCardSource = firstCardClicked.next().css("background-image");
    console.log("firstCardClicked: ", firstCardClicked);
    console.log("firstCardSource: ", firstCardSource);
  } else {
    secondCardClicked = $(event.target);
    secondCardSource = secondCardClicked.next().css("background-image");
    attempts++; // attempt counter added //
    console.log("secondCardClicked: ", secondCardClicked)
    console.log("secondCardSource: ", secondCardSource);
    displayStats()
    if (firstCardSource === secondCardSource) {
      displayStats()
      matches++; // matches counter added //
      console.log("cards match!" + "\n" + "current count: " + matches + "\n" + "attempts: " + attempts);
      // console.log("firstCardClicked: " + firstCardClicked + "\n" + "secondCardClicked: " + secondCardClicked + "\n" + "firstCardSource: " + firstCardSource + "\n" + "secondCardSource: " + secondCardSource)

      /* re-set all cards */
      firstCardClicked = null;
      secondCardClicked = null;
      firstCardSource = null;
      secondCardSource = null;

      console.log("all cards resetted")

    } else if (firstCardSource !== secondCardSource) {

      /* re-set all cards + timeout */
      setTimeout(removeHidden, 200);

      console.log("cards don't match!" + "\n" + "current count: " + matches + "\n" + "attempts: " + attempts);

      console.log("all cards resetted");
    }
  }
  /* "modal" popup via jQuery removeClass */
  if (max_matches === matches) {
    // games_played++;
    console.log("games played: " + games_played)
    $(".winCondition").removeClass("hidden");
  }
}


var removeHidden = function() {
  firstCardClicked.removeClass("hidden");
  secondCardClicked.removeClass("hidden");

  firstCardClicked = null;
  secondCardClicked = null;

  firstCardSource = null;
  secondCardSource = null;
}

function calculateAccuracy() {
  var accuracy = matches / attempts * 100;
  var answer = accuracy.toFixed(2);
  if (isNaN(answer)) {
    answer = 0
  }
  return answer + "%";
}

// function displayStats() {
//   $("#gamesPlayed").text(games_played);
//   $("#attempts").text(attempts);
//   $("#accuracy").text(calculateAccuracy);
// }

function displayStats() {
  // $("aside div:nth-child(2)").text(games_played);
  $("aside div:nth-child(4)").text(attempts);
  $("aside div:nth-child(6)").text(calculateAccuracy)
}

function resetStats() {
  matches = 0;
  attempts = 0;
  games_played++;
  $("aside div:nth-child(2)").text(games_played);
  $("aside div:nth-child(4)").text(attempts);
  $("aside div:nth-child(6)").text(calculateAccuracy)
  $(".lfz-bgi").removeClass("hidden");
  $(".winCondition").addClass("hidden");
}
