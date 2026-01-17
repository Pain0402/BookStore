<?php 
  include '../config/config.php';

  if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["genre"]) && isset($_GET["price"]) && isset($_GET["sortOption"])) {
      filterBooks($conn);
  } else {
      echo json_encode(["status" => "error", "message" => "Invalid request"]);
  }

  $conn->close();

  function filterBooks($conn) {
      $genres = $_GET["genre"];
      $price = $_GET["price"];
      $sortOption = $_GET["sortOption"];

      // Xử lý genres thành mảng 
      $genreArray = explode(",", $genres);
      $genreCondition = "";
      
      // Xử lý điều kiện thể loại - FIX SQL INJECTION
      if (!empty($genreArray[0])) { // Nếu có ít nhất một thể loại được chọn
          $cleanedGenres = [];
          foreach ($genreArray as $g) {
              // Escape từng giá trị để tránh SQL Injection
              $cleanedGenres[] = $conn->real_escape_string(trim($g));
          }
          
          if (!empty($cleanedGenres)) {
            $genrePlaceholders = implode("','", $cleanedGenres); // Chuyến từ ["A", "B"] → "A','B"
            $genreCondition = " AND g.genre_name IN ('$genrePlaceholders')"; // Chuyển đổi thành điều kiện IN
          }
      }

      // Xử lý điều kiện giá
      if ($price == 1) {
          $priceCondition = " AND (price >= 0 AND price < 80000)";
      } else if ($price == 2) {
          $priceCondition = " AND (price >= 80000 AND price < 110000)";
      } else if ($price == 3) {
        $priceCondition = " AND price >= 110000";
      } else {
          $priceCondition = "";//Không lọc theo giá
      }

      // Xử lý sắp xếp(1: tăng dần, 2: giảm dần)
      $sortQuery = $sortOption > 1 ? "ORDER BY price ASC" : "ORDER BY price DESC";

      // Truy vấn SQL
      $sql = "SELECT b.book_id, b.title, b.price, b.book_cover, g.genre_name
              FROM books b JOIN book_genres bg ON b.book_id = bg.book_id
              JOIN genres g ON bg.genre_id = g.genre_id 
              WHERE 1 $genreCondition $priceCondition 
              $sortQuery";

      $result = $conn->query($sql);
      $books = [];

      while ($row = $result->fetch_assoc()) {
          $books[] = $row;
      }

      echo json_encode($books);
  }
?>
