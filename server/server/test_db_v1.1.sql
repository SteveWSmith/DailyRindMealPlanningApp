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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergy`
--

LOCK TABLES `allergy` WRITE;
/*!40000 ALTER TABLE `allergy` DISABLE KEYS */;
INSERT INTO `allergy` VALUES (1,'cow milk'),(2,'cheese'),(3,'milk powder'),(4,'butter'),(5,'Margarine'),(6,'yogurt'),(7,'cream'),(8,'ice cream'),(9,'egg'),(10,'brazil nuts'),(11,'almonds'),(12,'cashews'),(13,'macademia nuts'),(14,'pistachios'),(15,'pine nuts'),(16,'walnuts'),(17,'peanuts'),(18,'shellfish'),(19,'shrimp'),(20,'prawns'),(21,'crayfish'),(22,'lobster'),(23,'squid'),(24,'scallops'),(25,'wheat'),(26,'soy'),(27,'fish'),(28,'banana'),(29,'sesame seed'),(30,'peach'),(31,'trial'),(33,'atest');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_token`
--

LOCK TABLES `auth_token` WRITE;
/*!40000 ALTER TABLE `auth_token` DISABLE KEYS */;
INSERT INTO `auth_token` VALUES (26,4,'2019-03-26 23:24:48','2019-03-29 23:24:48','ZlzgJLNjOGgEpncGoGwuqJXsbAyMOptVvMghTsnfRZUnjkwaUF');
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
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `calendar_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  CONSTRAINT `calendar_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES (2,3,4,'2019-03-27'),(3,4,4,'2019-03-27'),(4,5,4,'2019-03-27'),(5,2,4,'2019-03-14'),(6,2,4,'2019-03-14'),(8,2,4,'2019-03-14'),(10,2,4,'2019-03-14');
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
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (2,'anchovies','anchovies.jpg'),(3,'baking powder','white-powder.jpg'),(4,'egg','egg.png'),(5,'flour','flour.png'),(6,'sage leaves','fresh-sage.png'),(7,'salt','salt.jpg'),(8,'seltzer water','sparkling-water.png'),(9,'vegetable oil','vegetable-oil.jpg'),(10,'bread','white-bread.jpg'),(11,'garlic clove','garlic.jpg'),(12,'olive oil','olive-oil.jpg'),(13,'scallions','spring-onions.jpg'),(14,'acini di pepe','pastina.jpg'),(15,'almonds','almonds.jpg'),(16,'carrots','sliced-carrot.png'),(17,'cauliflower','cauliflower.jpg'),(18,'extra virgin olive oil','olive-oil.jpg'),(19,'extra-virgin olive oil','olive-oil.jpg'),(20,'lemon juice','lemon-juice.jpg'),(21,'rocket','arugula-or-rocket-salad.jpg'),(22,'salt and pepper','salt-and-pepper.jpg'),(23,'baby-back ribs','baby-back-ribs.jpg'),(24,'cooking oil','vegetable-oil.jpg'),(25,'frying oil','vegetable-oil.jpg'),(26,'garlic','garlic.jpg'),(27,'ground ginger','ginger.png'),(28,'pine nuts','pine-nuts.png'),(29,'plum','plum.jpg'),(30,'rice syrup','corn-syrup.png'),(31,'sesame seeds','sesame-seeds.png'),(32,'sugar','sugar-in-bowl.png'),(33,'capers','capers.jpg'),(34,'salted anchovies','anchovies.jpg'),(35,'unsalted butter','butter-sliced.jpg'),(36,'cayenne pepper','chili-powder.jpg'),(37,'cherry tomatoes','cherry-tomatoes.png'),(38,'crusty bread','crusty-bread.jpg'),(39,'eggs','egg.png'),(40,'anchovy','anchovies.jpg'),(41,'basil leaves','fresh-basil.jpg'),(42,'bread crumbs','breadcrumbs.jpg'),(43,'pepper','pepper.jpg'),(44,'red onion','red-onion.png'),(45,'sherry vinegar','dark-sauce.jpg'),(46,'tomato','roma-tomatoes.png'),(47,'bell pepper','yellow-bell-pepper.jpg'),(48,'chillies','red-chili.jpg'),(49,'coarse sea salt','salt.jpg'),(50,'fresh anchovies','anchovies.jpg'),(51,'fresh parsley','parsley-curly.png'),(52,'fresh thyme','thyme.jpg'),(53,'garlic cloves','garlic.jpg'),(54,'juice of lemon','lemon-juice.jpg'),(55,'pecorino','parmesan.jpg'),(56,'spaghetti','spaghetti.jpg'),(57,'walnuts','walnuts.jpg'),(58,'boquerones','anchovies.jpg'),(59,'red bell peppers','red-pepper.jpg'),(60,'anchovies in extra virgin olive oil','anchovies.jpg'),(61,'balsamic vinegar','balsamic-vinegar.jpg'),(62,'basil','fresh-basil.jpg'),(63,'couscous','couscous-cooked.jpg'),(64,'green beans','green-beans-or-string-beans.jpg'),(65,'salad mix','mixed-greens-or-mesclun.jpg'),(66,'tomatoes','roma-tomatoes.png'),(67,'vegetarian bacon','raw-bacon.png'),(68,'baguette','half-baguette.jpg'),(69,'chives','fresh-chives.jpg'),(70,'coarse kosher salt','salt.jpg'),(71,'fresh chives','fresh-chives.jpg'),(72,'radishes','radishes.jpg'),(73,'anchovy filets','anchovies.jpg'),(74,'fire-roasted tomatoes','tomatoes-canned.png'),(75,'herbs','mixed-fresh-herbs.jpg'),(76,'Salt & Pepper','salt-and-pepper.jpg'),(77,'summer squash','yellow-squash.jpg'),(78,'sun-dried tomatoes','sundried-tomatoes.jpg'),(79,'Top Sirloin','top-sirloin-steak.jpg'),(80,'cornmeal','cornmeal.png'),(81,'fennel','fennel.png'),(82,'fennel bulb','fennel.png'),(83,'lemon zest','zest-lemon.jpg'),(84,'mozzarella cheese','mozzarella.png'),(85,'pizza dough','pizza-dough.jpg'),(86,'active yeast','yeast-granules.jpg'),(87,'bouquet garni','mixed-fresh-herbs.jpg'),(88,'olives','olives-mixed.jpg'),(89,'onions','brown-onion.png'),(90,'rosemary','rosemary.jpg'),(91,'black olives','black-olives.jpg'),(92,'brown sugar','light-brown-sugar.jpg'),(93,'parsley','parsley-curly.png'),(94,'oil','vegetable-oil.jpg'),(95,'puff pastry','puff-pastry.png'),(96,'hungarian paprika','paprika.jpg'),(97,'kosher salt','salt.jpg'),(98,'lemon wedges','lemon-wedge.png'),(99,'panko bread crumbs','panko.jpg'),(100,'paprika','paprika.jpg'),(101,'kalamata olives','calamata-or-kalamata-olives.jpg'),(102,'loin roast','pork-loin.jpg'),(103,'black peppercorns','black-pepper.png'),(104,'celery','celery.jpg'),(105,'chicory','escarole.jpg'),(106,'curly parsley','parsley-curly.png'),(107,'onion','brown-onion.png'),(108,'sea salt','salt.jpg'),(109,'skate','skate-or-ray.jpg'),(110,'white wine','white-wine.jpg'),(111,'wine vinegar','red-wine-vinegar.jpg'),(112,'bread cubes','croutons.png'),(113,'mustard greens','chinese-mustard-green.jpg'),(114,'butter','butter-sliced.jpg'),(115,'lemon','lemon.png'),(116,'flat-leaf parsley','parsley-curly.png'),(117,'fresh sage leaves','fresh-sage.png'),(118,'shallot','shallots.jpg'),(119,'dried thyme','thyme.jpg'),(120,'ice water','water.png'),(121,'tomato paste','tomato-paste.jpg'),(122,'flatleaf parsley','parsley-curly.png'),(123,'oregano','oregano.jpg'),(124,'parmesan','parmesan.jpg'),(125,'red chili flakes','red-pepper-flakes.jpg'),(126,'tomato sauce','tomato-sauce-or-pasta-sauce.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES (2,'Fried Anchovies with Sage','<p>If you have not tried anchovies before - you must try them now! Get over any weird apprehensions or that its just bait or a punchline for a joke about pizza (\"extra anchovies\")! These little suckers are delicious &amp; actually good for you! Baked, fried &amp; grilled - they are ohh so good and worth a try. If your not up to it, then pass me your plate because I love\'em!Here is my favorite - Fried Anchovies - the recipe below adds a sage leave to each piece of fish as well for an extra burst of flavor &amp; color.Fried Anchovies with SageAcciughe fritte con Salvia1lb of anchovies cleaned, spine removedsage leaves (optional - if you are not a fan of sage just omit)batter1 cup of flour1 egg1 teaspoon of salt1 teaspoon of baking powderseltzer watervegetable oil for fryingIn a bowl combine flour, eggs, salt &amp; baking powder. Slowly add in seltzer water &amp; mix until forms a thin batter. Cover with plastic &amp; set in the fridge for at least an hour.Heat oil in a pot to 350 degree.Remove batter from fridge and mix once or twice (batter will have separated).Take a sage leaf &amp; anchovy put them together &amp; dip into the batter - allowing access batter to drip off.Fry 20 seconds a side until golden brown.Remove from oil &amp; drain on a paper towel.Sprinkle with salt &amp; serve immediately.Pairs great with prosecco or white wine.</p>','https://spoonacular.com/recipeImages/1-556x370.jpg',45,3),(3,'Anchovies Appetizer With Breadcrumbs & Scallions','<ol><li>Preheat oven to 400 F.</li><li>Remove crusts from bread and cut into bite-sized croutons.</li><li>Rub garlic in bottom of a small oven-safe skillet, add 2 teaspoons olive oil.</li><li> Rub croutons in oil until they absorb it all. </li><li>Bake for 7-10 minutes or until deep golden brown. </li><li>Remove and set aside.</li><li>Slice anchovies in thirds. </li><li>Toss with scallions. </li><li>Divide into small cups, ramekins or bowls between 4 and 8 ounces and nestle in the croutons.</li></ol>','https://spoonacular.com/recipeImages/2-556x370.jpg',15,8),(4,'Bread, Butter And Anchovies','Slice bread into 1cm thick slices: you can toast them or use them as they are. I prefer a soft bread to exalt butter softness. Spread butter with generosity over the bread.If you want to use salted anchovies, rinse them under running water to remove extra salt and divide them into fillets, removing all the bones. If you use anchovies in oil, just make two fillets out of them and lay them over buttered bread.And now, the final touch: a pickled baby caper in the centre, and - in less than 3 minutes - you have an unusual afternoon break or a fun anti-crisis and anti-panic appetizer for Christmas.','https://spoonacular.com/recipeImages/5-556x370.jpg',3,1),(5,'Fried Anchovies','If you are using whole, fresh anchovies you must clean them first. Pull off the heads and pull out the insides. Then rinse with clean water.Pour the olive oil into a small deep saucepan set over heat. Use a deep fry thermometer to monitor the heat.Meanwhile, add the eggs to a small bowl and beat until well mixed. Add the flour, cayenne, salt and black pepper to a shallow bowl, use a fork to mix the ingredients together. Dip the fish one at a time into the beaten eggs and then roll it in flour.When the oil reaches 365 degrees F. fry the fish a few at a time, rolling them around in the oil to assure even cooking until they are golden brown (about 5-8 minutes). Serve with crusty bread, extra-virgin olive oil for dipping the bread (optional) and tomatoes.','https://spoonacular.com/recipeImages/6-556x370.jpg',15,15),(6,'Roasted Peppers with Boquerones','Preparation                                                        Preheat broiler.                                                                Broil bell peppers on a broiler pan about 5 inches from heat, turning occasionally with tongs, until skins are blackened, 15 to 20 minutes. Transfer to a large bowl and cover bowl tightly with plastic wrap, then let steam 20 minutes.                                                                When peppers are cool enough to handle, peel them, reserving all juices in bowl, and discard stems and seeds. Cut peppers lengthwise into 1/4-inch-wide strips. Pour pepper juices through a sieve into another bowl, then add vinegar and sugar to juices, stirring until sugar is dissolved, then stir in peppers. Marinate peppers at room temperature, stirring occasionally, at least 2 hours.                                                                Spoon peppers and juices into a shallow bowl and arrange anchovy strips decoratively on top.                                                Cooks\' note:            Peppers can marinate (without anchovies), covered and chilled, up to 3 days. Bring to room temperature before serving.','https://spoonacular.com/recipeImages/12-556x370.jpg',4500,12),(7,'Sliced Baguette With Radishes And Anchovy Butter','Mix butter, 2 chopped anchovy fillets, and 2 tablespoons chives in small bowl, adding 1 more chopped anchovy fillet to taste, if desired. Season with salt and freshly ground black pepper. Spread anchovy butter over 1 side of each baguette slice. Top each baguette slice with radish slices, overlapping slightly to cover bread. Garnish with additional chopped chives and serve.','https://spoonacular.com/recipeImages/16-556x370.jpg',45,1),(8,'Savory Slow Roasted Tomatoes with Filet of Anchovy','It\'s tomato season, so keep it simple while cooking. No need to make heavy sauces with all those gorgeous tomatoes that are bursting with flavor - try a simple 5 ingredient recipe with slow roasted tomatoes, herbs, loads of olive oil and topped with a filet of anchovy! This recipe is straight from the seaside of Le Marche, where we first devoured this delicious antipasto in Numana.On a hot summer\'s day, we keep the kitchen oven off & make these in our outdoor wood burning oven!Roasted Tomatoes with AnchoviesPomodori al forno con le acciugheserves 44 round tomatoes (we grow & use grappolo for this dish)small handful of any fresh herbs you like, chopped - we use oregano but you can also use basil, thyme, etc.salt & peppergood quality extra virgin olive oil8 high quality anchovy filets, (we use anchovies from Sardegna packed in salt)Preheat oven to 150 C or 280 FCut the top 3rd off the tomatoes & discard top.Place tomatoes on a baking tray, lined with parchment paper. Sprinkle generously with salt, pepper & herbs. Drizzle with a generous amount of olive oil. Place in the oven for 4-6 hours depending on the size of your tomatoes. Every once in a while as you pass the kitchen, baste the tomatoes in the juices & olive oil in the pan.Once the tomatoes shrivel up a bit & start to look sun-dried, they are ready. They should still hold their shape & not become mush.Remove from oven, top each tomato with a whole anchovy filet. Serve warm or room temperature with olive oil from the baking pan drizzled over the top.','https://spoonacular.com/recipeImages/17-556x370.jpg',45,2),(9,'No-knead Fennel & Anchovy Pizza','Preheat oven to 500 F. If you have a pizza stone, stick it in the oven.In a small skillet, heat 1 tablespoon olive oil over medium heat. Add fennel slices and cook, stirring occasionally, until slightly browned. Remove from heat.With floured hands over a floured surface, stretch or toss (if you know how) the dough until it is 10-12\", taking care not to stretch it too thin. Uneven is okay, this dough makes a rustic crust. No need to aim for a perfect circle either. Press small thumbprints around the crust and brush with remaining tablespoon olive oil.Sprinkle a baking sheet with cornmeal and transfer the crust over. Re-shape if it\'s gone askew. Top with the mozzarella slices, fennel, and anchovy. Slide onto the pizza stone, or place baking sheet in oven.Cook until crust looks golden brown and cheese is bubbling, 6-10 minutes. When ready, carefully pull from the oven, top with lemon zest, a few cracks of pepper and the fennel fronds. Slice and serve. For the No-Knead Pizza Dough recipe and the story behind it, see the TastingTable.com article, Jim Lahey Reveals His Recipe for No-Knead Pizza Dough No time to wait for No-Knead? Roll your sleeves up and try our recipe for Homemade Thin Crust PizzaPin itLast Week\'s Posted Email: On Making Your Own PastaShow Nutritionbalancedsugar-consciousPer serving, based on2servings.(% daily value)Calories541Fat26.2 g(40.3%)Saturated8.3 g(41.7%)Carbs58 g(19.3%)Fiber3.2 g(12.7%)Sugars1.3 gProtein17.7 g(35.4%)Cholesterol31.5 mg(10.5%)Sodium813.2 mg(33.9%)','https://spoonacular.com/recipeImages/19-556x370.jpg',26,3),(10,'Anchovy And Onion Tart','Instructions','https://spoonacular.com/recipeImages/22-556x370.jpg',45,6),(11,'Easy Onion And Anchovy Tart','Preheat the oven to 200C/fan180C/gas6. Put a large baking sheet into the oven to warm up. Heat the oil in a large saute pan, add the onions and the sugar, and cook, uncovered for 20 minutes until the onions are meltingly soft and starting to caramelise. If the onions look a little dry at any point, add a splash of water. (A tip: if you have some onion chutney or onion marmalade to hand, a dollop of this in here will add to the flavour. While the onions are cooking, roll out your pastry to the thickness of a pound coin, and so it fits your baking sheet. Prick the pastry 4 or 5 times with a fork. Carefully remove your hot baking sheet from the oven and slide the pastry onto it. Return in the oven for 6 to 8 minutes.Take the baking sheet out of the oven and spread with the cooked onions, leaving a border of pastry free around the edges. Arrange your anchovies and cut olives over the top of the onions. Add a drizzle of olive oil if you like. Put back in the oven for 20 minutes, or until the pastry is golden and crisp on the border, and the base is completely cooked. Sprinkle with parsley, cut into big slices and enjoy hot or cool  - equally delicious. This is great with a tomato salad, or some roasted beetroot.','https://spoonacular.com/recipeImages/24-556x370.jpg',50,50),(12,'Anchovy Fries with Smoked Paprika Aioli','Stir mayonnaise, lemon juice, garlic, and paprikas together in a bowl. Chill aioli until serving.                                                                                                 Clean fish (steps 1 and 2 of \"You Found the Fish,\" below).                                                                                                 Preheat oven to 200. Line a rimmed baking sheet with paper towels and keep warm in oven. Fill a large pot with 1 in. oil, insert a deep-fry thermometer, and bring oil to 375 over medium-high heat.                                                                                                 Combine flour and 1/2 tsp. salt in a pie pan, and panko and remaining 1/2 tsp. salt in another pie pan. In a shallow bowl, whisk eggs to blend. Dip fish in flour, shaking off excess, then in egg, then in panko, turning to coat; set on a baking sheet.                                                                                                 Fry one-quarter of fish at a time until golden, 1 to 1 1/2 minutes. Transfer to pan in oven. Serve with aioli and lemon wedges.                                                                                                You Found the Fish--Now What? Some markets will clean them for you, but if not, you can do it yourself easily enough--it just takes a little practice.                                                                                                 SCALE AND CUT. Scrape off the scales gently with fingertips. Cut through both sides of belly 1/4 in. from edge, from collar to tail.                                                                                                 CLEAN. Pull out the guts; rinse the fish inside and out. Snip off fins.                                                                                                 FILLET (RAW). Score fish all the way around collar just to the bone. Slide your index finger into cut on one side of collar and your middle finger into the other side. Slide your fingers along spine to tail, pulling fillets free. Cut off tail and pull out any remaining bones.                                                                                                 FILLET (COOKED). Make 3 cuts through flesh to bones: along the length of the spine (to one side of it), at collar, and just above tail. Slide knife under fillet to free it from spine, and lift it off. Pull up tail and lift off spine and head to free bottom fillet. Pull out any remaining bones.                                                                                                *If you can\'t find fresh anchovies or smelt, you can make the recipe with sardines: Discard heads and tails, and cut bodies into 2-in. pieces. Cut cooked meat from the bones.                                                                                                Note: Find these little fish at some grocery stores, fish markets (you might need to order them), and Asian markets. If you live near a coastal town, head to the docks-fresh anchovies and smelt are often sold as bait. Look for fish with bright eyes, shiny skin, and a mild aroma. They\'re very perishable, so plan to cook them the same day.                                                                                                Note: Nutritional analysis is per serving.','https://spoonacular.com/recipeImages/25-556x370.jpg',45,8),(13,'Sliced Baguette With Radishes And Anchovy Butter','Preparation                                        Mix butter, 2 chopped anchovy fillets, and 2 tablespoons chives in small bowl, adding 1 more chopped anchovy fillet to taste, if desired. Season with salt and freshly ground black pepper. Spread anchovy butter over 1 side of each baguette slice. Top each baguette slice with radish slices, overlapping slightly to cover bread. Garnish with additional chopped chives and serve.                                    89 calories, 6 g fat, 0.4 g fiberNutritional analysis provided by Bon Apptit','https://spoonacular.com/recipeImages/26-556x370.jpg',25,16),(14,'Cook the Book: Braided Beef with Anchovies and Olives','Procedures                                                                              1                                                                            Crush the anchovies to a paste in a mortar (or pulse in a food processor). Chop half of the olives, and crush them together with the anchovies. Cut the fillet lengthwise into 3 long strips, stopping 1 inch from the end. Spread the anchovy mixture evenly along one side of each strip. Braid the meat tightly, tying it firmly together at the end with kitchen string.  Use your palms to flatten the braid to an even thickness, then push any anchovy stuffing back into the braids. Brush the meat all over with 1 tablespoon of the olive oil.                                                                                                                            2                                                                            Brush a chapa (a flat piece of cast iron set over a fire) or large cast-iron griddle with the remaining 1 tablespoon olive oil and heat over medium heat until a drop of water sizzles on the surface. Add the beef and cook without moving for 10 minutes, or until it is nicely browned on the first side. Turn the meat over and sear on the other side for about 6 minutes—the meat should be quite rare. Continue turning and cooking the meat until all the sides are seared and it is done to taste. Transfer the meat to a carving board and let rest for 5 minutes.                                                                                                                            3                                                                            Meanwhile, lightly smash the remaining olives and place alongside the meat. The juices will run together.                                                                                                                            4                                                                            Remove the string, carve the beef into thick slices, and season with pepper. Serve with olives and juices.','https://spoonacular.com/recipeImages/27-556x370.jpg',45,6),(15,'Skate, Chicory, and Anchovy','Instructions                                                                                                                                                                                                                 To make your poaching broth mix all the ingredients together and add enough water to cover your skate. Bring it up to a boil and then turn the heat down to a simmer. Slip your skate wing into the poaching pan and cook for approximately 10 minutes (check that the flesh comes away from the bone), then turn off the heat and allow to cool in the liquor.                                                    When cold remove the skate from the liquor and pull the flesh from the bone. It should come away in easy strips. Now make your dressing: either whizz all the ingredients in a food processor or pound them in a mortar with a pestle.                                                    Bring together the skate, chicory, rocket (arugula), parsley, capers, and the dressing (cautionthere may be too much, so do not add it all at once), and toss.                                                                                                                                                                                                                                                                                                var articleType_27_data = {};                    articleType_27_data.init_step_by_step_images = 0;','https://spoonacular.com/recipeImages/29-556x370.jpg',120,4),(16,'Raw Mustard Greens Salad With Gruyère And Anchovy Croutons','Preparation                                        Preheat oven to 375F. Combine anchovies and garlic in small bowl. Gradually whisk in oil. Place bread cubes in medium bowl. Drizzle 2 tablespoons anchovy oil over, tossing to coat. Sprinkle bread with salt, pepper, and half of cheese; toss to coat.                                                                            Spray rimmed baking sheet with nonstick spray. Scatter bread on sheet. Bake croutons until crisp and golden, stirring occasionally, about 20 minutes. Set aside.                                                                            Measure 8 cups (loosely packed) mustard greens and place in large bowl (reserve any remaining greens for another use). Add croutons and remaining cheese to bowl. Whisk 5 teaspoons lemon juice into remaining anchovy oil; season dressing with salt, pepper, and more lemon juice, if desired. Add dressing to salad; toss to coat.','https://spoonacular.com/recipeImages/30-556x370.jpg',40,6),(17,'Cardoons With Anchovy-garlic Sauce','Instructions','https://spoonacular.com/recipeImages/34-556x370.jpg',45,6),(18,'Anchovy and Herb Marinade','Whisk all ingredients together. Put beef in a nonreactive baking dish and pour marinade over, turning to coat.','https://spoonacular.com/recipeImages/35-556x370.jpg',45,2),(19,'Roasted Cauliflower With Anchovy Bread Crumbs','Preheat oven to 400 degrees. Break cauliflower into florets and toss in a bowl with sage, lemon zest, sugar and olive oil. Season with salt and pepper and spread out on a large baking sheet. Place in oven and cook until tender and golden, approximately 20 to 25 minutes. Meanwhile, prepare bread crumbs. Heat olive oil in a saut pan set over medium heat. When oil shimmers, add the anchovies, garlic, shallot and bread crumbs. Cook for 5 to 7 minutes, until golden. In a large bowl, toss together cauliflower and bread crumbs and serve on a warmed platter.  Be sure to try out these other Thanksgiving recipes on Food Republic:  Pecan, Bourbon And Cane Syrup Ham Recipe Country Ham And Cheese Biscuit Bread Classic Giblet Gravy Recipe','https://spoonacular.com/recipeImages/37-556x370.jpg',60,3),(20,'Onion Anchovy Galette','PreparationMake dough:                                        Blend together flour, butter, and salt in a bowl with your fingertips or a pastry blender (or pulse in a food processor) just until most of mixture resembles coarse meal with some roughly pea-size butter lumps.                                                                            Drizzle 3 tablespoons ice water evenly over mixture and gently stir with a fork (or pulse in processor) until incorporated.                                                                            Squeeze a small handful: If it doesn\'t hold together, add more ice water, 1/2 tablespoon at a time, stirring (or pulsing) until incorporated, then test again. (Do not overwork mixture or pastry will be tough.)                                                                            Turn out mixture onto a lightly floured surface and divide into 4 portions. With heel of your hand, smear each portion once or twice in a forward motion to help distribute fat. Gather dough together, with a pastry or bench scraper if you have one, and press into a ball, then flatten into a 5-inch disk. Chill, wrapped in plastic wrap, until firm, at least 1 hour.                                    Caramelize onions while dough chills:                                        Cook onions in oil and butter in a 12-inch heavy skillet over medium heat, stirring occasionally, until softened and golden, about 30 minutes.                                    Fill and bake galette:                                        Preheat oven to 375F with rack in middle.                                                                            Finely chop anchovies and garlic together. Stir together with tomato paste and thyme.                                                                            Roll out dough on a lightly floured surface with a lightly floured rolling pin into a 13-inch round. Transfer to a parchment-lined large baking sheet.                                                                            Spread tomato-anchovy mixture over dough, leaving a 2-inch border along edge, then arrange onions on top. Fold edges of dough inward. Bake until pastry is golden, 45 to 50 minutes. Serve warm or at room temperature.                                    Cooks notes:Dough can be chilled up to 3 days. Onions can be caramelized 1 day ahead and chilled.','https://spoonacular.com/recipeImages/38-556x370.jpg',280,6),(21,'Radish Salad With Anchovy Sauce','Trim tops and tails from the radishes. Scrub them well. Slice each radish into 4 wedges (if small) or 6 wedges (if large).                                  With a mortar and pestle (or in a mini food processor), mash the anchovy, garlic, and a pinch of salt to a paste. Mix in the lemon juice, then slowly blend in the oil, adding it in a thread-thin stream as you mix. Fold in the capers.                                  Add the sauce and parsley to the radishes and fold until well blended. Adjust lemon juice and salt to taste. Serve within 30 minutes.','https://spoonacular.com/recipeImages/39-556x370.jpg',36,4),(22,'Pizza With Anchovies, Red Onion, And Oregano','Transfer to oven: Slide parchment ontostone or baking sheet. Bake for 13 to 15 minutes, until cheese is bubbly and bottom is crisp.','https://spoonacular.com/recipeImages/40-556x370.jpg',25,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredient`
--

LOCK TABLES `recipe_ingredient` WRITE;
/*!40000 ALTER TABLE `recipe_ingredient` DISABLE KEYS */;
INSERT INTO `recipe_ingredient` VALUES (1,2,2,1,'lb'),(2,3,2,1,'teaspoon'),(3,4,2,1,''),(4,5,2,1,'cup'),(5,6,2,1,'leaves'),(6,7,2,1,'teaspoon'),(7,8,2,3,'servings'),(8,9,2,3,'servings'),(9,2,3,6,'oz'),(10,10,3,2,'oz'),(11,11,3,0.5,''),(12,12,3,2,'tsps'),(13,13,3,2,''),(14,10,4,1,'serving'),(15,33,4,1,'serving'),(16,34,4,1,'serving'),(17,35,4,1,'serving'),(18,2,5,1,'lb'),(19,36,5,0.25,'t'),(20,37,5,0,''),(21,38,5,0,''),(22,39,5,3,'large'),(23,18,5,0,''),(24,5,5,1.5,'c'),(25,12,5,2,'c'),(26,22,5,0,''),(27,58,6,12,''),(28,59,6,6,'large'),(29,45,6,1,'tablespoon'),(30,32,6,1,'teaspoon'),(31,58,6,12,''),(32,59,6,6,'large'),(33,45,6,1,'tablespoon'),(34,32,6,1,'teaspoon'),(35,40,7,2,'fillet'),(36,68,7,16.5,'inch'),(37,69,7,1,'serving'),(38,70,7,1,'serving'),(39,71,7,2,'Tbsps'),(40,72,7,10,''),(41,35,7,0.5,'cup'),(42,73,8,8,''),(43,18,8,2,'servings'),(44,74,8,2,'servings'),(45,75,8,1,'small handful'),(46,76,8,2,'servings'),(47,77,8,2,'servings'),(48,78,8,2,'servings'),(49,66,8,4,''),(50,79,8,2,'servings'),(51,40,9,2,'fillet'),(52,80,9,3,''),(53,81,9,8,''),(54,82,9,0.25,''),(55,5,9,3,''),(56,83,9,1,'tsp'),(57,84,9,2,'oz'),(58,12,9,2,'Tbsps'),(59,43,9,3,''),(60,85,9,1,'ball'),(61,86,10,0.25,'oz'),(62,73,10,12,''),(63,87,10,2,'sprigs'),(64,5,10,3,'cups'),(65,12,10,6,'servings'),(66,88,10,0.333333,'cup'),(67,89,10,2.5,'lbs'),(68,90,10,1,'sprig'),(69,7,10,1,'tbsp'),(70,22,10,6,'servings'),(71,2,11,12,''),(72,91,11,12,''),(73,92,11,2,'tsp'),(74,93,11,1,'handful'),(75,94,11,1,'tbsp'),(76,89,11,6,'medium'),(77,95,11,250,'g'),(78,2,12,1,'pound'),(79,39,12,3,'large'),(80,5,12,0.5,'cup'),(81,11,12,1,''),(82,96,12,1.5,'teaspoons'),(83,97,12,1,'teaspoon'),(84,20,12,2,'tablespoons'),(85,98,12,8,'servings'),(86,12,12,0.75,'cup'),(87,99,12,1.75,'cups'),(88,100,12,1.5,'teaspoons'),(89,9,12,8,'servings'),(90,40,13,2,'fillet'),(91,68,13,16.5,'inch'),(92,69,13,16,'servings'),(93,70,13,16,'servings'),(94,71,13,2,'Tbsps'),(95,72,13,10,''),(96,35,13,0.5,'cup'),(97,40,14,15,'fillet'),(98,47,14,6,'servings'),(99,18,14,2,'tablespoons'),(100,101,14,1,'cup'),(101,102,14,1,''),(102,40,15,20,'fillet'),(103,47,15,4,'servings'),(104,103,15,4,'servings'),(105,33,15,1,'small handful'),(106,104,15,2,'stalks'),(107,105,15,2,'heads'),(108,106,15,1,'bunch'),(109,106,15,1,'handful'),(110,18,15,0.666667,'cup'),(111,81,15,1,'head'),(112,26,15,1,'head'),(113,26,15,8,'cloves'),(114,83,15,1,''),(115,107,15,1,''),(116,21,15,1,'bunch'),(117,108,15,4,'servings'),(118,109,15,1,''),(119,110,15,1,'cup'),(120,111,15,1,'tablespoon'),(121,40,16,5,'fillet'),(122,112,16,3,'cups'),(123,53,16,3,''),(124,20,16,5,'teaspoons'),(125,20,16,5,'tsps'),(126,113,16,12,'ounces'),(127,113,16,12,'ozs'),(128,12,16,0.5,'cup'),(129,73,17,12,''),(130,114,17,2,'tbsp'),(131,26,17,1,'clove'),(132,11,17,1,''),(133,115,17,1,''),(134,12,17,0.25,'cup'),(135,12,17,0.25,'cup'),(136,40,18,1,'teaspoon'),(137,33,18,1,'tablespoon'),(138,116,18,0.5,'cup'),(139,97,18,0.5,'teaspoon'),(140,20,18,2,'tablespoons'),(141,83,18,1,'teaspoon'),(142,12,18,3,'tablespoons'),(143,40,19,8,'fillet'),(144,42,19,1,'cup'),(145,17,19,2,'heads'),(146,18,19,0.25,'cup'),(147,18,19,2,'tablespoons'),(148,117,19,8,''),(149,26,19,3,'cloves'),(150,97,19,3,'servings'),(151,83,19,2,''),(152,118,19,1,''),(153,32,19,2,'teaspoons'),(154,40,20,5,'fillet'),(155,119,20,0.5,'teaspoon'),(156,5,20,1.25,'cups'),(157,11,20,1,''),(158,120,20,3,'tablespoons'),(159,12,20,2,'tablespoons'),(160,89,20,2,'large'),(161,7,20,0.25,'teaspoon'),(162,121,20,2,'tablespoons'),(163,35,20,1,'stick'),(164,35,20,2,'tablespoons'),(165,40,21,1,'fillet'),(166,33,21,1,'tsp'),(167,122,21,0.5,'Tbsp'),(168,11,21,1,'small'),(169,20,21,0.5,'Tbsp'),(170,12,21,1,'Tbsp'),(171,72,21,1,'large bunch'),(172,7,21,4,'servings'),(173,2,22,2,'servings'),(174,26,22,2,'servings'),(175,12,22,2,'servings'),(176,123,22,2,'servings'),(177,124,22,2,'servings'),(178,85,22,2,'servings'),(179,125,22,2,'servings'),(180,44,22,2,'servings'),(181,126,22,0.25,'cup');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test@test.com','password','fname','lname',1,'question','answer'),(4,'email@mail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','First','Last',1,'Question','b2a3aa602762a782e47a4f8e93bb5ae1b8819d1b92b7e6ceb3ef46a3c7077eb0');
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
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_allergy`
--

LOCK TABLES `user_allergy` WRITE;
/*!40000 ALTER TABLE `user_allergy` DISABLE KEYS */;
INSERT INTO `user_allergy` VALUES (213,1,4),(214,2,4),(215,3,4),(216,4,4),(217,5,4),(218,6,4),(219,1,4);
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

-- Dump completed on 2019-03-28 11:24:02
