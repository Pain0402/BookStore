-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bookstore_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_genres`
--

DROP TABLE IF EXISTS `book_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_genres` (
  `book_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `book_genres_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `book_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_genres`
--

LOCK TABLES `book_genres` WRITE;
/*!40000 ALTER TABLE `book_genres` DISABLE KEYS */;
INSERT INTO `book_genres` VALUES (1,1),(5,1),(9,1),(10,1),(11,1),(12,1),(14,1),(17,1),(18,1),(20,1),(28,1),(29,1),(4,2),(6,2),(15,2),(23,2),(31,2),(32,2),(33,2),(2,3),(3,3),(13,3),(16,3),(19,3),(21,3),(22,3),(24,3),(30,3),(35,4),(36,4),(25,5),(26,5),(27,5),(34,5),(7,6),(8,6);
/*!40000 ALTER TABLE `book_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  `description` text,
  `book_cover` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Thiên Tài Bên Trái, Kẻ Điên Bên Phải','Cao Minh',179000.00,57,'Cuốn sách mở ra cánh cửa của tâm trí với những suy nghĩ và triết lý khác biệt.','https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-thi_n-t_i-b_n-tr_i-k_-_i_n-b_n-ph_i.jpg','2023-01-15 03:35:21'),(2,'Tôi Tự Học','Thu Giang Nguyễn Duy Cần',99000.00,120,'Cuốn sách kinh điển về phương pháp tự học và phát triển bản thân.','https://cdn0.fahasa.com/media/catalog/product/8/9/8934974177708.jpg','2023-02-22 08:22:45'),(3,'Đắc Nhân Tâm','Dale Carnegie',75000.00,80,'Bí quyết giao tiếp và nghệ thuật thuyết phục mọi người hiệu quả.','https://cdn0.fahasa.com/media/catalog/product/8/9/8935270704704.jpg','2023-03-05 01:13:37'),(4,'Shadows House Tập 4','So-ma-to',45000.00,100,'Trong một dinh thự hoành tráng và tối tăm, nơi những cư dân của Shadows House sống, với sự tham dự của các búp bê sống của họ, những người không ngừng dọn sạch bồ hóng mà chủ nhân của họ thải ra. Emilico, một búp bê sống trẻ trung và vui vẻ, rất vui khi bắt đầu phục vụ cô chủ Kate. Cả hai ngày càng thân thiết và dần dần tiếp xúc với nhiều sự kiện khác nhau trong dinh thự, họ bắt đầu khám phá ra một số bí mật đen tối của dinh thự rộng lớn này.','https://cdn0.fahasa.com/media/catalog/product/s/h/shadow_house_bia_tap_4.jpg','2023-03-18 07:55:12'),(5,'Nhà Giả Kim','Paulo Coelho',89000.00,70,'Câu chuyện huyền ảo về hành trình khám phá bản thân.','https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg','2023-04-03 12:07:53'),(6,'One Piece Tập 1','Eiichiro Oda',25000.00,200,'Cuộc hành trình vĩ đại của băng hải tặc Mũ Rơm bắt đầu.','https://cdn0.fahasa.com/media/catalog/product/8/9/8935244865097.jpg','2023-04-25 06:45:09'),(7,'Hành Trình Về Phương Đông','Baird T. Spalding',129000.00,60,'Chuyến hành trình kỳ diệu của các nhà khoa học phương Tây khám phá sự huyền bí của Ấn Độ.','https://cdn0.fahasa.com/media/catalog/product/h/_/h_nh-tr_nh-v_-ph_ng-_ng.jpg','2023-05-02 02:33:29'),(8,'Lược Sử Thời Gian','Stephen Hawking',135000.00,40,'Công trình phổ biến khoa học nổi bật về vũ trụ học và bản chất thời gian.','https://cdn0.fahasa.com/media/catalog/product/8/9/8936066693882.jpg','2023-05-16 11:41:19'),(9,'Dế Mèn Phiêu Lưu Ký','Tô Hoài',45000.00,85,'Tác phẩm thiếu nhi kinh điển về chuyến phiêu lưu của chú dế Mèn.','https://cdn0.fahasa.com/media/catalog/product/d/e/de-men-50k_1.jpg','2023-05-29 04:05:48'),(10,'Khi Hơi Thở Hóa Thinh Không','Paul Kalanithi',150000.00,55,'Cuốn hồi ký đầy xúc cảm của bác sĩ Kalanithi khi đối mặt với căn bệnh ung thư.','https://cdn0.fahasa.com/media/catalog/product/b/i/bia-1-khihoitho.jpg','2023-06-14 13:22:34'),(11,'Sherlock Holmes Tập 1','Arthur Conan Doyle',99000.00,90,'Những câu chuyện trinh thám nổi tiếng của thám tử Sherlock Holmes.','https://cdn0.fahasa.com/media/catalog/product/h/h/hh_sherlock-holme_taiban-b1.jpg','2023-06-27 08:51:04'),(12,'Thần Thoại Hy Lạp','Edith Hamilton',78000.00,60,'Cuốn sách về các vị thần, á thần và anh hùng trong thần thoại Hy Lạp.','https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_5293.jpg','2023-07-12 05:17:59'),(13,'The Subtle Art of Not Giving a F*ck','Mark Manson',125000.00,75,'Cuốn sách về cách sống tự do, không bị ảnh hưởng bởi áp lực xã hội.','https://cdn0.fahasa.com/media/catalog/product/9/7/9780008542474.jpg','2023-07-25 10:46:38'),(14,'Hạt Giống Tâm Hồn','Nhiều Tác Giả',60000.00,150,'Tập hợp các câu chuyện ý nghĩa về tình yêu, hy vọng và lòng trắc ẩn.','https://cdn0.fahasa.com/media/catalog/product/8/9/8935086857434.jpg','2023-08-01 01:43:20'),(15,'Naruto Tập 1','Masashi Kishimoto',25000.00,180,'Câu chuyện về hành trình trở thành ninja của Naruto.','https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-1---tb-2022.jpg','2023-08-18 03:55:07'),(16,'Tuổi Trẻ Đáng Giá Bao Nhiêu','Rosie Nguyễn',98000.00,110,'Cuốn sách dành cho những người trẻ đang tìm kiếm ý nghĩa cuộc sống.','https://cdn0.fahasa.com/media/catalog/product/i/m/image_239651.jpg','2023-09-05 02:32:56'),(17,'Đi Tìm Lẽ Sống','Viktor Frankl',85000.00,90,'Cuốn sách về triết lý sống và ý nghĩa cuộc đời của một bác sĩ tâm thần.','https://cdn0.fahasa.com/media/catalog/product/t/h/thumb-01113.jpg','2023-09-21 09:28:03'),(18,'Totto-chan Bên Cửa Sổ','Tetsuko Kuroyanagi',95000.00,75,'Câu chuyện nhẹ nhàng về cô bé Totto-chan và ngôi trường đặc biệt.','https://cdn0.fahasa.com/media/catalog/product/8/9/8935235241848.jpg','2023-09-30 07:02:18'),(19,'Thói Quen Tích Cực','Stephen Covey',135000.00,50,'Cẩm nang giúp bạn xây dựng những thói quen sống tích cực.','https://cdn0.fahasa.com/media/catalog/product/t/h/thoi-quen-hoai-nghi_xp-01_1.jpg','2023-10-12 12:39:22'),(20,'Harry Potter và Hòn Đá Phù Thủy','J.K. Rowling',120000.00,95,'Cuốn sách đầu tiên trong bộ truyện Harry Potter nổi tiếng.','https://cdn0.fahasa.com/media/catalog/product/8/9/8934974179672.jpg','2023-10-27 06:47:10'),(21,'Bí Mật Của Nước','Masaru Emoto',85000.00,85,'Khám phá mối liên kết sâu sắc giữa nước và ý nghĩ của con người.','https://cdn0.fahasa.com/media/catalog/product/i/m/image_222431.jpg','2023-11-01 01:26:44'),(22,'Bạn Đắt Giá Bao Nhiêu','Vãn Tình',115000.00,60,'Cuốn sách truyền cảm hứng giúp phụ nữ tìm thấy giá trị bản thân.','https://cdn0.fahasa.com/media/catalog/product/b/a/bandatgiabaonhieu.jpg','2023-11-05 04:16:37'),(23,'One Piece Tập 2','Eiichiro Oda',25000.00,210,'Băng hải tặc Mũ Rơm tiếp tục cuộc hành trình phiêu lưu của mình.','https://cdn0.fahasa.com/media/catalog/product/8/9/8935244865103.jpg','2023-11-12 11:22:55'),(24,'Thức Tỉnh Mục Đích Sống','Eckhart Tolle',140000.00,50,'Cuốn sách giúp bạn tìm thấy mục đích sống và hạnh phúc thực sự.','https://cdn0.fahasa.com/media/catalog/product/9/7/9786044770437.jpg','2023-11-16 02:44:19'),(25,'Cà Phê Cùng Tony','Tony Buổi Sáng',65000.00,140,'Những bài học cuộc sống thú vị và hài hước qua từng câu chuyện.','https://cdn0.fahasa.com/media/catalog/product/8/9/8934974180548.jpg','2023-11-19 07:15:42'),(26,'Dám Bị Ghét','Kishimi Ichiro',99000.00,130,'Cuốn sách triết lý truyền cảm hứng về cách sống không sợ bị phán xét.','https://cdn0.fahasa.com/media/catalog/product/y/h/yho27ekd.jpg','2023-11-21 05:58:31'),(27,'Tâm Lý Học Tích Cực','Martin Seligman',105000.00,70,'Giới thiệu về khoa học tích cực và cách cải thiện tâm lý.','https://cdn0.fahasa.com/media/catalog/product/t/_/t_m-l_-h_c-t_ch-c_c-b_a-1.jpg','2023-11-23 09:08:14'),(28,'Truyện Kiều','Nguyễn Du',50000.00,100,'Tác phẩm kiệt xuất của văn học cổ điển Việt Nam.','https://cdn0.fahasa.com/media/catalog/product/i/m/image_229223.jpg','2023-11-25 03:35:54'),(29,'Chuyện Con Mèo Dạy Hải Âu Bay','Luis Sepúlveda',68000.00,120,'Câu chuyện ngụ ngôn về lòng tốt và tình yêu thương.','https://cdn0.fahasa.com/media/catalog/product/c/h/chuyen-con-meo-day-hai-au-bay-01.jpg','2023-11-28 04:47:29'),(30,'Đọc Vị Bất Kỳ Ai','David J. Lieberman',115000.00,75,'Cách nhận biết suy nghĩ của người khác qua các dấu hiệu tâm lý.','https://cdn0.fahasa.com/media/catalog/product/b/i/bia_doc-vi-bat-ky-ai-de-khong-bi-lua-doi-va-loi-dung_bia-1.jpg','2023-11-30 06:22:17'),(31,'Kaguya-Sama - Cuộc Chiến Tỏ Tình - Tập 23','Aka Akasaka',40000.00,71,'Đây là câu chuyện tình cảm hài hước mới mẻ về hai thiên tài tuy trong lòng thích nhau lắm rồi những vẫn ngày ngày bày mưu tính kế cầm cưa, bắt đối phương phải tỏ tình trước.','https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_4156.jpg','2023-11-23 09:08:14'),(32,'Nàng Juliet ở trường nội trú - Tập 1','Yousuke Kaneda',35000.00,71,'Tại học viện nội trú Dahlia - nơi học sinh của hai nước đối địch đang theo học, có một nam sinh lớp 10 đang quằn quại vì tình yêu không thể được đền đáp: thủ lĩnh kí túc xá đất nước Towa - Inuzuka Romio đang thầm thương trộm nhớ Juliet Persia - thủ lĩnh kí túc xá xứ West. Mọi chuyện bắt đầu từ lời tỏ tình của Inuzuka!!','https://cdn0.fahasa.com/media/catalog/product/n/a/nang_juliet_o_truong_noi_tru_bia_tap_1.jpg','2023-11-23 09:08:14'),(33,'Attack on titan 11','Isayama Hajime',48000.00,55,'Sau nhiều năm sống yên ổn sau những bức tường thành cao lừng lững, loài người đã bắt đầu cảm nhận được nguy cơ diệt vong đến từ một giống loài khổng lồ mang tên Titan.','https://cdn0.fahasa.com/media/catalog/product/9/7/9784063949018-_1_.jpg','2023-11-23 09:08:14'),(34,'Định Luật Murphy - Mọi Bí Mật Tâm Lý Thao Túng Cuộc Đời Bạn','Từ Thính Phong',119000.00,75,'Định luật Murphy. Nó nhắc nhở chúng ta rằng việc xấu luôn có “cơ may” cao hơn và sai lầm luôn là một phần của thế giới này.','https://cdn0.fahasa.com/media/catalog/product/p/h/ph_t-h_nh-_nh-lu_t-murphybia-1.jpg','2023-11-30 06:22:17'),(35,'Giải Thích Ngữ Pháp Tiếng Anh','Mai Lan Hương, Hà Thanh Uyên',220000.00,175,'Ngữ pháp Tiếng Anh tổng hợp các chủ điểm ngữ pháp trọng yếu mà học sinh cần nắm vững.','https://cdn0.fahasa.com/media/catalog/product/g/i/giaithichnguphapta-tb2024_bia1.jpg','2023-11-30 06:22:17'),(36,'Marugoto A1 - Hiểu Biết Ngôn Ngữ','The Japan Foundation',150000.00,175,'Giáo trình Marugoto sử dụng nhiều tranh ảnh, hình minh họa với màu sắc sống động giúp người học tiếp thu kiến thức qua nhiều giác quan, hiểu thêm về văn hóa Nhật Bản.','https://cdn0.fahasa.com/media/catalog/product/m/a/marugoto---rikai---hieu-biet-ngon-ngu_b_a_1.jpg','2023-05-02 02:33:29'),(37,'Giang','Pain',15000.00,20,NULL,'https://cdn0.fahasa.com/media/catalog/product/9/7/9784063949018-_1_.jpg','2024-11-26 01:57:19');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`hg`@`%`*/ /*!50003 TRIGGER `before_insert_books` BEFORE INSERT ON `books` FOR EACH ROW BEGIN
    -- Chuẩn hóa title và author để viết hoa từng chữ cái đầu của mỗi từ
    SET NEW.title = capitalize(NEW.title);
    SET NEW.author = capitalize(NEW.author);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`hg`@`%`*/ /*!50003 TRIGGER `before_books_update` BEFORE UPDATE ON `books` FOR EACH ROW BEGIN
    INSERT INTO books_history (book_id, title, author, price, stock, book_cover, created_date, action_type, description)
    VALUES (OLD.book_id, OLD.title, OLD.author, OLD.price, OLD.stock, OLD.book_cover, OLD.created_date, 'UPDATE', OLD.description);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`hg`@`%`*/ /*!50003 TRIGGER `before_books_delete` BEFORE DELETE ON `books` FOR EACH ROW BEGIN
    INSERT INTO books_history (book_id, title, author, price, stock, book_cover, created_date, action_type, description)
    VALUES (OLD.book_id, OLD.title, OLD.author, OLD.price, OLD.stock, OLD.book_cover, OLD.created_date, 'DELETE', OLD.description);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `books_history`
--

DROP TABLE IF EXISTS `books_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books_history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `action_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action_type` enum('DELETE','UPDATE') NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `book_cover` varchar(255) DEFAULT NULL,
  `book_id` int NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`history_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_history`
--

LOCK TABLES `books_history` WRITE;
/*!40000 ALTER TABLE `books_history` DISABLE KEYS */;
INSERT INTO `books_history` VALUES (1,'2024-11-24 07:23:30','DELETE','José Mauro de Vasconcelos','https://cdn0.fahasa.com/media/catalog/product/i/m/image_217480.jpg',37,'2024-11-24 11:38:04.000000',NULL,15000.00,20,'giang'),(2,'2024-11-24 07:38:50','UPDATE','Cao Minh','https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-thi_n-t_i-b_n-tr_i-k_-_i_n-b_n-ph_i.jpg',1,'2023-01-15 10:35:21.000000','Cuốn sách mở ra cánh cửa của tâm trí với những suy nghĩ và triết lý khác biệt.',179000.00,55,'Thiên Tài Bên Trái, Kẻ Điên Bên Phải'),(3,'2024-11-24 09:33:22','UPDATE','Cao Minh','https://cdn0.fahasa.com/media/catalog/product/9/7/9784063949018-_1_.jpg',37,'2024-11-24 16:33:08.000000',NULL,15000.00,15,'Pain'),(4,'2024-11-24 09:37:24','UPDATE','Giang','https://cdn0.fahasa.com/media/catalog/product/9/7/9784063949018-_1_.jpg',37,'2024-11-24 16:33:08.000000',NULL,15000.00,15,'Pain'),(5,'2024-11-24 09:45:32','DELETE','Cao Minh','https://cdn0.fahasa.com/media/catalog/product/9/7/9784063949018-_1_.jpg',38,'2024-11-24 16:45:24.000000',NULL,550000.00,15,'Hoa'),(6,'2024-11-26 01:57:32','UPDATE','Pain','https://cdn0.fahasa.com/media/catalog/product/9/7/9784063949018-_1_.jpg',37,'2024-11-26 08:57:19.000000',NULL,15000.00,15,'Giang');
/*!40000 ALTER TABLE `books_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,1,2),(2,1,3,1),(3,1,5,3),(4,2,2,1),(5,2,4,2),(7,3,7,4),(8,4,1,1),(9,4,8,1),(10,5,9,2),(11,5,10,1),(12,6,11,3),(13,6,12,1),(14,7,13,2),(15,7,14,1),(16,8,15,2),(17,8,16,1),(18,9,17,3),(19,9,18,1),(20,10,19,2),(21,10,20,1),(22,11,21,1),(23,12,22,3),(24,12,23,2),(25,13,24,1),(26,13,25,2),(27,14,26,1),(28,14,27,3),(29,15,28,1),(30,15,29,2),(31,1,8,1),(32,3,1,1),(34,31,33,2),(35,31,23,1),(37,31,9,1),(38,31,5,1),(39,31,1,1),(41,33,30,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_codes`
--

DROP TABLE IF EXISTS `discount_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_codes` (
  `discount_id` int NOT NULL AUTO_INCREMENT,
  `discount_code` varchar(50) NOT NULL,
  `discount_percent` decimal(5,2) NOT NULL,
  `expiry_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`discount_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_codes`
--

LOCK TABLES `discount_codes` WRITE;
/*!40000 ALTER TABLE `discount_codes` DISABLE KEYS */;
INSERT INTO `discount_codes` VALUES (1,'SAVE10',10.00,'2024-12-31 16:59:59'),(2,'SAVE20',20.00,'2025-01-15 16:59:59'),(3,'NEWYEAR',15.00,'2024-01-01 16:59:59'),(4,'SPRINGSALE',25.00,'2024-05-31 16:59:59'),(5,'SUMMER2024',30.00,'2024-08-31 16:59:59'),(6,'WINTER15',15.00,'2024-12-15 16:59:59'),(7,'FALLSALE',20.00,'2024-11-30 16:59:59'),(8,'BOGO50',50.00,'2024-09-01 16:59:59'),(9,'FIRSTORDER',10.00,'2025-01-01 16:59:59'),(10,'FLASHSALE',35.00,'2024-06-15 16:59:59'),(11,'AUTUMN20',20.00,'2024-10-31 16:59:59'),(12,'CLEARANCE30',30.00,'2024-07-15 16:59:59'),(13,'BACKTOSCHOOL',15.00,'2024-09-10 16:59:59'),(14,'MEMORIALDAY',20.00,'2024-05-30 16:59:59'),(15,'EASTER20',20.00,'2024-04-01 16:59:59'),(16,'XMAS25',25.00,'2024-12-25 16:59:59'),(17,'LOYALCUSTOMER',15.00,'2025-02-15 16:59:59'),(18,'HAPPYHOUR',10.00,'2024-11-01 16:59:59'),(19,'FREESHIP',0.00,'2025-01-01 16:59:59'),(20,'WINTERSALE',30.00,'2024-12-01 16:59:59'),(21,'PRESIDENTSDAY',20.00,'2024-02-20 16:59:59'),(22,'HALLOWEEN',15.00,'2024-10-31 16:59:59'),(23,'THANKSGIVING',25.00,'2024-11-28 16:59:59'),(24,'JULY4',20.00,'2024-07-04 16:59:59'),(25,'LIFEHACK',15.00,'2024-08-31 16:59:59'),(26,'SAVEBIG',50.00,'2024-09-15 16:59:59'),(27,'OFF50',50.00,'2025-02-28 16:59:59'),(28,'LIMITEDTIME',30.00,'2025-03-31 16:59:59'),(29,'SCHOOL15',15.00,'2024-09-01 16:59:59'),(30,'SPRING2025',20.00,'2025-06-30 16:59:59');
/*!40000 ALTER TABLE `discount_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `genre_id` int NOT NULL AUTO_INCREMENT,
  `genre_name` varchar(255) NOT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Literature'),(2,'Manga'),(3,'Life Skills'),(4,'Foreign Language'),(5,'Psychology'),(6,'Science');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,1,179000.00),(2,1,2,2,250000.00),(3,2,3,1,120000.00),(4,2,4,1,150000.00),(5,3,5,3,180000.00),(6,3,6,1,300000.00),(7,4,7,1,200000.00),(8,4,8,2,350000.00),(9,5,9,1,190000.00),(10,5,10,1,210000.00),(11,6,11,2,400000.00),(12,6,12,1,450000.00),(13,7,13,1,100000.00),(14,7,14,3,150000.00),(15,8,15,2,50000.00),(16,8,16,1,75000.00),(17,9,17,4,350000.00),(18,9,18,1,90000.00),(19,10,19,2,220000.00),(20,10,20,1,200000.00),(21,11,21,1,180000.00),(22,11,22,2,270000.00),(23,12,23,1,150000.00),(24,12,24,3,300000.00),(25,13,25,1,220000.00),(26,14,26,1,330000.00),(27,15,27,2,450000.00),(28,16,28,1,120000.00),(29,16,29,2,250000.00),(30,17,30,1,300000.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) NOT NULL,
  `discount_id` int DEFAULT NULL,
  `order_status` varchar(50) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `discount_id` (`discount_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`discount_id`) REFERENCES `discount_codes` (`discount_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'2024-01-05 03:00:00',250000.00,1,'Processing'),(2,2,'2024-01-06 04:30:00',150000.00,NULL,'Delivered'),(3,3,'2024-01-07 07:45:00',300000.00,3,'Completed'),(4,4,'2024-01-08 02:20:00',500000.00,2,'Processing'),(5,5,'2024-01-09 09:10:00',200000.00,NULL,'Delivered'),(6,6,'2024-01-10 06:05:00',400000.00,5,'Processing'),(7,7,'2024-01-11 05:30:00',350000.00,4,'Completed'),(8,8,'2024-01-12 08:40:00',100000.00,NULL,'Delivered'),(9,9,'2024-01-13 10:00:00',450000.00,6,'Processing'),(10,10,'2024-01-14 12:25:00',600000.00,7,'Completed'),(11,11,'2024-01-15 14:00:00',275000.00,8,'Processing'),(12,12,'2024-01-16 01:15:00',125000.00,NULL,'Delivered'),(13,13,'2024-01-17 02:30:00',375000.00,9,'Completed'),(14,14,'2024-01-18 03:45:00',225000.00,10,'Processing'),(15,15,'2024-01-19 04:00:00',330000.00,NULL,'Delivered'),(16,1,'2024-02-01 03:00:00',310000.00,11,'Processing'),(17,2,'2024-02-02 04:30:00',410000.00,12,'Delivered'),(18,3,'2024-02-03 07:45:00',250000.00,NULL,'Completed'),(19,4,'2024-02-04 02:20:00',490000.00,13,'Processing'),(20,5,'2024-02-05 09:10:00',190000.00,NULL,'Delivered'),(21,6,'2024-02-06 06:05:00',330000.00,14,'Processing'),(22,7,'2024-02-07 05:30:00',380000.00,15,'Completed'),(23,8,'2024-02-08 08:40:00',220000.00,NULL,'Delivered'),(24,9,'2024-02-09 10:00:00',450000.00,16,'Processing'),(25,10,'2024-02-10 12:25:00',600000.00,17,'Completed'),(26,11,'2024-02-11 14:00:00',275000.00,18,'Processing'),(27,12,'2024-02-12 01:15:00',125000.00,NULL,'Delivered'),(28,13,'2024-02-13 02:30:00',375000.00,19,'Completed'),(29,14,'2024-02-14 03:45:00',225000.00,20,'Processing'),(30,15,'2024-02-15 04:00:00',330000.00,NULL,'Delivered');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `cmt` text,
  `review_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `reviews_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,1,5,'An excellent read! Highly recommend.','2024-11-23 02:45:29'),(2,2,2,4,'Very engaging, but the ending was a bit rushed.','2024-11-23 02:45:29'),(3,3,3,3,'It was okay, not as good as I expected.','2024-11-23 02:45:29'),(4,4,4,2,'Did not enjoy this book, found it dull.','2024-11-23 02:45:29'),(5,5,5,5,'Loved it! A must-read for everyone.','2024-11-23 02:45:29'),(6,6,6,4,'Great characters, but the plot was predictable.','2024-11-23 02:45:29'),(7,7,7,3,'Had some interesting moments but lacked depth.','2024-11-23 02:45:29'),(8,8,8,5,'One of the best books I have ever read!','2024-11-23 02:45:29'),(9,9,9,4,'Well written with a captivating story.','2024-11-23 02:45:29'),(10,10,10,2,'Not my cup of tea, found it quite boring.','2024-11-23 02:45:29'),(11,11,11,1,'Terrible book, did not like it at all.','2024-11-23 02:45:29'),(12,12,12,5,'Fantastic read! Could not put it down.','2024-11-23 02:45:29'),(13,13,13,4,'Very good book, would read it again.','2024-11-23 02:45:29'),(14,14,14,3,'Average, nothing special.','2024-11-23 02:45:29'),(15,15,15,5,'Incredible story and characters!','2024-11-23 02:45:29'),(16,1,16,4,'Enjoyed the themes presented in the book.','2024-11-23 02:45:29'),(17,2,17,5,'A beautiful narrative with rich detail.','2024-11-23 02:45:29'),(18,3,18,3,'Decent book but felt too long.','2024-11-23 02:45:29'),(19,4,19,2,'Did not resonate with me.','2024-11-23 02:45:29'),(20,5,20,5,'An unforgettable journey.','2024-11-23 02:45:29'),(21,6,21,4,'Impressive work, strong character development.','2024-11-23 02:45:29'),(22,7,22,3,'Had some interesting ideas but execution fell flat.','2024-11-23 02:45:29'),(23,8,23,5,'An emotional rollercoaster, loved every page!','2024-11-23 02:45:29'),(24,9,24,4,'Very informative, learned a lot.','2024-11-23 02:45:29'),(25,10,25,2,'Disappointed, expected more from it.','2024-11-23 02:45:29'),(26,11,26,1,'Not worth the time, would not recommend.','2024-11-23 02:45:29'),(27,12,27,5,'A masterpiece in literature!','2024-11-23 02:45:29'),(28,13,28,4,'Well-paced and entertaining.','2024-11-23 02:45:29'),(29,14,29,3,'Some parts were enjoyable, but overall just okay.','2024-11-23 02:45:29'),(30,15,30,5,'This book changed my perspective on life.','2024-11-23 02:45:29');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','password123','john@gmail.com','123-456-7890','123 Main St, Springfield, IL','customer','2023-01-15 03:35:21'),(2,'Jane Smith','mypassword','jane@gmail.com','234-567-8901','456 Oak St, Springfield, IL','customer','2023-02-22 08:22:45'),(3,'Alex Brown','123456','alex.brown@gmail.com','345-678-9012','789 Pine St, Springfield, IL','customer','2023-03-05 01:13:37'),(4,'Chris Jones','password321','chris.jones@gmail.com','456-789-0123','321 Maple Ave, Springfield, IL','customer','2023-03-18 07:55:12'),(5,'Sarah Connor','passw0rd','sarah.connor@gmail.com','567-890-1234','654 Birch Blvd, Springfield, IL','customer','2023-04-03 12:07:53'),(6,'Mike Tyson','qwerty','mike.tyson@gmail.com','678-901-2345','987 Cedar Dr, Springfield, IL','customer','2023-04-25 06:45:09'),(7,'Anna Taylor','password!','anna.taylor@gmail.com','789-012-3456','123 Elm St, Springfield, IL','customer','2023-05-02 02:33:29'),(8,'Will Smith','hunter2','will.smith@gmail.com','890-123-4567','456 Spruce Ln, Springfield, IL','customer','2023-05-16 11:41:19'),(9,'Emily Clark','myp4ssw0rd','emily.clark@gmail.com','901-234-5678','789 Willow Rd, Springfield, IL','customer','2023-05-29 04:05:48'),(10,'Liam Miller','letmein','liam.miller@gmail.com','012-345-6789','321 Ash St, Springfield, IL','customer','2023-06-14 13:22:34'),(11,'Olivia White','pass1234','olivia.white@gmail.com','123-456-7890','654 Fir Ave, Springfield, IL','customer','2023-06-27 08:51:04'),(12,'Noah Jackson','abcdefg','noah.jackson@gmail.com','234-567-8901','987 Cypress Blvd, Springfield, IL','customer','2023-07-12 05:17:59'),(13,'Isabella Martin','p@ssword!','isabella.martin@gmail.com','345-678-9012','123 Redwood St, Springfield, IL','customer','2023-07-25 10:46:38'),(14,'James Lee','password1','james.lee@gmail.com','456-789-0123','456 Walnut Dr, Springfield, IL','customer','2023-08-01 01:43:20'),(15,'Sophia Davis','securepass','sophia.davis@gmail.com','567-890-1234','789 Magnolia Ln, Springfield, IL','customer','2023-08-18 03:55:07'),(16,'Benjamin Clark','mypassword1','benjamin.clark@gmail.com','678-901-2345','321 Beech Rd, Springfield, IL','customer','2023-09-05 02:32:56'),(17,'Charlotte Green','p@ss1234','charlotte.green@gmail.com','789-012-3456','654 Dogwood Blvd, Springfield, IL','customer','2023-09-21 09:28:03'),(18,'Jack Harris','password!','jack.harris@gmail.com','890-123-4567','987 Sequoia St, Springfield, IL','customer','2023-09-30 07:02:18'),(19,'Amelia Moore','letmein2','amelia.moore@gmail.com','901-234-5678','123 Poplar Ave, Springfield, IL','customer','2023-10-12 12:39:22'),(20,'Logan Thomas','mypassword123','logan.thomas@gmail.com','012-345-6789','456 Linden Ln, Springfield, IL','customer','2023-10-27 06:47:10'),(21,'Zoe Baker','qwerty123','zoe.baker@gmail.com','123-456-7890','789 Sycamore Blvd, Springfield, IL','customer','2023-11-01 01:26:44'),(22,'Ethan Roberts','pass4321','ethan.roberts@gmail.com','234-567-8901','321 Chestnut St, Springfield, IL','customer','2023-11-05 04:16:37'),(23,'Mia Adams','securepassword','mia.adams@gmail.com','345-678-9012','654 Hickory Dr, Springfield, IL','customer','2023-11-12 11:22:55'),(24,'Daniel Turner','password987','daniel.turner@gmail.com','456-789-0123','987 Palm Rd, Springfield, IL','customer','2023-11-19 08:39:33'),(25,'Grace Brown','password!2','grace.brown@gmail.com','567-890-1234','123 Aspen Ln, Springfield, IL','customer','2023-11-25 07:07:49'),(26,'Henry Walker','mypassword!','henry.walker@gmail.com','678-901-2345','456 Mahogany St, Springfield, IL','customer','2023-11-30 13:43:05'),(27,'Chloe Scott','p@ssw0rd123','chloe.scott@gmail.com','789-012-3456','789 Hemlock Blvd, Springfield, IL','customer','2023-12-03 05:08:17'),(28,'Lucas Kelly','passw0rd!','lucas.kelly@gmail.com','890-123-4567','321 Holly Dr, Springfield, IL','customer','2023-12-08 10:11:33'),(29,'Ella Edwards','pass12345','ella.edwards@gmail.com','901-234-5678','654 Willow Ln, Springfield, IL','customer','2023-12-14 08:55:09'),(30,'Mason Collins','password_1','mason.collins@gmail.com','012-345-6789','987 Alder St, Springfield, IL','customer','2023-12-20 02:23:48'),(31,'PAIN','123','pain@123gmail.com','15212',NULL,'customer','2024-11-24 08:53:40'),(32,'b2205976','1234','b2205976@123gmail.com','012444',NULL,'customer','2024-11-24 09:32:24'),(33,'hoa','345','tranhuugiang1213@gmail.com','15212',NULL,'customer','2024-11-26 01:50:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`hg`@`%`*/ /*!50003 TRIGGER `check_banned_words` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
    -- Kiểm tra nếu NEW.username chứa các từ cấm trực tiếp
    IF LOWER(NEW.username) LIKE '%god%' OR 
       LOWER(NEW.username) LIKE '%khang%' OR 
       LOWER(NEW.username) LIKE '%nig%' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tên đăng nhập chứa từ cấm. Vui lòng chọn tên khác.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping routines for database 'bookstore_db'
--
/*!50003 DROP FUNCTION IF EXISTS `capitalize` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`hg`@`%` FUNCTION `capitalize`(input VARCHAR(255)) RETURNS varchar(255) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE output VARCHAR(255) DEFAULT '';
    DECLARE ch CHAR(1);
    -- Duyệt qua từng ký tự trong chuỗi
    WHILE i <= CHAR_LENGTH(input) DO
        SET ch = SUBSTRING(input, i, 1);
        -- Viết hoa chữ cái đầu sau dấu khoảng trắng hoặc đầu chuỗi
        IF i = 1 OR SUBSTRING(input, i - 1, 1) = ' ' THEN
            SET output = CONCAT(output, UPPER(ch));
        ELSEIF SUBSTRING(input, i, 1) = ' ' THEN
			SET output=CONCAT(output, ' ');
        ELSE
            SET output = CONCAT(output, LOWER(ch));
        END IF;
        SET i = i + 1;
    END WHILE;
    RETURN output;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchBooks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`hg`@`%` PROCEDURE `SearchBooks`(
    IN searchTerm VARCHAR(255)
)
BEGIN
    SELECT *
    FROM Books
    WHERE title LIKE CONCAT('%', searchTerm, '%')
       OR author LIKE CONCAT('%', searchTerm, '%')
       OR description LIKE CONCAT('%', searchTerm, '%');
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26  9:06:00
