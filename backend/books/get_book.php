<?php
    include '../config/config.php';// Kết nối đến cơ sở dữ liệu

    $sql = "SELECT * FROM books";
    $result = $conn->query($sql);

    $books = [];
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }

    echo json_encode($books);
    $conn->close();
?>
