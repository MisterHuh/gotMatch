$(document).ready(initializeApp);

var firstCard, secondCard, firstCardSource, secondCardSource, accuracy
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
    console.log("first card")
    firstCard = $(event.target);
    firstCardSource = firstCard.next().css("background-image");
  } else {
    // $('.lfz-bgi').off("click")
    console.log("second card")
    secondCard = $(event.target);
    secondCardSource = secondCard.next().css("background-image");
    attempts++;
    firstCardSource === secondCardSource ? resetCards() : setTimeout(unflipCards, 1750)
    displayStats();
    // $(".lfz-bgi").on("click", flipCard);
  }
  // $(".lfz-bgi").on("click", flipCard);
  console.log("# of matches: ", correctMatches)
  console.log("===================")
  wonTheGame();
  // $(".lfz-bgi").on("click", flipCard);
}

function resetCards() {
  firstCardSource === secondCardSource ? correctMatches++ : false;
  firstCard = null;
  firstCardSource = null;
  secondCard = null;
  secondCardSource = null;
  // $(".lfz-bgi").on("click", flipCard);
}

function unflipCards() {
  firstCard.removeClass("hidden");
  secondCard.removeClass("hidden");
  resetCards();
}

function displayStats() {
  console.log("displayStats fired")
  calculateAccuracy();
  $("#attempts").text(attempts);
  isNaN(accuracy) ? accuracy = 0 : accuracy;
  $("#accuracy").text(accuracy + "%");
  $("#gamesPlayed").text(gamesPlayed);
  // $(".lfz-bgi").on("click", flipCard);
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
  }
}

function randomCardOrder() {
  var imageArray = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12", "image13", "image14", "image15", "image16", "image17", "image18"];
  var randomArray = [];
  var spliceIndex = imageArray.length;
  for (var index = 0; index < 18; index++, spliceIndex--) {
    var randomNumber = Math.floor(Math.random() * spliceIndex);
    var randomIndex = imageArray.splice(randomNumber, 1);
    randomArray.push(randomIndex);
  }
  return randomArray;
}

function createStructure() {
  $("#container").empty();
  var images = randomCardOrder();
  for (var index = 0; index < 18; index++) {
    var container = $("#container");
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
