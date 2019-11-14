<?php

function error_handler($error) {
  $output = array(
    "success" => "false",
    "error" => $error->getMessage()
  );

  http_response_code(500);
  $json_output = json_encode($output);
  print($json_output);
}

function startup() {
  header("Content-Type: application/json");
  // header('Access-Control-Allow-Origin: *');
  // header('Access-Control-Allow-Methods: GET, POST, PUT');
}

function getBodyData() {
  $json = file_get_contents('php://input');
  $bodyData = json_decode($json, true);
  return $bodyData;
}

?>
