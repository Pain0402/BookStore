<?php
// header("Content-Type: application/json");
include '../config/config.php'; // Kết nối MySQL

if (isset($_GET['term'])) {
    $term = trim($_GET['term']); 
    $new_term = str_replace(" ", "%' OR title LIKE '%", $term); 
    $query = "SELECT * FROM books WHERE title LIKE '%$new_term%'";

    $result = $conn->query($query)
        or die("Query failed: " . $conn->error);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
    
        echo json_encode($books);
    } else {
        echo "No title found";
    }
}

$conn->close();
?>