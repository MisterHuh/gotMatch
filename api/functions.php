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
}

/* need this for backend07 */
function getBodyData() {
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  return $data;
}

?>
