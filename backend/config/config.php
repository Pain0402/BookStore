<?php
    $servername = "localhost";
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