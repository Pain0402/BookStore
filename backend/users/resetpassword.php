<?php
include '../config/config.php'; // Kết nối MySQL

// Kiểm tra phương thức HTTP (chỉ chấp nhận POST)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Đọc dữ liệu JSON từ body request
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['email']) || !isset($data['newPassword']) || !isset($data['confirmPassword'])) {
        echo json_encode(["error" => "Thiếu email hoặc mật khẩu"]);
        exit;
    }

    $email = $data['email'];
    $newPassword = $data['newPassword'];
    $confirmPassword = $data['confirmPassword'];

    // Kiểm tra confirmPassword
    if ($newPassword !== $confirmPassword) {
        echo json_encode(["error" => "Mật khẩu xác nhận không khớp!"]);
        exit;
    }

    // Kiểm tra email có tồn tại không
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        echo json_encode(["error" => "Email không tồn tại trong hệ thống."]);
        exit;
    }

    // Cập nhật mật khẩu mới 
    $updateSql = "UPDATE users SET password = ? WHERE email = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("ss", $newPassword, $email);
    
    if ($updateStmt->execute()) {
        echo json_encode(["message" => "Đặt lại mật khẩu thành công!"]);
    } else {
        echo json_encode(["error" => "Lỗi hệ thống, thử lại sau."]);
    }

    $stmt->close();
    $updateStmt->close();
} else {
    echo json_encode(["error" => "Phương thức không hợp lệ"]);
}

$conn->close();
?>
