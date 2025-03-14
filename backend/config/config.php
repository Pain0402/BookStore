<?php
$servername = "127.0.0.1";
$port = "3306"; 
$username = "hg";
$password = "cmmb@123"; 
$dbname = "bookstore_database";

    // Kết nối MySQL
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        die("Kết nối thất bại: " . $conn->connect_error);
    }
?>