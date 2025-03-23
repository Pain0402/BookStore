<?php
session_start();
header("Content-Type: application/json"); // Định dạng phản hồi là JSON
include '../config/config.php'; // Kết nối MySQL

// Kiểm tra xem user đã đăng nhập hay chưa
if (!isset($_SESSION["user_id"])) {
    http_response_code(401); // Mã lỗi 401: Unauthorized
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

$userId = $_SESSION["user_id"]; // Lấy user_id từ session

try {
    // Chuẩn bị câu lệnh SQL để lấy thông tin giỏ hàng của user
    $stmt = $conn->prepare("
        SELECT c.cart_id, c.quantity, b.book_id, b.title, b.price, b.book_cover 
        FROM cart c
        JOIN books b ON c.book_id = b.book_id
        WHERE c.user_id = ?
    ");

    // Kiểm tra nếu truy vấn không hợp lệ
    if (!$stmt) {
        throw new Exception("Lỗi chuẩn bị truy vấn: " . $conn->error);
    }

    // Gán giá trị user_id vào truy vấn và thực thi
    $stmt->bind_param("i", $userId);
    $stmt->execute();

    // Lấy kết quả truy vấn
    $cartItems = [];
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $cartItems[] = $row;
    }

    $stmt->close();

    // Trả về danh sách giỏ hàng dưới dạng JSON
    echo json_encode($cartItems);
} catch (Exception $e) {
    http_response_code(500); // Mã lỗi 500: Internal Server Error
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}

// Đóng kết nối database
$conn->close();
?>
