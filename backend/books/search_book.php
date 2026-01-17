<?php
// Kết nối đến cơ sở dữ liệu
include '../config/config.php';

if (isset($_GET['term'])) {// Kiểm tra xem có tham số 'term' được gửi từ client không
    
    // Loại bỏ khoảng trắng và tạo chuỗi tìm kiếm
    $term = trim($_GET['term']); 
    $searchTerm = "%" . $term . "%";

    // Sử dụng prepared statement để tránh SQL Injection
    $query = "SELECT * FROM books WHERE title LIKE ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("s", $searchTerm);
        $stmt->execute();
        $result = $stmt->get_result();

        // Nếu có kết quả được trả về
        if ($result->num_rows > 0) {
            // Duyệt qua từng dòng kết quả và thêm vào mảng $books
            while ($row = $result->fetch_assoc()) {
                $books[] = $row;
            }
            // Trả kết quả dạng JSON về cho client
            echo json_encode($books);
        } else {
            // Nếu không tìm thấy tiêu đề nào phù hợp
            echo "No title found";
        }
        $stmt->close();
    } else {
         echo json_encode(["error" => "Query preparation failed"]);
    }
}

// Đóng kết nối đến cơ sở dữ liệu
$conn->close();
?>
