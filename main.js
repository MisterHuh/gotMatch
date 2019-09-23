$( document ).ready( initializeApp ); // when document is loaded, call initializeApp()

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardSource = null;
var secondCardSource = null;
var matches = 0;                // side bar - keeping track of matches STATS
var max_matches = 9;            // side bar - win condtion; not part of STATS
var attempts = 0;               // side bar - keeping track of the % of correct attempts STATS
var games_played = 0;           // side bar - keeping track of games played STATS

function initializeApp() {    // runs when document is loaded

  console.log("ready to roll")   // logs out mesage
  createSkeleton();               // calls createSkeleton()
  shuffleThemCards();             // calls shufleThemCards()

  $(".lfz-bgi").on("click", handleCardClick); // onClick, trigger handleCardClick()

  $(".winButton").on("click", resetStats);    // onClick, trigger resetStats()

}

function handleCardClick(event) {
  // console.log(event);
  $(event.currentTarget).addClass("hidden");
  console.log("FIRST: ", firstCardClicked);
  console.log("SECOND: ", secondCardClicked);


  if (firstCardClicked === null) {
    firstCardClicked = $(event.target);
    firstCardSource = firstCardClicked.next().css("background-image"); // pulls the source url for first card
    console.log("THIRD firstCardClicked: ", firstCardClicked);
    // console.log("firstCardSource: ", firstCardSource);
  } else {
    secondCardClicked = $(event.target);
    secondCardSource = secondCardClicked.next().css("background-image"); // pulls the source url for second card
    attempts++; // attempt counter added //
    console.log("FOURTH secondCardClicked: ", secondCardClicked)
    // console.log("secondCardSource: ", secondCardSource);
    displayStats()

    if (firstCardSource === secondCardSource) {   // nested conditional; can this be placed somewhere else?
      displayStats()
      matches++; // matches counter added //
      // console.log("cards match!" + "\n" + "current count: " + matches + "\n" + "attempts: " + attempts);
      // console.log("firstCardClicked: " + firstCardClicked + "\n" + "secondCardClicked: " + secondCardClicked + "\n" + "firstCardSource: " + firstCardSource + "\n" + "secondCardSource: " + secondCardSource)

      /* re-set all cards */
      firstCardClicked = null;
      secondCardClicked = null;
      firstCardSource = null;
      secondCardSource = null;

      console.log("SIXTH all cards resetted");

    } else if (firstCardSource !== secondCardSource) {

      /* re-set all cards + timeout */
      setTimeout(removeHidden, 2000);

      console.log("cards don't match!" + "\n" + "current count: " + matches + "\n" + "attempts: " + attempts);

      // console.log("all cards resetted");
    }
  }



  /* "modal" popup via jQuery removeClass */
  if (max_matches === matches) {
    console.log("You Won!");
    $(".winCondition").removeClass("hidden");
  }
}

var removeHidden = function() {
  console.log("FIFTH removeHidden activated");
  firstCardClicked.removeClass("hidden");
  secondCardClicked.removeClass("hidden");

  firstCardClicked = null;
  secondCardClicked = null;

  firstCardSource = null;
  secondCardSource = null;
}

// function removeHidden() {
//   console.log("removeHidden activated");
//   firstCardClicked.removeClass("hidden");
//   secondCardClicked.removeClass("hidden");

//   firstCardClicked = null;
//   secondCardClicked = null;

//   firstCardSource = null;
//   secondCardSource = null;
// }

function calculateAccuracy() {
  var accuracy = matches / attempts * 100;
  var answer = accuracy.toFixed(2);
  if (isNaN(answer)) {
    answer = 0.00
  }
  return answer + "%";
}

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
  $("aside div:nth-child(6)").text("0.00%")
  // $(".lfz-bgi").removeClass("hidden");
  $(".winCondition").addClass("hidden");
  $("#container").empty();
  createSkeleton();
  shuffleThemCards();
}

var imageArray = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12", "image13", "image14", "image15", "image16", "image17", "image18"];

function createSkeleton() {

  // this calls the randomly generated cards
  var images = shuffleThemCards();

  // #1 define the basic skeleton
  for (var index = 0; index < 18; index++) {

    var container = $("#container");
    var cardContainer = $("<div>");
    var lfzBgi = $("<div>");
    var frontImages = $("<div>");

    // #2 add classes to the newly created <div>s
    cardContainer.addClass("card-container");
    lfzBgi.addClass("lfz-bgi");
    frontImages.addClass(images[index]);

    // #3 append individual -> cardContainer, cardContainer -> DOM
    cardContainer.append(lfzBgi)
    cardContainer.append(frontImages);
    container.append(cardContainer);
  }

  // only add if necessary
  var fixEverything = $(".lfz-bgi");
  fixEverything.on("click", handleCardClick);
  return
}

function shuffleThemCards() {

  // creating a replica of the imageArray
  // newArray = imageArray does NOT work
  var newArray = [];
  for (var i = 0; i < imageArray.length; i++) {
    newArray.push(imageArray[i]);
  }

  var spliceIndex = imageArray.length; // counting down from 18? 17?
  var randomArray = []; // randomly arranged sequence
  for (var iteration = 0; iteration < imageArray.length; iteration++, spliceIndex--) {
    var randomIndex = Math.floor(Math.random() * spliceIndex); // picking the "random'th" index

    var spliceVal = newArray.splice(randomIndex, 1);
    // from the newArray, remove the "random'th" index and store it into spliceVal
    // this will guarantee that the "chosen" index will NOT be used again and be removed

    randomArray.push(spliceVal);
    // push the "random'th" index to the randomArray[];
  }

  return randomArray;
}
