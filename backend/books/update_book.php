<?php
  include "../config/config.php";
  // Đọc dữ liệu JSON từ request body
  $data = json_decode(file_get_contents("php://input"), true);
  if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
    exit;
  }
  $book_id = $data['book_id'] ?? '';
  $title = $data['title'] ?? '';
  $author = $data['author'] ?? '';
  $price = $data['price'] ?? 0;
  $stock = $data['stock'] ?? 0;
  $book_cover = $data['book_cover'] ?? '';
  $description = $data['description'] ?? '';

  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!empty($book_id)) {
        $sql = "UPDATE books 
                SET title = ?, author = ?, price = ?, stock = ?, book_cover = ?, description = ?
                WHERE book_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssdissi", $title, $author, $price, $stock, $book_cover, $description,$book_id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Book updated successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error updating book"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid book ID"]);
    }
  }

?>