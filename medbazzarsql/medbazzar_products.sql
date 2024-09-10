CREATE DATABASE  IF NOT EXISTS `medbazzar` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `medbazzar`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: medbazzar
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `categoryid` int(11) DEFAULT NULL,
  `subcategoryid` int(11) DEFAULT NULL,
  `brandid` int(11) DEFAULT NULL,
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `productname` varchar(100) DEFAULT NULL,
  `description` text,
  `picture` text,
  PRIMARY KEY (`productid`),
  KEY `category_fk_idx` (`categoryid`),
  KEY `subcategory_fk_idx` (`subcategoryid`),
  KEY `brand_fk_idx` (`brandid`),
  CONSTRAINT `brand_fk` FOREIGN KEY (`brandid`) REFERENCES `brand` (`brandid`) ON DELETE CASCADE,
  CONSTRAINT `category_fk` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE,
  CONSTRAINT `subcategory_fk` FOREIGN KEY (`subcategoryid`) REFERENCES `subcategory` (`subcategoryid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (20,22,26,20,'Istamet','Istamet Anti-Diabetic Medicine','9b9d6960-e75c-4105-8662-bb2864c5c1a0.png'),(20,22,31,21,'Cipla','Cipla  New Cheston Cold Tablet','6c9ec2fe-b066-4b1d-aba0-79de11e78da3.webp'),(20,23,32,22,'Arnica montana','Arnica montana medicine','d617a39e-f000-4e39-9fac-ae24e747b32d.jpeg'),(20,24,28,23,'Meadbery','Meadbery Ayurvedic Liver detoxification','4d79463b-d235-4783-b92e-d56b6a7698aa.jpg'),(21,25,27,24,'MuscleBlaze','MuscleBlaze Beginner\'s Protein','61f0cf45-0d45-4465-b438-74d4b9b6975d.jpg'),(21,26,29,25,'Nutrela','NUTRELA Patanjali Organic  Nutrition Supplement','2da1f6cd-34e9-478c-a8a5-f30d71e59db9.jpg'),(21,27,30,26,'WiseLife','WiseLife TRU Body Alignment Yoga Mat ','7ce38f1a-b120-487a-9178-fa379f1fa21a.jpg'),(22,28,35,27,'Wow','WOW Skin Science Onion Oil Shampoo ','f2c0d566-5852-49b4-8734-e4ac7d3beedd.jpg'),(22,29,36,28,'L\'Oreal','L\'Oreal Paris Perfect Skin 30+ Day Cream','9c0cfb5b-01c3-4e45-b6c5-fe3118bb7a8c.jpg'),(22,30,33,29,'Himalaya','Himalaya Nourishing Body Lotion','629aba65-93a9-4280-b3e0-1812721b2a0e.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-10 21:28:03
