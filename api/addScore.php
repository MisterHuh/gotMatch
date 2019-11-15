<?php

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");
startup();

$bodyData = getBodyData();

if ($bodyData["attempts"]) {
  $attempts = $bodyData["attempts"];
  if (gettype($attempts) !== "integer") {
    throw new Exception("attempts must be a number");
  }
  if (intval($attempts) < 1) {
    throw new Exception("attempts must be greater than 0");
  }
} else {
  throw new Exception("attempts required to add to high scores");
}

if ($bodyData["name"]) {
  $name = $bodyData["name"];
  if (gettype($name) !== "string") {
    throw new Exception("name cannot contain a number");
  };
} else {
  throw new Exception("name required to add to high scores");
}

$query = "INSERT INTO `highScores`
          SET `name` = '$name',
              `attempts` = '$attempts'";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}

print ("insertion successful");

?>
