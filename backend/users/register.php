<?php
header("Content-Type: application/json"); // Định dạng phản hồi là JSON
include '../config/config.php'; // Kết nối MySQL

// Kiểm tra nếu request là POST (chỉ xử lý đăng ký qua phương thức này)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Nhận dữ liệu từ request body (JSON)
    $data = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra xem tất cả các trường thông tin cần thiết có được gửi không
    if (!isset($data['username'], $data['email'], $data['phoneNumber'], $data['passwordUser'], $data['confirmPassword'])) {
        echo json_encode(["message" => "Thiếu thông tin đăng ký"]);
        exit;
    }

    // Lấy dữ liệu từ request
    $username = $data['username'];
    $email = $data['email'];
    $phoneNumber = $data['phoneNumber'];
    $password = $data['passwordUser'];
    $confirmPassword = $data['confirmPassword'];

    // Kiểm tra mật khẩu xác nhận có khớp không
    if ($password !== $confirmPassword) {
        http_response_code(400);
        echo json_encode(["message" => "Mật khẩu xác nhận không khớp"]);
        exit;
    }

    // Kiểm tra xem username hoặc email đã tồn tại chưa trong database
    $checkQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Nếu username hoặc email đã tồn tại, trả về lỗi
        http_response_code(400);
        echo json_encode(["message" => "Username hoặc Email đã tồn tại"]);
        exit;
    }

    // Tạo userId mới bằng cách lấy ID lớn nhất trong bảng users, sau đó +1
    $getMaxIdQuery = "SELECT MAX(user_id) as max_id FROM users";
    $maxIdResult = $conn->query($getMaxIdQuery);
    $row = $maxIdResult->fetch_assoc();
    $newUserId = $row['max_id'] + 1; // user_id mới

    // Thêm người dùng mới vào database, sử dụng NOW() để lưu ngày tạo tài khoản
    $insertQuery = "INSERT INTO users (user_id, username, email, phone_number, password, created_date) VALUES (?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("issss", $newUserId, $username, $email, $phoneNumber, $password);

    // Thực thi truy vấn và kiểm tra kết quả
    if ($stmt->execute()) {
        echo json_encode(["message" => "Đăng ký thành công"]);
    } else {
        echo json_encode(["message" => "Lỗi khi đăng ký"]);
    }

    $stmt->close();
} else {
    // Nếu request không phải là POST, trả về lỗi
    echo json_encode(["message" => "Phương thức không hợp lệ"]);
}

$conn->close(); // Đóng kết nối database
?>
