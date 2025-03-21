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

$userId = $_SESSION["user_id"]; // Lấy userId từ session

try {
    // Chuẩn bị truy vấn
    $stmt = $conn->prepare("
        SELECT 
            c.cart_id, c.quantity, 
            b.book_id, b.title, b.price, b.book_cover 
        FROM cart c
        JOIN books b ON c.book_id = b.book_id
        WHERE c.user_id = ?
    ");

    if (!$stmt) {
        throw new Exception("Lỗi chuẩn bị truy vấn: " . $conn->error);
    }

    // Bind user_id và thực thi
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    
    $cartItems = [];
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $cartItems[] = $row;
    }

    $stmt->close();

    // Trả về JSON hợp lệ
    echo json_encode($cartItems);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>
