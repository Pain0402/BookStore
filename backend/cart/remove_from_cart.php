<?php
header("Content-Type: application/json"); // Thiết lập header để phản hồi dữ liệu dưới dạng JSON
require_once "../config/config.php"; // Kết nối đến database

// Kiểm tra nếu phương thức không phải DELETE thì trả về lỗi 405 (Method Not Allowed)
if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method"]);
    exit;
}

// Đọc dữ liệu JSON từ request body
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Kiểm tra xem cart_id có được cung cấp hay không
if (!isset($data["cart_id"])) {
    http_response_code(400); // Lỗi 400: Bad Request
    echo json_encode(["error" => "Missing cart_id"]);
    exit;
}

// Tránh SQL Injection bằng cách sử dụng prepared statements
$cart_id = $data["cart_id"];

// Xóa sản phẩm khỏi giỏ hàng dựa trên cart_id
$sql = "DELETE FROM cart WHERE cart_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $cart_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Item removed from cart"]); // Xóa thành công
} else {
    http_response_code(500); // Lỗi 500: Internal Server Error
    echo json_encode(["error" => "Failed to remove item"]);
}

// Đóng kết nối database
$stmt->close();
$conn->close();
?>
