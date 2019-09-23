$( document ).ready(initializeApp);

function initializeApp() {
  let test = $("<div>").text("ready to roll");
  // test.append("#test");
  // $("#test").append(test);
  console.log("rock and roll;");
  $(".back").on("click", frontFlip);
  // $(".back").on("click", backFlip);
}

function frontFlip(event) {
  console.log("clicked");
  console.log(event);
  let currentCard = $(event.currentTarget)

  currentCard.addClass("d-none")
}

function backFlip(event) {
  console.log("clicked");
  console.log(event);
  let currentCard = $(event.currentTarget)

  currentCard.addClass("d-none")
}
