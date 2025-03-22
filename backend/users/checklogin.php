<?php
session_start();
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

echo json_encode(["message" => "User is logged in", "user_id" => $_SESSION['user_id']]);

?>
