<?php

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");
startup();

$query = "SELECT * FROM highScores ORDER BY attempts ASC, date ASC";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}

$output = [];
while ($row = mysqli_fetch_assoc($result)) {
  $output[] = $row;
};

if ($output === []) {
  print("[]");
  exit();
} else {
  print(json_encode($output));
}


?>
