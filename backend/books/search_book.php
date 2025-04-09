<?php
// Kết nối đến cơ sở dữ liệu
include '../config/config.php';

if (isset($_GET['term'])) {// Kiểm tra xem có tham số 'term' được gửi từ client không
    
    // Loại bỏ khoảng trắng và tạo chuỗi tìm kiếm
    $term = trim($_GET['term']); 
    $new_term = str_replace(" ", "%' OR title LIKE '%", $term); 

    $query = "SELECT * FROM books WHERE title LIKE '%$new_term%'";
    $result = $conn->query($query) or die("Query failed: " . $conn->error);

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
}

// Đóng kết nối đến cơ sở dữ liệu
$conn->close();
?>
