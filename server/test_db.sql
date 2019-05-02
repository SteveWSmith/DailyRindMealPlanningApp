-- MySQL dump 10.17  Distrib 10.3.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: test_db
-- ------------------------------------------------------
-- Server version	10.3.13-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allergy`
--

DROP TABLE IF EXISTS `allergy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `allergy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergy`
--

LOCK TABLES `allergy` WRITE;
/*!40000 ALTER TABLE `allergy` DISABLE KEYS */;
/*!40000 ALTER TABLE `allergy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_token`
--

DROP TABLE IF EXISTS `auth_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `expires_at` datetime DEFAULT (current_timestamp() + interval 3 day),
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auth_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_token`
--

LOCK TABLES `auth_token` WRITE;
/*!40000 ALTER TABLE `auth_token` DISABLE KEYS */;
INSERT INTO `auth_token` VALUES (3,1,'2019-03-15 13:10:37','2019-03-18 13:10:37','abcd'),(4,1,'2019-03-15 13:10:40','2019-03-18 13:10:40','abc'),(5,1,'2019-03-15 13:22:17','2019-03-18 13:22:17','abcde');
/*!40000 ALTER TABLE `auth_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `calendar_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  CONSTRAINT `calendar_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (2,'anchovies','anchovies.jpg'),(3,'baking powder','white-powder.jpg'),(4,'egg','egg.png'),(5,'flour','flour.png'),(6,'sage leaves','fresh-sage.png'),(7,'salt','salt.jpg'),(8,'seltzer water','sparkling-water.png'),(9,'vegetable oil','vegetable-oil.jpg'),(10,'bread','white-bread.jpg'),(11,'garlic clove','garlic.jpg'),(12,'olive oil','olive-oil.jpg'),(13,'scallions','spring-onions.jpg'),(14,'acini di pepe','pastina.jpg'),(15,'almonds','almonds.jpg'),(16,'carrots','sliced-carrot.png'),(17,'cauliflower','cauliflower.jpg'),(18,'extra virgin olive oil','olive-oil.jpg'),(19,'extra-virgin olive oil','olive-oil.jpg'),(20,'lemon juice','lemon-juice.jpg'),(21,'rocket','arugula-or-rocket-salad.jpg'),(22,'salt and pepper','salt-and-pepper.jpg'),(23,'baby-back ribs','baby-back-ribs.jpg'),(24,'cooking oil','vegetable-oil.jpg'),(25,'frying oil','vegetable-oil.jpg'),(26,'garlic','garlic.jpg'),(27,'ground ginger','ginger.png'),(28,'pine nuts','pine-nuts.png'),(29,'plum','plum.jpg'),(30,'rice syrup','corn-syrup.png'),(31,'sesame seeds','sesame-seeds.png'),(32,'sugar','sugar-in-bowl.png'),(33,'capers','capers.jpg'),(34,'salted anchovies','anchovies.jpg'),(35,'unsalted butter','butter-sliced.jpg'),(36,'cayenne pepper','chili-powder.jpg'),(37,'cherry tomatoes','cherry-tomatoes.png'),(38,'crusty bread','crusty-bread.jpg'),(39,'eggs','egg.png'),(40,'anchovy','anchovies.jpg'),(41,'basil leaves','fresh-basil.jpg'),(42,'bread crumbs','breadcrumbs.jpg'),(43,'pepper','pepper.jpg'),(44,'red onion','red-onion.png'),(45,'sherry vinegar','dark-sauce.jpg'),(46,'tomato','roma-tomatoes.png'),(47,'bell pepper','yellow-bell-pepper.jpg'),(48,'chillies','red-chili.jpg'),(49,'coarse sea salt','salt.jpg'),(50,'fresh anchovies','anchovies.jpg'),(51,'fresh parsley','parsley-curly.png'),(52,'fresh thyme','thyme.jpg'),(53,'garlic cloves','garlic.jpg'),(54,'juice of lemon','lemon-juice.jpg'),(55,'pecorino','parmesan.jpg'),(56,'spaghetti','spaghetti.jpg'),(57,'walnuts','walnuts.jpg');
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `directions` text NOT NULL,
  `pic_url` varchar(200) NOT NULL,
  `prep_time` float NOT NULL,
  `servings` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES (2,'Fried Anchovies with Sage','<p>If you have not tried anchovies before - you must try them now! Get over any weird apprehensions or that its just bait or a punchline for a joke about pizza (\"extra anchovies\")! These little suckers are delicious &amp; actually good for you! Baked, fried &amp; grilled - they are ohh so good and worth a try. If your not up to it, then pass me your plate because I love\'em!Here is my favorite - Fried Anchovies - the recipe below adds a sage leave to each piece of fish as well for an extra burst of flavor &amp; color.Fried Anchovies with SageAcciughe fritte con Salvia1lb of anchovies cleaned, spine removedsage leaves (optional - if you are not a fan of sage just omit)batter1 cup of flour1 egg1 teaspoon of salt1 teaspoon of baking powderseltzer watervegetable oil for fryingIn a bowl combine flour, eggs, salt &amp; baking powder. Slowly add in seltzer water &amp; mix until forms a thin batter. Cover with plastic &amp; set in the fridge for at least an hour.Heat oil in a pot to 350 degree.Remove batter from fridge and mix once or twice (batter will have separated).Take a sage leaf &amp; anchovy put them together &amp; dip into the batter - allowing access batter to drip off.Fry 20 seconds a side until golden brown.Remove from oil &amp; drain on a paper towel.Sprinkle with salt &amp; serve immediately.Pairs great with prosecco or white wine.</p>','https://spoonacular.com/recipeImages/1-556x370.jpg',45,3),(3,'Anchovies Appetizer With Breadcrumbs & Scallions','<ol><li>Preheat oven to 400 F.</li><li>Remove crusts from bread and cut into bite-sized croutons.</li><li>Rub garlic in bottom of a small oven-safe skillet, add 2 teaspoons olive oil.</li><li> Rub croutons in oil until they absorb it all. </li><li>Bake for 7-10 minutes or until deep golden brown. </li><li>Remove and set aside.</li><li>Slice anchovies in thirds. </li><li>Toss with scallions. </li><li>Divide into small cups, ramekins or bowls between 4 and 8 ounces and nestle in the croutons.</li></ol>','https://spoonacular.com/recipeImages/2-556x370.jpg',15,8),(4,'Bread, Butter And Anchovies','Slice bread into 1cm thick slices: you can toast them or use them as they are. I prefer a soft bread to exalt butter softness. Spread butter with generosity over the bread.If you want to use salted anchovies, rinse them under running water to remove extra salt and divide them into fillets, removing all the bones. If you use anchovies in oil, just make two fillets out of them and lay them over buttered bread.And now, the final touch: a pickled baby caper in the centre, and - in less than 3 minutes - you have an unusual afternoon break or a fun anti-crisis and anti-panic appetizer for Christmas.','https://spoonacular.com/recipeImages/5-556x370.jpg',3,1),(5,'Fried Anchovies','If you are using whole, fresh anchovies you must clean them first. Pull off the heads and pull out the insides. Then rinse with clean water.Pour the olive oil into a small deep saucepan set over heat. Use a deep fry thermometer to monitor the heat.Meanwhile, add the eggs to a small bowl and beat until well mixed. Add the flour, cayenne, salt and black pepper to a shallow bowl, use a fork to mix the ingredients together. Dip the fish one at a time into the beaten eggs and then roll it in flour.When the oil reaches 365 degrees F. fry the fish a few at a time, rolling them around in the oil to assure even cooking until they are golden brown (about 5-8 minutes). Serve with crusty bread, extra-virgin olive oil for dipping the bread (optional) and tomatoes.','https://spoonacular.com/recipeImages/6-556x370.jpg',15,15);
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_ingredient`
--

DROP TABLE IF EXISTS `recipe_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipe_ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ingredient_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `unit` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ingredient_id` (`ingredient_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `recipe_ingredient_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`),
  CONSTRAINT `recipe_ingredient_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredient`
--

LOCK TABLES `recipe_ingredient` WRITE;
/*!40000 ALTER TABLE `recipe_ingredient` DISABLE KEYS */;
INSERT INTO `recipe_ingredient` VALUES (1,2,2,1,'lb'),(2,3,2,1,'teaspoon'),(3,4,2,1,''),(4,5,2,1,'cup'),(5,6,2,1,'leaves'),(6,7,2,1,'teaspoon'),(7,8,2,3,'servings'),(8,9,2,3,'servings'),(9,2,3,6,'oz'),(10,10,3,2,'oz'),(11,11,3,0.5,''),(12,12,3,2,'tsps'),(13,13,3,2,''),(14,10,4,1,'serving'),(15,33,4,1,'serving'),(16,34,4,1,'serving'),(17,35,4,1,'serving'),(18,2,5,1,'lb'),(19,36,5,0.25,'t'),(20,37,5,0,''),(21,38,5,0,''),(22,39,5,3,'large'),(23,18,5,0,''),(24,5,5,1.5,'c'),(25,12,5,2,'c'),(26,22,5,0,'');
/*!40000 ALTER TABLE `recipe_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `fname` varchar(80) NOT NULL,
  `lname` varchar(80) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `security_question` varchar(200) NOT NULL,
  `security_answer` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test@test.com','password','fname','lname',1,'question','answer');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_allergy`
--

DROP TABLE IF EXISTS `user_allergy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_allergy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `allergy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `allergy_id` (`allergy_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_allergy_ibfk_1` FOREIGN KEY (`allergy_id`) REFERENCES `allergy` (`id`),
  CONSTRAINT `user_allergy_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_allergy`
--

LOCK TABLES `user_allergy` WRITE;
/*!40000 ALTER TABLE `user_allergy` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_allergy` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-19 15:56:02
