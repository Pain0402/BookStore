<?php
  // Kết nối đến cơ sở dữ liệu MySQL
  include "../config/config.php";

  // Kiểm tra nếu phương thức request là GET
  if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $book_id = $_GET['book_id'];

    // Kiểm tra book_id có tồn tại và không rỗng
    if (!empty($book_id)) {

        // Bước 1: Kiểm tra xem sách có tồn tại trong database không
        $sql = "SELECT * FROM books WHERE book_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $book_id); // "i" = integer
        $stmt->execute();
        $result = $stmt->get_result();

        // Nếu không tìm thấy sách với ID tương ứng
        if ($result->num_rows === 0) {
            echo json_encode(["success" => false, "message" => "Book not found"]);
            exit();
        }

        // Bước 2: Nếu sách tồn tại, thực hiện xóa sách khỏi database
        $sql = "DELETE FROM books WHERE book_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $book_id);

        // Thực thi câu lệnh xóa và trả về kết quả
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Book deleted successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error deleting book"]);
        }

    } else {
        // Nếu không có book_id trong request
        echo json_encode(["success" => false, "message" => "Invalid book ID"]);
    }
}
?>
