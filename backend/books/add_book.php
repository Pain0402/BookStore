<?php
// Kết nối đến cơ sở dữ liệu MySQL
include '../config/config.php';

// Đọc dữ liệu JSON gửi từ client
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra nếu không nhận được dữ liệu hợp lệ
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
    exit;
}

// Lấy thông tin sách từ dữ liệu JSON, nếu không có thì gán giá trị mặc định
$title = $data['title'] ?? '';
$author = $data['author'] ?? '';
$price = $data['price'] ?? 0;
$stock = $data['stock'] ?? 0;
$book_cover = $data['book_cover'] ?? '';
$description = $data['description'] ?? '';

// Kiểm tra dữ liệu đầu vào: các trường bắt buộc phải có và hợp lệ
if (empty($title) || empty($author) || $price <= 0 || $stock < 0 || empty($book_cover)) {
    echo json_encode(["status" => "error", "message" => "Missing or invalid book data"]);
    exit;
}

// Tạo câu lệnh SQL để thêm sách mới vào bảng "books"
// Sử dụng prepared statement để tránh SQL injection
$sql = "INSERT INTO books (title, author, price, stock, book_cover, description) 
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

// Gán các giá trị cho placeholder (dấu ?)
$stmt->bind_param("ssdiss", $title, $author, $price, $stock, $book_cover, $description);

// Thực thi truy vấn và trả về kết quả JSON cho client
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Book added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add book"]);
}

// Đóng statement và kết nối
$stmt->close();
$conn->close();
?>
