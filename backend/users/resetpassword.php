<?php
// Đặt kiểu nội dung JSON cho phản hồi
header("Content-Type: application/json");

// Kết nối MySQL
include '../config/config.php';

// Kiểm tra nếu yêu cầu là POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Đọc dữ liệu JSON từ body request
    $data = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra xem email, mật khẩu mới và mật khẩu xác nhận có tồn tại không
    if (!isset($data['email']) || !isset($data['newPassword']) || !isset($data['confirmPassword'])) {
        echo json_encode(["error" => "Thiếu email hoặc mật khẩu"]);
        exit;
    }

    // Gán dữ liệu từ JSON vào biến PHP
    $email = $data['email'];
    $newPassword = $data['newPassword'];
    $confirmPassword = $data['confirmPassword'];

    // Kiểm tra nếu mật khẩu xác nhận không khớp
    if ($newPassword !== $confirmPassword) {
        echo json_encode(["error" => "Mật khẩu xác nhận không khớp!"]);
        exit;
    }

    // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // Nếu không tìm thấy email trong hệ thống
    if (!$user) {
        echo json_encode(["error" => "Email không tồn tại trong hệ thống."]);
        exit;
    }

    // Cập nhật mật khẩu mới trong database
    $updateSql = "UPDATE users SET password = ? WHERE email = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("ss", $newPassword, $email);
    
    // Kiểm tra xem quá trình cập nhật có thành công không
    if ($updateStmt->execute()) {
        echo json_encode(["message" => "Đặt lại mật khẩu thành công!"]);
    } else {
        echo json_encode(["error" => "Lỗi hệ thống, thử lại sau."]);
    }

    // Đóng các prepared statement
    $stmt->close();
    $updateStmt->close();
} else {
    // Trả về lỗi nếu phương thức không hợp lệ
    echo json_encode(["error" => "Phương thức không hợp lệ"]);
}

// Đóng kết nối database
$conn->close();
?>
