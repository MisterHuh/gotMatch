-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 13, 2019 at 06:35 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game_of_memory`
--

-- --------------------------------------------------------

--
-- Table structure for table `highScores`
--

CREATE TABLE `highScores` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `highScores`
--

INSERT INTO `highScores` (`id`, `name`, `attempts`) VALUES
(2, 'Arya', 9),
(3, 'Hodor', 11),
(4, 'Ned', 12),
(5, 'Tyrion', 13),
(7, 'Cersei', 99),
(34, 'Ellie', 18),
(35, 'Evie', 24),
(38, 'CallerId', 20),
(39, 'Ellis', 8),
(51, 'Toby', 13),
(53, 'Drogon', 14),
(80, 'Tobias', 14),
(81, 'Tormund', 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `highScores`
--
ALTER TABLE `highScores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `highScores`
--
ALTER TABLE `highScores`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
