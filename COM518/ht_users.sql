-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: ephp001
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

--
-- Table structure for table `ht_users`
--

USE waddb; -- Change to use your database

DROP TABLE IF EXISTS `ht_users`;
CREATE TABLE `ht_users` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dayofbirth` int(11) DEFAULT NULL,
  `monthofbirth` int(11) DEFAULT NULL,
  `yearofbirth` int(11) DEFAULT NULL,
  `balance` decimal(5,2) NOT NULL,
  `isadmin` int(11) DEFAULT '0',
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ht_users`
--

LOCK TABLES `ht_users` WRITE;
INSERT INTO `ht_users` VALUES ('JohnStevenson','newyork905','John Stevenson',17,4,1969,99.21,1,86),('TimWilson','egg882','Tim Wilson',9,10,1960,100.00,0,88),('ChrisBrock','rome872','Chris Brock',26,8,1949,100.00,0,85),('KatePalmer','cat381','Kate Palmer',14,5,1974,100.00,0,84),('TimStevenson','dog576','Tim Stevenson',8,5,1970,100.00,0,83),('MichelleBrown','paris747','Michelle Brown',27,9,1983,100.00,0,82),('KateStevenson','egg367','Kate Stevenson',17,5,1952,96.42,0,81),('EmilyWatson','egg716','Emily Watson',1,5,1974,100.00,0,92),('TomSmith','cake777','Tom Smith',12,9,1961,100.00,0,90),('JohnEastman','cat537','John Eastman',15,5,1990,100.00,0,93),('ChrisPalmer','vegas798','Chris Palmer',6,3,1962,100.00,0,95),('JamieStevenson','egg578','Jamie Stevenson',12,11,1949,100.00,0,96),('HenryJones','dog841','Henry Jones',16,10,1966,100.00,0,97),('MarkWatson','vegas584','Mark Watson',27,12,1987,100.00,0,98),('DaveEllis','egg101','Dave Ellis',3,10,1983,100.00,0,99),('RachelWatson','paris639','Rachel Watson',18,2,1956,100.00,0,100),('EdwardWilson','cat807','Edward Wilson',2,10,1992,100.00,0,101),('MichelleWilson','newyork406','Michelle Wilson',24,1,1987,100.00,0,104),('SarahBrown','newyork791','Sarah Brown',1,7,1960,100.00,0,105),('LisaSmith','dog832','Lisa Smith',2,9,1949,100.00,0,108),('TomGreen','rome319','Tom Green',18,12,1973,100.00,1,109),('RachelWhite','dog104','Rachel White',19,8,1967,100.00,0,110),('TomBrown','rome708','Tom Brown',12,1,1967,100.00,0,112),('JamieBlack','newyork191','Jamie Black',22,9,1993,100.00,0,114),('AndyRobertson','cake501','Andy Robertson',22,11,1954,100.00,0,115),('MarkGreen','rome576','Mark Green',1,12,1956,100.00,0,116),('TomBrock','vegas112','Tom Brock',24,8,1973,100.00,0,118),('LisaEastman','paris660','Lisa Eastman',3,5,1995,100.00,0,119),('LauraGreen','cake839','Laura Green',19,11,1952,100.00,0,121),('KateBrown','cat885','Kate Brown',16,1,1993,100.00,0,124),('AndyBrown','ab123','Andy Brown',18,1,1948,100.00,1,126),('TomBlack','rome624','Tom Black',8,8,1975,100.00,0,127),('MarkRobertson','dog732','Mark Robertson',25,2,1981,100.00,0,128),('RachelGreen','egg808','Rachel Green',20,2,1978,100.00,0,129),('JimRobertson','paris500','Jim Robertson',18,3,1949,100.00,0,130),('RachelWilson','cat303','Rachel Wilson',18,5,1974,100.00,0,131),('TomWhite','dog950','Tom White',15,3,1972,100.00,0,134),('ChrisSmith','cake881','Chris Smith',12,12,1993,100.00,0,135),('MarkPalmer','newyork999','Mark Palmer',26,2,1995,100.00,0,136),('MichelleEastman','paris413','Michelle Eastman',8,8,1997,100.00,0,137),('TomWilson','vegas404','Tom Wilson',3,7,1949,100.00,0,138),('LisaEllis','vegas888','Lisa Ellis',18,1,1969,100.00,0,139),('JamieWilson','newyork403','Jamie Wilson',1,4,1998,100.00,0,140),('SarahJones','cake283','Sarah Smith',17,5,1976,100.00,0,141),('TimRobertson','egg249','Tim Robertson',25,9,1995,100.00,0,143),('SarahWatson','vegas705','Sarah Watson',5,5,1994,100.00,0,144),('SarahBrock','dog447','Sarah Brock',4,3,1985,100.00,0,146),('EmilyBlack','newyork867','Emily Black',28,11,1999,100.00,0,147),('TimBlack','newyork371','Tim Black',4,10,1986,100.00,0,148),('TimWhite','rome874','Tim White',27,4,1991,100.00,0,149),('LauraRobertson','vegas430','Laura Robertson',7,2,1994,100.00,0,150),('EdwardWhite','egg433','Edward White',7,7,1948,94.06,0,151),('RachelBlack','paris438','Rachel Black',8,3,1972,100.00,0,152),('EdwardRobertson','egg115','Edward Robertson',17,1,1964,100.00,0,153),('HenryRobertson','rome968','Henry Robertson',9,4,1958,100.00,0,158),('JamieJones','cat972','Jamie Jones',17,8,1955,100.00,0,159),('SarahGreen','cat858','Sarah Green',10,3,1955,100.00,0,161),('LisaRobertson','newyork861','Lisa Robertson',27,12,1965,100.00,0,162),('TimWatson','cake926','Tim Watson',17,11,1960,100.00,0,164),('MarkWhite','cat448','Mark White',15,4,1960,100.00,0,165),('KateGreen','paris232','Kate Green',25,9,1977,100.00,0,166),('ChrisEastman','rome769','Chris Eastman',16,10,1952,100.00,0,167),('KateEastman','paris700','Kate Eastman',26,2,1991,100.00,0,168),('KateJones','egg713','Kate Jones',13,10,1994,100.00,0,169),('JimEllis','egg632','Jim Ellis',20,2,1995,100.00,0,170),('MichelleBlack','cake471','Michelle Black',1,4,1996,100.00,0,171),('TimBrock','paris772','Tim Brock',8,1,1998,100.00,0,172),('JimBrown','rome743','Jim Brown',21,7,1945,100.00,0,173),('SarahStevenson','paris770','Sarah Stevenson',20,4,1950,100.00,0,175),('JamieBrown','cake184','Jamie Brown',28,3,1972,99.21,0,176),('TimEllis','vegas276','Tim Ellis',28,12,1954,100.00,0,178),('ChrisEllis','paris880','Chris Ellis',25,11,1962,100.00,0,179),('AndySmith','paris962','Andy Smith',19,12,1952,100.00,0,180),('george','george','george',1,1,1982,100.00,0,123533);
UNLOCK TABLES;

-- Dump completed on 2021-03-22 10:24:00
