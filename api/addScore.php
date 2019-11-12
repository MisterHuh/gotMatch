<?php

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");
startup();

$bodyData = getBodyData();

// include error checking for name
// make sure it's a string. if not, throw error
// if name doesn't exist, throw error

// include error checking for attempts
// make sure it's a number, if not, throw error
// make sure it's a number and NOT a 0; if not, throw error
// if it doesn't exist, throw error

// $name = $jsonBody["name"];
// $attempts = $jsonBody["attempts"];

$name = $bodyData["name"];
$attempts = $bodyData["attempts"];

print($name);
print($attempts);

// var_dump($name);

// $query = "INSERT INTO `highScores` (`name`, `attempts`)
//           VALUES ('$name', '$attempts')";

$query = "INSERT INTO `highScores`
          SET `name` = '$name',
              `attempts` = '$attempts'";

// $query = "INSERT INTO `highScores` (`name`)
//           VALUES ('$name')";

$result = mysqli_query($conn, $query);

/* error checking to make sure that the query updated at least 1 row */
if (mysqli_affected_rows($conn) >= 1) { /* if at least 1 row was affected */
  print("success");
} else {
  print("no rows were affected");
}


if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}

?>
