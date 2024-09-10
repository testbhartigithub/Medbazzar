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
-- Table structure for table `productdetails`
--

DROP TABLE IF EXISTS `productdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `productdetails` (
  `productdetailid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) DEFAULT NULL,
  `subcategoryid` int(11) DEFAULT NULL,
  `brandid` int(11) DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `productsubname` varchar(70) DEFAULT NULL,
  `concernid` int(11) DEFAULT NULL,
  `weight` varchar(100) DEFAULT NULL,
  `weighttype` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `packaging` varchar(70) DEFAULT NULL,
  `qty` decimal(10,0) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `offerprice` decimal(10,0) DEFAULT NULL,
  `offertype` varchar(100) DEFAULT NULL,
  `description` text,
  `picture` text,
  PRIMARY KEY (`productdetailid`),
  KEY `category_fk_idx` (`categoryid`),
  KEY `subcategory_fk_idx` (`subcategoryid`),
  KEY `brand_fk_idx` (`brandid`),
  KEY `product_fk_idx` (`productid`),
  KEY `concernid_fk_idx` (`concernid`),
  CONSTRAINT `brandid_fk` FOREIGN KEY (`brandid`) REFERENCES `brand` (`brandid`) ON DELETE CASCADE,
  CONSTRAINT `categoryid_fk` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE,
  CONSTRAINT `concernid_fk` FOREIGN KEY (`concernid`) REFERENCES `concern` (`concernid`) ON DELETE CASCADE,
  CONSTRAINT `productid_fk` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`) ON DELETE CASCADE,
  CONSTRAINT `subcategoryid_fk` FOREIGN KEY (`subcategoryid`) REFERENCES `subcategory` (`subcategoryid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productdetails`
--

LOCK TABLES `productdetails` WRITE;
/*!40000 ALTER TABLE `productdetails` DISABLE KEYS */;
INSERT INTO `productdetails` VALUES (37,20,22,31,21,'Cipla limited Paracetamol',10,'250','mg','Tablet','Strip',10,65,43,'Weakend Sale','<p><span style=\"color: rgb(88, 89, 91);\">CHESTON COLD TABLET is a combination of Cetirizine, Paracetamol, and Phenylephrine, which belong to the group of medicines called Antihistamines, Analgesic and Antipyretics, and Nasal Decongestants, respectively. CHESTON COLD TABLET is used to relieve symptoms of common cold, such as a blocked nose, runny nose, watery eyes, sneezing, congestion or stuffiness, fever, and headache. It reduces congestion and helps with easy breathing.</span></p>','97971f38-ebb7-4c7f-b0ed-27fb150065dc.webp,e93837e9-d1ff-4921-82e5-0d35cec7344f.webp,96fb247c-3ee7-429e-82c1-6f489a725a54.webp,48703be5-d228-42d7-b47d-a49531615e82.webp'),(38,20,23,29,25,'Patanjali Nutrela Organic Omega',15,'60','gm','Bottle','Bottle',60,800,714,'Weakend Sale','<p>Certified Organic, GMO Free, Vegetarian, Gluten Free, Plant Based</p><p><br></p><p><br></p><p><br></p>','e14544aa-36ca-4b95-b31c-98bad6bcc9a7.jpg,60ed4cda-3645-431a-aa9b-1f055bbd7e37.jpg,e7de16d5-b6fc-4e23-8654-2de565603380.jpg,c75d9b8b-782b-42f6-9ac3-d9a3f07a32ea.jpg'),(39,20,23,32,22,'Arnica montana',14,'30','gm','Gel','Strip',12,115,85,'','<p><span style=\"color: rgb(35, 31, 32);\">Customize your care with Boiron single medicines for highly targeted relief. Arnica Montana is a homeopathic medicine that relieves muscle pain, stiffness, swelling from injuries, bruises.</span></p>','243ebd42-0a71-43b5-a240-72754c5c9469.jpeg,1f0f86aa-c474-460b-935e-90ec77b039a6.jpg,0dd9d2b0-374e-452b-b2ab-0bf91187fa01.jpg'),(40,21,27,30,26,'WiseLife Printed 6MM Yoga Mats',18,'6','kg','Other','Single',12,1564,1454,'Weakend Sale','<p><span style=\"color: rgb(15, 17, 17);\">he WiseLife Yoga Mat is designed to give you the most comfortable yoga experience possible. The extra thick 6mm mat protects joints without compromising support or stability.&nbsp;</span></p>','fe242df5-5fa5-40ad-bc1c-98dad2c8ae44.jpg,c08ee70b-8bdb-4dda-b9e2-cee426d65a86.jpg,47666308-09fd-4b65-8103-71e91e4d8ef1.jpg,de33a4ac-b550-43fd-84ad-3ee0b705c18a.jpg,140da38a-a485-42c1-9686-b8b7d0fd6437.jpg'),(41,21,25,27,24,'MuscleBlaze Biozyme Performance Whey',16,'5','Kg','Other','Single',26,4599,4499,'Weakend Sale','<p><span style=\"color: rgb(74, 94, 120);\">MuscleBlaze Biozyme Performance Whey is crafted exclusively for fitness and muscle-building champions who want their protein supplement to be as effective as their efforts. It is scientifically designed with Enhanced Absorption Formula (EAF®) to maximize the bioavailability of protein for the Indian bodies.</span></p>','1760fd97-0f08-4134-8a59-e8055d68d35b.jpg,f927bdf0-6bd3-4716-8f8b-cfb74b6fc888.jpg,d34947e2-9d13-4db3-a64d-cee7c29f5314.jpg,6cec1622-93a6-42c7-8c88-97b2593fdaeb.jpg'),(42,22,29,33,29,'Himalaya Purifying Neem Face Wash',18,'50','gm','Gel','Box',15,90,50,'Weakend Sale','<p><span style=\"color: rgb(51, 51, 51);\">Himalaya Purifying Neem Face Wash is a soap-free, herbal formulation that cleanses impurities and helps clear pimples. A natural blend of Neem and Turmeric brings together their antibacterial and antifungal properties to prevent recurrence of acne over time.</span></p>','88f839f5-4fd3-444f-a79b-f35e9f08a53a.jpg,80e105e0-9540-4d19-8966-a1de28502089.jpg,2e38e319-218b-47a0-8222-d3119a540b45.jpg'),(43,22,28,35,27,'Apple Cider Vinegar Foaming Face Wash',18,'90','gm','Lotion','Bottle',25,655,399,'Weakend Sale','<p><span style=\"background-color: rgb(249, 246, 230); color: rgb(111, 70, 50);\">Reveal your skin\'s true potential with our WOW Skin Science Apple Cider Vinegar Foaming Face Wash. Experience a complexion that\'s not just clean, but visibly healthier, brighter, and more supple with every wash!</span></p>','5c81bc2b-d729-49b7-9a37-00cf149f7fbf.jpg,7ce0ba5e-afae-4eaa-ac87-3b2f5a370894.jpg,8d5ced5d-e223-4263-8cc4-035935748da1.webp,74adf591-b027-437d-826f-5a22d86b1eb0.webp,674fb168-f048-46d8-8f21-dd9f7cc68c1e.jpg'),(44,22,29,36,28,'L\'Oreal Paris Anti-Lines',18,'35','gm','Cream','Single',55,559,449,'Weakend Sale','<ul><li>Anti-fine-lines and brightening day cream for people over 30, Fights 1st signs of aging, dull skin and visible pores.</li><li>Makes skin smooth and soft and pores are visibly reduced, For moisturized skin that glows</li><li>On a cleansed face apply day cream onto face, Use daily, Use twice a day for best results.</li></ul><p><br></p>','755199c3-27d4-4e0e-a943-6e2665ef5808.jpg,2f1b7414-a7d7-4dc2-83d3-cf78d9a4bb7c.jpg,cdad0f7d-f540-4e16-910d-71b97f0514f8.jpg,76294780-26ab-4cb3-ab66-b314d1d74af2.jpg,0120fbe6-b3cb-42f5-b7b3-aeef6bb909e5.jpg');
/*!40000 ALTER TABLE `productdetails` ENABLE KEYS */;
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
