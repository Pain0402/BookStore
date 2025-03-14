<?php
session_start();
header("Content-Type: application/json");

// Cấu hình CORS
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

include '../config/config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
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
        $_SESSION["user_id"] = $user["user_id"];
        $_SESSION["username"] = $user["username"];

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
