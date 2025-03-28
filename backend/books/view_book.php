<?php
// Kết nối đến cơ sở dữ liệu MySQL
include '../config/config.php';

// Kiểm tra xem có tham số 'bookId' trong yêu cầu GET không
if (isset($_GET['bookId'])) {
    $bookId = $_GET['bookId']; // Lấy giá trị bookId từ request

    // Truy vấn để lấy thông tin chi tiết của sách, bao gồm cả thể loại (genre)
    $sql = "SELECT b.book_id AS bookId, b.title, b.author, b.description, b.price, b.book_cover,g.genre_name 
            FROM books b
            LEFT JOIN book_genres bg ON b.book_id = bg.book_id
            LEFT JOIN genres g ON bg.genre_id = g.genre_id
            WHERE b.book_id = ?";

    // Chuẩn bị truy vấn SQL để tránh SQL Injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $bookId); // "i" biểu thị kiểu dữ liệu là integer
    $stmt->execute();
    
    // Lấy kết quả truy vấn
    $result = $stmt->get_result();
    $bookDetails = [];

    // Lặp qua kết quả và lưu vào mảng bookDetails
    while ($row = $result->fetch_assoc()) {
        $bookDetails[] = $row;
    }

    // Kiểm tra xem có dữ liệu sách nào không
    if (!empty($bookDetails)) {
        echo json_encode([$bookDetails]); 
    } else {
        echo json_encode(["error" => "Book not found"]); // Không tìm thấy sách
    }
} else {
    // Nếu không có tham số bookId, trả về lỗi
    echo json_encode(["error" => "Missing bookId"]);
}

// Đóng kết nối với database
$conn->close();
?>
