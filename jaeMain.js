$(document).ready(initializeApp);


/* organize the global variables */
var firstCard, secondCard, firstCardSource, secondCardSource, accuracy, firstCardQuote, nextCard;
var correctMatches = 0;
var winConditionMatches = 9;
var attempts = 0;
var gamesPlayed = 0;

var charList = [
  { // 0
    author: "Tyrion Lannister",
    quote: "That's what I do." + "<br/>" + "I drink and I know things",
    gif: "./GoT/tyrionGif.gif"
  },
  { // 1
    author: "Cersei Lannister",
    quote: "When you play the game of thrones," + "<br/>" + "you win or you die.",
    gif: "./GoT/cerseiGif.gif"
  },
  { // 2
    author: "Daenerys Targaryen",
    quote: "My reign has just begun.",
    gif: "./GoT/daenerysGif.gif"
  },
  { // 3
    author: "Arya Stark",
    quote: "A girl has no name",
    gif: "./GoT/aryaGIf.gif"
  },
  { // 4
    author: "Jon Snow",
    quote: "I don't want it",
    gif: "./GoT/jonGif.gif"
  },
  { // 5
    author: "Jamie Lannister",
    quote: "The things I do for love",
    gif: "./GoT/jamieGif.gif"
  },
  { // 6
    author: "Tormund Giantsbane",
    quote: "The big woman still here?",
    gif: "./GoT/tormundGif.webp"
  },
  { // 7
    author: "Hodor",
    quote: "Hodor!",
    gif: "./GoT/hodorGif.gif"
  },
  { // 8
    author: "Joffrey Baratheon",
    quote: "I'm telling mother!",
    gif: "./GoT/joffreyGif.gif"
  },
  { // 9
    author: "Ned Stark",
    quote: "Winter is coming",
    gif: "./GoT/firstGif.gif"
  },
];


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
    firstCardQuote = nextCard[0]["classList"][0]
  } else {
    $('.frontImages').off("click")
    secondCard = $(event.target);
    secondCardSource = secondCard.next().css("background-image");
    attempts++;
    // firstCardSource === secondCardSource ? setTimeout(resetCards, 0) : setTimeout(unflipCards, 750)
    if (firstCardSource === secondCardSource) {
      findAuthor(firstCardQuote);
      correctMatches++;
      resetCards();
    } else {
      setTimeout(unflipCards, 750)
    }
    displayStats();
  }
  wonTheGame();
}

function findAuthor(firstCardQuote) {
  switch(firstCardQuote) {
    case "tyrionLannister":
      displayGifQuote(0);
      break;
    case "cerseiLannister":
      displayGifQuote(1);
      break;
    case "daenerysTargaryen":
      displayGifQuote(2);
      break;
    case "aryaStark":
      displayGifQuote(3);
      break;
    case "jonSnow":
      displayGifQuote(4);
      break;
    case "jamieLannister":
      displayGifQuote(5);
      break;
    case "tormundGiantsbane":
      displayGifQuote(6);
      break;
    case "hodor":
      displayGifQuote(7);
      break;
    case "joffreyBaratheon":
      displayGifQuote(8);
      break;
    default:
      displayGifQuote(9)
  }
}

function displayGifQuote(index) {
  $("img").remove();
  var gifContainer = $("<img>");
  var source = charList[index]["gif"]
  var img = gifContainer.attr("src", source);
  img.addClass("gifSize");
  $("#gif").append(img);

  var quotes, quoteAuthor;
  $("#quotes").empty();
  $("#author").empty();
  $("#quotes").removeClass();
  $("#author").removeClass();
  quotes = charList[index]["quote"];
  quoteAuthor = "~ " + charList[index]["author"];
  if (index <= 1) {
    $("#quotes").addClass("doubleLineQuotes");
    $("#author").addClass("doubleLineQuotes");
  } else {
    $("#quotes").addClass("singleLineQuotes");
    $("#author").addClass("singleLineQuotes");
  }

  var author = document.getElementById("author");
  var quotesT = document.getElementById("quotes");
  fade(author, quotesT);

  $("#quotes").append(quotes);
  $("#author").append(quoteAuthor);
}

function fade(author, quotesT) {
  author.classList.toggle("fade");
  quotesT.classList.toggle("fade");
  console.log("fade triggered");
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
  // var imageArray = ["aryaStark", "cerseiLannister", "hodor", "jamieLannister", "tormundGiantsbane", "daenerysTargaryen", "jonSnow", "joffreyBaratheon", "tyrionLannister", "aryaStark", "tyrionLannister", "joffreyBaratheon", "daenerysTargaryen", "hodor", "cerseiLannister", "tormundGiantsbane", "jonSnow", "jamieLannister"];
  var imageArray = ["cerseiLannister", "cerseiLannister", "cerseiLannister", "cerseiLannister", "tyrionLannister", "tyrionLannister", "tyrionLannister", "tyrionLannister", "tyrionLannister", "tyrionLannister", "daenerysTargaryen", "daenerysTargaryen", "daenerysTargaryen", "daenerysTargaryen", "daenerysTargaryen", "daenerysTargaryen", "cerseiLannister", "cerseiLannister"]
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
  displayGifQuote(9);
  displayStats();
}
