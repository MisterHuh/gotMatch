<?php

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");
startup();

$bodyData = getBodyData();

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
  throw new Exception("attempts required to add to high scores");
}

/* if not, throw new Exception */
if ($bodyData["name"]) {    /* if $bodyData exists, carry on */
  $name = $bodyData["name"];
  if (gettype($name) !== "string") {  /* if $name is not a string, throw error */
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
