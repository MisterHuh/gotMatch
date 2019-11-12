$(document).ready(initializeApp);

var firstCard, secondCard, firstCardSource, secondCardSource, accuracy, firstCardQuote, nextCard;
var correctMatches = 0, attempts = 0, gamesPlayed = 0;
var winConditionMatches = 1;
var sound = false;

var charList = [
  {
    author: "Tyrion Lannister",
    quote: "That's what I do." + "<br/>" + "I drink and I know things",
    gif: "./assets/tyrionGif.gif"
  },
  {
    author: "Cersei Lannister",
    quote: "When you play the game of thrones," + "<br/>" + "you win or you die.",
    gif: "./assets/cerseiGif.gif"
  },
  {
    author: "Daenerys Targaryen",
    quote: "My reign has just begun.",
    gif: "./assets/daenerysGif.gif"
  },
  {
    author: "Arya Stark",
    quote: "A girl has no name",
    gif: "./assets/aryaGIf.gif"
  },
  {
    author: "Jon Snow",
    quote: "I don't want it",
    gif: "./assets/jonGif.gif"
  },
  {
    author: "Jamie Lannister",
    quote: "The things I do for love",
    gif: "./assets/jamieGif.gif"
  },
  {
    author: "Tormund Giantsbane",
    quote: "The big woman still here?",
    gif: "./assets/tormundGif.webp"
  },
  {
    author: "Hodor",
    quote: "Hodor!",
    gif: "./assets/hodorGif.gif"
  },
  {
    author: "Joffrey Baratheon",
    quote: "I'm telling mother!",
    gif: "./assets/joffreyGif.gif"
  },
  {
    author: "Ned Stark",
    quote: "Winter is coming",
    gif: "./assets/firstGif.gif"
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
  $("#quotes").append(quotes);
  $("#quotes").fadeIn("slow");
  $("#author").append(quoteAuthor);
}

function resetCards() {
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
  renderSoundButton();
  $("#mute").on("click", muteSound);
}

function wonTheGame() {
  if (correctMatches === winConditionMatches) {
    gamesPlayed++;
    $(".userInputModal").removeClass("hidden");
    $(".userInputButton").on("click", removeUserInputModal)
    $('.frontImages').off("click")
  }
}

function removeUserInputModal() {
  $(".userInputModal").addClass("hidden");
  $(".modalContainer").removeClass("hidden");
}

function muteSound() {
  var audio = document.getElementById("audio");
  var audioStatus = document.getElementById("audio").muted

  var play = "./assets/soundOn.png";
  var mute = "./assets/soundMuted.png"
  var soundButtonContainer = $("<img>");

  $("#mute").empty();

  if (!sound) {
    sound = true;
    audio.play();
    soundButtonContainer.attr("src", play);
    soundButtonContainer.attr("loop", true);
  } else {
    audio.muted = !audio.muted;
    if (audioStatus) {
      soundButtonContainer.attr("src", play)
    } else {
      soundButtonContainer.attr("src", mute)
    }
  }
  $("#mute").append(soundButtonContainer)
}

function startWithMusic() {
  sound = true;
  var audio = document.getElementById("audio");
  audio.play();
  renderSoundButton();
}

function startWithoutMusic() {
  sound = false;
  renderSoundButton();
}

function renderSoundButton() {
  $("#mute").empty();

  var soundButtonContainer = $("<img>");

  var play = "./assets/soundOn.png";
  var mute = "./assets/soundMuted.png"

  if (sound) {
    soundButtonContainer.attr("src", play)
  } else {
    soundButtonContainer.attr("src", mute)
  }

  $("#greetings").addClass("hidden");
  $(".frontImages").on("click", flipCard);
  $("#mute").append(soundButtonContainer)
}

function randomCardOrder() {
  // var imageArray = ["aryaStark", "cerseiLannister", "hodor", "jamieLannister", "tormundGiantsbane", "daenerysTargaryen", "jonSnow", "joffreyBaratheon", "tyrionLannister", "aryaStark", "tyrionLannister", "joffreyBaratheon", "daenerysTargaryen", "hodor", "cerseiLannister", "tormundGiantsbane", "jonSnow", "jamieLannister"];
  var imageArray = ["cerseiLannister", "cerseiLannister", "cerseiLannister", "tyrionLannister", "daenerysTargaryen", "daenerysTargaryen", "tyrionLannister", "daenerysTargaryen", "tyrionLannister", "cerseiLannister", "tyrionLannister", "daenerysTargaryen", "daenerysTargaryen", "cerseiLannister", "cerseiLannister", "daenerysTargaryen", "tyrionLannister", "tyrionLannister"];
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
  $(".modalButton").on("click", resetStats);
  $(".sound").on("click", startWithMusic)
  $(".noSound").on("click", startWithoutMusic);

  $("#mute").on("click", muteSound);
  displayGifQuote(9);
  displayStats();
}
