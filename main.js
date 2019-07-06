$( document ).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

var firstCardSource = null;
var secondCardSource = null;

function initializeApp() {
  console.log("ready to roll")

  $(".lfz-bgi").on("click", handleCardClick);
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
    console.log("firstCardClicked: ", firstCardClicked)
    console.log("firstCardSource: ", firstCardSource);
  } else {
    secondCardClicked = $(event.target);
    secondCardSource = secondCardClicked.next().css("background-image");
    console.log("secondCardClicked: ", secondCardClicked)
    console.log("secondCardSource: ", secondCardSource);

    if (firstCardSource === secondCardSource) {
      matches++;
      console.log("cards match!" + "\n" + "current count: " + matches);
      console.log("firstCardClicked: " + firstCardClicked + "\n" + "secondCardClicked: " + secondCardClicked + "\n" + "firstCardSource: " + firstCardSource + "\n" + "secondCardSource: " + secondCardSource)

      /* reset all cards */
      firstCardClicked = null;
      secondCardClicked = null;
      firstCardSource = null;
      secondCardSource = null;

      console.log("all cards resetted")

    } else if (firstCardSource !== secondCardSource) {

      /* rest all cards + timeout */
      setTimeout(removeHidden, 1500);

      console.log("cards don't match!" + "\n" + "current count: " + matches);

      console.log("all cards resetted");
    }
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
