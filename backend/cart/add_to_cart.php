<?php
session_start(); // Bắt đầu phiên làm việc (session) để kiểm tra user đăng nhập
header("Content-Type: application/json"); // Thiết lập kiểu dữ liệu phản hồi là JSON
include '../config/config.php'; // Kết nối đến database

// Kiểm tra nếu user chưa đăng nhập thì trả về lỗi 401 (Unauthorized)
if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

// Lấy user_id từ session của người dùng đã đăng nhập
$userId = $_SESSION["user_id"];

// Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra nếu không có book_id trong request thì trả về lỗi 400 (Bad Request)
if (!isset($data["book_id"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing book_id"]);
    exit();
}

// Lấy book_id và số lượng từ request, mặc định quantity = 1 nếu không có
$bookId = $data["book_id"];
$quantity = isset($data["quantity"]) ? intval($data["quantity"]) : 1;

try {
    // Kiểm tra xem sách đã có trong giỏ hàng của user chưa
    $stmt = $conn->prepare("SELECT cart_id, quantity FROM cart WHERE user_id = ? AND book_id = ?");
    $stmt->bind_param("ii", $userId, $bookId);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($row = $result->fetch_assoc()) {
        // Nếu sách đã có trong giỏ hàng, tăng số lượng
        $newQuantity = $row["quantity"] + $quantity;
        $updateStmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE cart_id = ?");
        $updateStmt->bind_param("ii", $newQuantity, $row["cart_id"]);
        $updateStmt->execute();
        $updateStmt->close();
    } else {
        // Nếu sách chưa có trong giỏ hàng, thêm mới vào giỏ hàng
        $insertStmt = $conn->prepare("INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, ?)");
        $insertStmt->bind_param("iii", $userId, $bookId, $quantity);
        $insertStmt->execute();
        $insertStmt->close();
    }

    // Trả về phản hồi JSON thành công
    echo json_encode(["message" => "Book added to cart"]);
} catch (Exception $e) {
    // Bắt lỗi nếu có vấn đề trong quá trình truy vấn database
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>
