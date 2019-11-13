<?php

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");
startup();

$query = "SELECT * FROM `highScores` ORDER BY `attempts` ASC";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}

$output = [];
while ($row = mysqli_fetch_assoc($result)) {
  $output[] = $row;
};

if (mysqli_affected_rows($conn) >= 1) {
  print("success");
} else {
  print("no rows were affected");
}

if ($output === []) {
  print("[]");
  exit();
} else {
  print(json_encode($output));
}


?>
