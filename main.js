$( document ).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

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

  // if (firstCardClicked === null) {
  //   $("div").on("click", function() {
  //     firstCardClicked = $("#container .card-container div:eq(3)").attr("class");
  //     alert(firstCardClicked);
  //   })
  // }


  // if (firstCardClicked === null) {

  //   // firstCardClicked = $(".card-container div:nth-child(2)").val();

  //   /* this grabs the "lfg-bgi hidden" class */
  //   // firstCardClicked = $(this).attr("class");
  //   // firstCardClicked = $(event.currentTarget).attr("class");

  //   /* this grabs the "aside-box" class */
  //   // firstCardClicked = $("div:nth-of-type(2)").attr("class");

  //   /* this grabs the "2nd DIV of the .card-container", which is always "image2" */
  //   firstCardClicked = $(".card-container div:nth-child(2)").attr("class");
  //   console.log(firstCardClicked);
  // } else /* if (firstCardClicked !== null)  */ {
  //   secondCardClicked = $(".card-container div:nth-child(2)").attr("class");
  //   console.log(secondCardClicked);
  // }
