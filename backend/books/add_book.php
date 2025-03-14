<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../config/config.php';

// Đọc dữ liệu JSON từ request body
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
    exit;
}

// Lấy thông tin sách từ body gửi lên
$title = $data['title'] ?? '';
$author = $data['author'] ?? '';
$price = $data['price'] ?? 0;
$stock = $data['stock'] ?? 0;
$book_cover = $data['book_cover'] ?? '';
$description = $data['description'] ?? '';

// Validate cơ bản
if (empty($title) || empty($author) || $price <= 0 || $stock < 0 || empty($book_cover)) {
    echo json_encode(["status" => "error", "message" => "Missing or invalid book data"]);
    exit;
}

// Thêm vào database
$sql = "INSERT INTO books (title, author, price, stock, book_cover, description) 
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssdiss", $title, $author, $price, $stock, $book_cover, $description);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Book added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add book"]);
}

$stmt->close();
$conn->close();
?>
