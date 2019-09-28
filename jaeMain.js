$(document).ready(initializeApp);

var firstCard, secondCard, firstCardSource, secondCardSource, accuracy, quotes, quoteAuthor;
var correctMatches = 0;
var winConditionMatches = 2;
var attempts = 0;
var gamesPlayed = 0;

function initializeApp() {
  console.log("rock and roll");
  createStructure();
}

function flipCard(event) {
  $(event.currentTarget).addClass("hidden");
  if (!firstCardSource) {
    firstCard = $(event.target);
    firstCardSource = firstCard.next().css("background-image");
  } else {
    $('.lfz-bgi').off("click")
    secondCard = $(event.target);
    secondCardSource = secondCard.next().css("background-image");
    attempts++;
    // firstCardSource === secondCardSource ? setTimeout(resetCards, 0) : setTimeout(unflipCards, 750)
    if (firstCardSource === secondCardSource) {
      displayQuotes();
      correctMatches++;
      resetCards();
    } else {
      setTimeout(unflipCards, 750)
    }
    displayStats();
  }
  console.log("# of matches: ", correctMatches)
  console.log("===================")
  wonTheGame();
}

function displayQuotes() {  /* will need a switch statement for each of the match */
  $("#quotes").empty();
  $("#author").empty();
  quotes = "you've got a match";
  quoteAuthor = "The Night King";
  $("#quotes").append(quotes);
  $("#author").append(quoteAuthor);
}

function resetCards() {
  // firstCardSource === secondCardSource ? correctMatches++ : false;
  firstCard = null;
  firstCardSource = null;
  secondCard = null;
  secondCardSource = null;
  $(".lfz-bgi").on("click", flipCard);
}

function unflipCards() {
  firstCard.removeClass("hidden");
  secondCard.removeClass("hidden");
  resetCards();
}

function displayStats() {
  calculateAccuracy();
  $("#attempts").text(attempts);
  isNaN(accuracy) ? accuracy = 0 : accuracy;
  $("#accuracy").text(accuracy + "%");
  $("#gamesPlayed").text(gamesPlayed);
}

function calculateAccuracy() {
  return accuracy = ((correctMatches / attempts) * 100).toFixed(0);
}

function resetStats() {
  accuracy = 0;
  attempts = 0;
  correctMatches = 0;
  $(".winCondition").addClass("hidden");
  createStructure();
  displayStats();
}

function wonTheGame() {
  if (correctMatches === winConditionMatches) {
    gamesPlayed++;
    $(".winCondition").removeClass("hidden");
    $('.lfz-bgi').off("click")
  }
}

function randomCardOrder() {
  var imageArray = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12", "image13", "image14", "image15", "image16", "image17", "image18"];
  var randomArray = [];
  var spliceIndex = imageArray.length;
  for (var index = 0; index < 18; index++, spliceIndex--) {
    var randomNumber = Math.floor(Math.random() * spliceIndex);
    var randomIndex = imageArray.splice(randomNumber, 1);
    randomArray.push(randomIndex + " backImages");
  }
  return randomArray;
}

function createStructure() {
  $("#cards-flex-container").empty();
  var images = randomCardOrder();
  for (var index = 0; index < 18; index++) {
    var container = $("#cards-flex-container");
    var cardContainer = $("<div>");
    var lfzBgi = $("<div>");
    var frontImages = $("<div>");
    cardContainer.addClass("card-container");
    lfzBgi.addClass("lfz-bgi");
    frontImages.addClass(images[index]);
    cardContainer.append(lfzBgi);
    cardContainer.append(frontImages);
    container.append(cardContainer);
  }
  $(".lfz-bgi").on("click", flipCard);
  $(".winButton").on("click", resetStats);
  displayStats();
}
