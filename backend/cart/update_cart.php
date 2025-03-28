<?php
session_start(); // Bắt đầu session để kiểm tra user đăng nhập
header("Content-Type: application/json"); // Định dạng dữ liệu trả về là JSON
include '../config/config.php'; // Kết nối database

// Kiểm tra phương thức HTTP (chỉ chấp nhận PUT)
if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
    http_response_code(405); // 405: Method Not Allowed
    echo json_encode(["error" => "Method Not Allowed"]);
    exit();
}

// Đọc dữ liệu JSON từ body request
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Kiểm tra dữ liệu đầu vào (cart_id và quantity là bắt buộc)
if (!isset($data["cart_id"]) || !isset($data["quantity"])) {
    http_response_code(400); // 400: Bad Request
    echo json_encode(["error" => "Missing cart_id or quantity"]);
    exit();
}

$cartId = intval($data["cart_id"]);
$newQuantity = intval($data["quantity"]);

// Kiểm tra user đã đăng nhập chưa
if (!isset($_SESSION["user_id"])) {
    http_response_code(401); // 401: Unauthorized
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

$userId = $_SESSION["user_id"]; // Lấy user_id từ session

// Kiểm tra xem giỏ hàng có tồn tại và thuộc về user không
$checkSql = "SELECT cart_id FROM cart WHERE cart_id = ? AND user_id = ?";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("ii", $cartId, $userId);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

if ($result->num_rows === 0) {
    http_response_code(404); // 404: Not Found
    echo json_encode(["error" => "Cart item not found or does not belong to user"]);
    exit();
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
$updateSql = "UPDATE cart SET quantity = ? WHERE cart_id = ?";
$stmt = $conn->prepare($updateSql);
$stmt->bind_param("ii", $newQuantity, $cartId);

if ($stmt->execute()) {
    echo json_encode(["message" => "Cart updated successfully", "quantity" => $newQuantity]);
} else {
    http_response_code(500); // 500: Internal Server Error
    echo json_encode(["error" => "Failed to update cart"]);
}

// Đóng kết nối
$stmt->close();
$conn->close();
?>
