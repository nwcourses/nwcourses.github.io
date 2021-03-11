-- phpMyAdmin SQL Dump
-- version 5.0.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 11, 2021 at 09:22 AM
-- Server version: 5.7.29-0ubuntu0.16.04.1
-- PHP Version: 7.4.0

--
-- Database: `dftitutorials`
--

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lon` float DEFAULT NULL,
  `hometown` varchar(255) DEFAULT NULL
);

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`id`, `name`, `lat`, `lon`, `hometown`) VALUES
(1, 'Madonna', 43.5945, -83.8889, 'Bay City'),
(2, 'Prince', 44.9775, -93.2654, 'Minneapolis'),
(3, 'Oasis', 53.4357, -2.2067, 'Manchester'),
(4, 'David Bowie', 51.5, 0, 'London'),
(5, 'The Beatles', 53.4066, -2.9825, 'Liverpool'),
(6, 'Michael Jackson', 41.602, -87.3379, 'Gary'),
(7, 'Woop', 51.4074, -0.0312, 'Beckenham'),
(8, 'Ed Sheeran', 52.2223, 1.3438, 'Framlingham');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

