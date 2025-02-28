<?php
header("Content-Type: application/json");
include '../config/config.php'; // Kết nối MySQL

// Kiểm tra phương thức HTTP (chỉ chấp nhận POST)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Đọc dữ liệu JSON từ body request
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['username']) || !isset($data['password'])) {
        echo json_encode(["error" => "Thiếu username hoặc password"]);
        exit;
    }

    $username = $data['username'];
    $password = $data['password'];

    // Truy vấn kiểm tra user trong database
    $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        echo json_encode([
            "message" => "Đăng nhập thành công",
            "username" => $user["username"],
            "userId" => $user["user_id"]
        ]);
    } else {
        echo json_encode(["error" => "Sai username hoặc password"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Phương thức không hợp lệ"]);
}

$conn->close();
?>
