$(document).ready(initializeApp);

var firstCard, secondCard, firstCardSource, secondCardSource, accuracy, quotes, quoteAuthor, firstCardQuote, nextCard;
var correctMatches = 0;
var winConditionMatches = 9;
var attempts = 0;
var gamesPlayed = 0;

var quoteList = [
  { // 0
    author: "~ Tyrion Lannister",
    quote: "That's what I do." + "<br/>" + "I drink and I know things"
  },
  { // 1
    author: "~ Cersei Lannister",
    quote: "When you play the game of thrones," + "<br/>" + "you win or you die."
  },
  { // 2
    author: "~Daenerys Targaryen",
    quote: "My reign has just begun."
  },
  { // 3
    author: "~ Arya Stark",
    quote: "A girl has no name"
  },
  { // 4
    author: "~ Jon Snow",
    quote: "I don't want it"
  },
  { // 5
    author: "~ Jamie Lannister",
    quote: "The things I do for love"
  },
  { // 6
    author: "~ Tormund Giantsbane",
    quote: "The big woman still here?"
  },
  { // 7
    author: "~ Hodor",
    quote: "Hodor!"
  },
  { // 8
    author: "~ Joffrey Baratheon",
    quote: "I'm telling mother!"
  },
  { // 9
    author: "~ Ned Stark",
    quote: "Winter is coming"
  },
]

function initializeApp() {
  console.log("rock and roll");
  createStructure();
}

function flipCard(event) {
  $(event.currentTarget).addClass("hidden");
  if (!firstCardSource) {
    firstCard = $(event.target);
    nextCard = firstCard.next()
    firstCardSource = nextCard.css("background-image");
    nextCard = firstCard.next()
    firstCardQuote = nextCard[0]["classList"][0]
  } else {
    $('.frontImages').off("click")
    secondCard = $(event.target);
    secondCardSource = secondCard.next().css("background-image");
    attempts++;
    // firstCardSource === secondCardSource ? setTimeout(resetCards, 0) : setTimeout(unflipCards, 750)
    if (firstCardSource === secondCardSource) {
      findQuotes(firstCardQuote);
      correctMatches++;
      resetCards();
    } else {
      setTimeout(unflipCards, 750)
    }
    displayStats();
  }
  wonTheGame();
}

function findQuotes(firstCardQuote) {
  switch(firstCardQuote) {
    case "tyrionLannister":
      displayQuotes(0);
      break;
    case "cerseiLannister":
      displayQuotes(1);
      break;
    case "daenerysTargaryen":
      displayQuotes(2);
      break;
    case "aryaStark":
      displayQuotes(3);
      break;
    case "jonSnow":
      displayQuotes(4);
      break;
    case "jamieLannister":
      displayQuotes(5);
      break;
    case "tormundGiantsbane":
      displayQuotes(6);
      break;
    case "hodor":
      displayQuotes(7);
      break;
    case "joffreyBaratheon":
      displayQuotes(8);
      break;
    default:
      displayQuotes(9)
  }
}

function displayQuotes(index) {
  $("#quotes").empty();
  $("#author").empty();
  $("#quotes").removeClass();
  $("#author").removeClass();
  quotes = quoteList[index]["quote"];
  quoteAuthor = quoteList[index]["author"];
  if (index <= 1) {
    $("#quotes").addClass("styleDouble");
    $("#author").addClass("styleDouble");
  } else {
    $("#quotes").addClass("style");
    $("#author").addClass("style");
  }
  $("#quotes").append(quotes);
  $("#author").append(quoteAuthor);
}

function resetCards() {
  // firstCardSource === secondCardSource ? correctMatches++ : false;
  firstCard = null;
  firstCardSource = null;
  secondCard = null;
  secondCardSource = null;
  $(".frontImages").on("click", flipCard);
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
  $(".modalContainer").addClass("hidden");
  createStructure();
  displayStats();
}

function wonTheGame() {
  if (correctMatches === winConditionMatches) {
    gamesPlayed++;
    $(".modalContainer").removeClass("hidden");
    $('.frontImages').off("click")
  }
}

function randomCardOrder() {
  var imageArray = ["aryaStark", "cerseiLannister", "hodor", "jamieLannister", "tormundGiantsbane", "daenerysTargaryen", "jonSnow", "joffreyBaratheon", "tyrionLannister", "aryaStark", "tyrionLannister", "joffreyBaratheon", "daenerysTargaryen", "hodor", "cerseiLannister", "tormundGiantsbane", "jonSnow", "jamieLannister"];
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
  $("#cardWrapper").empty();
  $("#quotes").empty();
  $("#author").empty();
  var images = randomCardOrder();
  for (var index = 0; index < 18; index++) {
    var container = $("#cardWrapper");
    var cardContainer = $("<div>");
    var lfzBgi = $("<div>");
    var frontImages = $("<div>");
    cardContainer.addClass("cardContainer");
    lfzBgi.addClass("frontImages");
    frontImages.addClass(images[index]);
    cardContainer.append(lfzBgi);
    cardContainer.append(frontImages);
    container.append(cardContainer);
  }
  $(".frontImages").on("click", flipCard);
  $(".modalButton").on("click", resetStats);
  displayQuotes(9);
  displayStats();
}
