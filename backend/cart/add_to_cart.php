<?php
session_start();
header("Content-Type: application/json");
include '../config/config.php'; // Kết nối MySQL

// Kiểm tra user đăng nhập
if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

$userId = $_SESSION["user_id"]; // Lấy user_id từ session

// Nhận dữ liệu từ request
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["book_id"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing book_id"]);
    exit();
}

$bookId = $data["book_id"];
$quantity = isset($data["quantity"]) ? intval($data["quantity"]) : 1;

try {
    // Kiểm tra sách đã có trong giỏ hàng chưa
    $stmt = $conn->prepare("SELECT cart_id, quantity FROM cart WHERE user_id = ? AND book_id = ?");
    $stmt->bind_param("ii", $userId, $bookId);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($row = $result->fetch_assoc()) {
        // Nếu đã có, cập nhật số lượng
        $newQuantity = $row["quantity"] + $quantity;
        $updateStmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE cart_id = ?");
        $updateStmt->bind_param("ii", $newQuantity, $row["cart_id"]);
        $updateStmt->execute();
        $updateStmt->close();
    } else {
        // Nếu chưa có, thêm mới vào giỏ hàng
        $insertStmt = $conn->prepare("INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, ?)");
        $insertStmt->bind_param("iii", $userId, $bookId, $quantity);
        $insertStmt->execute();
        $insertStmt->close();
    }

    echo json_encode(["message" => "Book added to cart"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>
