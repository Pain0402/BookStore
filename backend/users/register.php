<?php
include '../config/config.php'; // Kết nối MySQL

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['username'], $data['email'], $data['phoneNumber'], $data['passwordUser'], $data['confirmPassword'])) {
        echo json_encode(["message" => "Thiếu thông tin đăng ký"]);
        exit;
    }

    $username = $data['username'];
    $email = $data['email'];
    $phoneNumber = $data['phoneNumber'];
    $password = $data['passwordUser'];
    $confirmPassword = $data['confirmPassword'];

    if ($password !== $confirmPassword) {
        http_response_code(400);
        echo json_encode(["message" => "Mật khẩu xác nhận không khớp"]);
        exit;
    }

    // Kiểm tra xem username hoặc email đã tồn tại chưa
    $checkQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        http_response_code(400);
        echo json_encode(["message" => "Username hoặc Email đã tồn tại"]);
        exit;
    }

    // Tạo userId mới (giống Java code)
    $getMaxIdQuery = "SELECT MAX(user_id) as max_id FROM users";
    $maxIdResult = $conn->query($getMaxIdQuery);
    $row = $maxIdResult->fetch_assoc();
    $newUserId = $row['max_id'] + 1;

    // Thêm người dùng mới vào database (thêm created_date)
    $insertQuery = "INSERT INTO users (user_id, username, email, phone_number, password, created_date) VALUES (?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("issss", $newUserId, $username, $email, $phoneNumber, $password);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Đăng ký thành công"]);
    } else {
        echo json_encode(["message" => "Lỗi khi đăng ký"]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "Phương thức không hợp lệ"]);
}

$conn->close();
?>
