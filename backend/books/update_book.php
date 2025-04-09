<?php
  // Kết nối đến cơ sở dữ liệu MySQL
  include "../config/config.php";

  // Đọc dữ liệu JSON gửi từ client
  $data = json_decode(file_get_contents("php://input"), true);

  // Kiểm tra nếu dữ liệu JSON không hợp lệ
  if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
    exit;
  }

  // Gán các giá trị từ JSON, nếu không có thì dùng giá trị mặc định
  $book_id = $data['book_id'] ?? '';            
  $title = $data['title'] ?? '';               
  $author = $data['author'] ?? '';             
  $price = $data['price'] ?? 0;                
  $stock = $data['stock'] ?? 0;                
  $book_cover = $data['book_cover'] ?? '';     
  $description = $data['description'] ?? '';   

  // Kiểm tra nếu request là phương thức POST
  if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Kiểm tra xem có book_id không để xác định sách cần cập nhật
    if (!empty($book_id)) {

        // Câu truy vấn UPDATE sử dụng prepared statement để bảo mật
        $sql = "UPDATE books 
                SET title = ?, author = ?, price = ?, stock = ?, book_cover = ?, description = ?
                WHERE book_id = ?";

        // Chuẩn bị truy vấn và gán các tham số tương ứng
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssdissi", $title, $author, $price, $stock, $book_cover, $description, $book_id);
        
        // Thực thi truy vấn và kiểm tra kết quả
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Book updated successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error updating book"]);
        }

    } else {
        // Nếu không có book_id, thông báo lỗi
        echo json_encode(["success" => false, "message" => "Invalid book ID"]);
    }
  }
?>
