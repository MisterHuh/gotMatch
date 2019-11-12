
<?php

// var_dump("TEST");

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");
startup();
getBodyData();

$receivedData = (array) $data;

var_dump($receivedData);

// $item = file_get_contents('php://input');
// $jsonBody = getBodyData($item);

// include error checking for name
// make sure it's a string. if not, throw error
// if name doesn't exist, throw error

// include error checking for attempts
// make sure it's a number, if not, throw error
// make sure it's a number and NOT a 0; if not, throw error
// if it doesn't exist, throw error

// $name = $jsonBody["name"];
// $attempts = $jsonBody["attempts"];

$name = $receivedData["name"];
$attempts = $receivedData["attempts"];

// var_dump($name);

$query = "INSERT INTO `highScores` (`name`, `attempts`)
          VALUES ('$name', '$attempts')";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}

?>
