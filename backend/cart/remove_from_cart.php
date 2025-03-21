<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");

require_once "../config/config.php"; // Nếu bạn có file cấu hình kết nối database

// Kiểm tra phương thức DELETE
if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
    echo json_encode(["error" => "Invalid request method"]);
    http_response_code(405);
    exit;
}

// Đọc JSON payload
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Kiểm tra cart_id
if (!isset($data["cart_id"])) {
    echo json_encode(["error" => "Missing cart_id"]);
    http_response_code(400);
    exit;
}

$cart_id = $conn->real_escape_string($data["cart_id"]);

// Xóa khỏi giỏ hàng
$sql = "DELETE FROM cart WHERE cart_id = '$cart_id'";
if ($conn->query($sql)) {
    echo json_encode(["message" => "Item removed from cart"]);
} else {
    echo json_encode(["error" => "Failed to remove item"]);
    http_response_code(500);
}

$conn->close();
