<?php
header("Content-Type: application/json");
include '../config/config.php'; // Kết nối MySQL

if (isset($_GET['bookId'])) {
    $bookId = $_GET['bookId'];

    $sql = "SELECT 
                b.book_id AS bookId, b.title, b.author, b.description, b.price, b.book_cover,
                g.genre_name 
            FROM books b
            LEFT JOIN book_genres bg ON b.book_id = bg.book_id
            LEFT JOIN genres g ON bg.genre_id = g.genre_id
            WHERE b.book_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $bookId);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $bookDetails = [];

    while ($row = $result->fetch_assoc()) {
        $bookDetails[] = $row;
    }

    if (!empty($bookDetails)) {
        echo json_encode([$bookDetails]); // Định dạng giống API cũ
    } else {
        echo json_encode(["error" => "Book not found"]);
    }
} else {
    echo json_encode(["error" => "Missing bookId"]);
}

$conn->close();
?>
