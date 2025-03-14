<?php
  include '../config/config.php'; 
  if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $book_id = $_GET['book_id'];
    if (!empty($book_id)) {
        $sql = "SELECT * FROM books WHERE book_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $book_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows === 0) {
            echo json_encode(["success" => false, "message" => "Book not found"]);
            exit();
        }
        $sql = "SELECT * FROM books WHERE book_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $book_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $books = [];
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
        echo json_encode($books);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid book ID"]);
    }
  }

?>