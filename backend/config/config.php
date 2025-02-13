<?php
$servername = "127.0.0.1";
$port = "3306"; 
$username = "hg"; // Thay bằng user MySQL của bạn
$password = "cmmb@123"; // Nếu có mật khẩu, hãy điền vào đây
$dbname = "bookstore_db";

// Kết nối MySQL
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
?>