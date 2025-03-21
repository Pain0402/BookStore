<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
$servername = "127.0.0.1";
$port = "3306"; 
$username = "hg";
$password = "cmmb@123"; 
$dbname = "bookstore_db";

    // Kết nối MySQL
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        die("Kết nối thất bại: " . $conn->connect_error);
    }
?>