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
      $price = floatval($_GET["price"]);
      $sortOption = $_GET["sortOption"];

      // Xử lý genres thành mảng
      $genreArray = explode(",", $genres);
      $genreCondition = "";
      if (!empty($genreArray[0])) {
          $genrePlaceholders = implode("','", $genreArray);
          $genreCondition = " AND g.genre_name IN ('$genrePlaceholders')";
      }

      // Xử lý điều kiện giá
      if ($price == 1) {
          $priceCondition = " AND (price >= 0 AND price < 80000)";
      } else if ($price == 2) {
          $priceCondition = " AND (price >= 80000 AND price < 110000)";
      } else if ($price == 3) {
        $priceCondition = " AND price >= 110000";
      } else {
          $priceCondition = "";
      }

      // Xử lý sắp xếp
      $sortQuery = $sortOption > 1 ? "ORDER BY price ASC" : "ORDER BY price DESC";

      // Truy vấn SQL
      $sql = "SELECT b.book_id, b.title, b.price, b.book_cover, g.genre_name
              FROM books b JOIN book_genres bg ON b.book_id = bg.book_id
              JOIN genres g ON bg.genre_id = g.genre_id 
              WHERE 1 $genreCondition $priceCondition $sortQuery";

      $result = $conn->query($sql);
      $books = [];

      while ($row = $result->fetch_assoc()) {
          $books[] = $row;
      }

      echo json_encode($books);
  }
?>
