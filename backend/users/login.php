<?php
session_start(); // Bắt đầu session để lưu thông tin user khi đăng nhập
header("Content-Type: application/json"); // Trả về dữ liệu JSON

// Xử lý yêu cầu OPTIONS (cho CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

include '../config/config.php'; // Kết nối database

// Kiểm tra nếu request là POST (đăng nhập)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Nhận dữ liệu từ request body (JSON)
    $data = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra xem username và password có được gửi không
    if (!isset($data['username']) || !isset($data['password'])) {
        echo json_encode(["error" => "Thiếu username hoặc password"]);
        exit;
    }

    $username = $data['username'];
    $password = $data['password'];

    // Truy vấn kiểm tra user trong database
    $sql = "SELECT user_id, username, role FROM users WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc(); // Lấy thông tin user nếu có

    if ($user) {
        // Nếu đăng nhập thành công, lưu thông tin user vào session
        $_SESSION["user_id"] = $user["user_id"];
        $_SESSION["username"] = $user["username"];

        // Xác định trang cần chuyển hướng
        $redirectPage = ($user["role"] === "admin") ? "manageBook.html" : "index.html";

        echo json_encode([
            "message" => "Đăng nhập thành công",
            "username" => $user["username"],
            "userId" => $user["user_id"],
            "role" => $user["role"],
            "redirect" => $redirectPage
        ]);
    } else {
        // Nếu sai username hoặc password
        echo json_encode(["error" => "Sai username hoặc password"]);
    }
    

    $stmt->close();
} else {
    // Nếu request không phải là POST
    echo json_encode(["error" => "Phương thức không hợp lệ"]);
}

$conn->close(); // Đóng kết nối database
?>
