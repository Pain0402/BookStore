<?php
header("Content-Type: application/json");
include '../config/config.php'; // Kết nối MySQL

if (isset($_GET['term'])) {
    $term = "%" . $_GET['term'] . "%"; // Dùng LIKE để tìm kiếm gần đúng

    $sql = "SELECT * FROM books WHERE title LIKE ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $term);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $books = [];

    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }

    echo json_encode($books);
} else {
    echo json_encode(["error" => "Missing search term"]);
}

$conn->close();
?>
