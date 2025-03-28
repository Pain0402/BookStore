<?php
    include '../config/config.php';

    // $sql = "SELECT * FROM books b
    //         JOIN reviews r ON b.book_id = r.book_id";
    $sql = "SELECT * FROM books";
    $result = $conn->query($sql);

    $books = [];
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }

    echo json_encode($books);
    $conn->close();
?>
