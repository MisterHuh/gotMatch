<?php

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");
startup();

$bodyData = getBodyData();
$name = $bodyData["name"];
// $attempts = $bodyData["attempts"];

// print($name);
// print($attempts);

/* if not, throw new Exception */
if ($bodyData["attempts"]) {  /* if $bodyData exists, carry on */
  $attempts = $bodyData["attempts"];
  if (gettype($attempts) !== "integer") { /* if $attempts is not a number, throw error */
    throw new Exception("attempts must be a number");
  }
  if (intval($attempts) < 1) { /* if intval($attempts) is less than zero, throw error */
    throw new Exception("attempts must be greater than 0");
  }
} else {                /* if $bodyData doesn't exist, throw error */
  throw new Exception("attempts required to add to cart");
}

// include error checking for name
// make sure it's a string. if not, throw error
// if name doesn't exist, throw error

if ($bodyData["name"]) {    /* if $bodyData exists, carry on */
  $name = $bodyData["name"];
  if (gettype($name) !== "string") {  /* if $name is not a string, throw error */
    throw new Exception("name cannot contain a number");
  };
} else {
  throw new Exception("name required to add to cart");
}

var_dump($name);

// $query = "INSERT INTO `highScores` (`name`, `attempts`)
//           VALUES ('$name', '$attempts')";

$query = "INSERT INTO `highScores`
          SET `name` = '$name',
              `attempts` = '$attempts'";

// $query = "INSERT INTO `highScores` (`name`)
//           VALUES ('$name')";

$result = mysqli_query($conn, $query);

// if (mysqli_affected_rows($conn) >= 1) {
//   print("success");
// } else {
//   print("no rows were affected");
// }


if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}

?>
