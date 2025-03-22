<?php
session_start();
header("Content-Type: application/json");
include '../config/config.php'; // Kết nối database

// Kiểm tra phương thức PUT
if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit();
}

// Đọc dữ liệu JSON từ body
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!isset($data["cart_id"]) || !isset($data["quantity"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing cart_id or quantity"]);
    exit();
}

$cartId = intval($data["cart_id"]);
$newQuantity = intval($data["quantity"]);

// Kiểm tra user đăng nhập
if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

// Kiểm tra cart item có tồn tại và thuộc về user
$checkSql = "SELECT cart_id FROM cart WHERE cart_id = ? AND user_id = ?";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("ii", $cartId, $userId);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

// if ($result->num_rows === 0) {
//     http_response_code(404);
//     echo json_encode(["error" => "Cart item not found"]);
//     exit();
// }

// Cập nhật số lượng
$updateSql = "UPDATE cart SET quantity = ? WHERE cart_id = ?";
$stmt = $conn->prepare($updateSql);
$stmt->bind_param("ii", $newQuantity, $cartId);

if ($stmt->execute()) {
    echo json_encode(["message" => "Cart updated", "quantity" => $newQuantity]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to update cart"]);
}
$stmt->close();
$conn->close();
?>
