-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2022 at 05:26 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csv_manipulation`
--

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `filename` text NOT NULL,
  `total_uploaded` int(11) NOT NULL,
  `total_processed` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `filename`, `total_uploaded`, `total_processed`, `user_id`, `created_at`, `updated_at`) VALUES
(14, 'Example', 338, 334, 3, '2022-01-25 15:29:11', '2022-01-25 15:29:11'),
(15, 'Sample', 338, 334, 3, '2022-01-25 15:38:31', '2022-01-25 15:38:31');

-- --------------------------------------------------------

--
-- Table structure for table `file_groups`
--

CREATE TABLE `file_groups` (
  `id` int(11) NOT NULL,
  `group_name` text NOT NULL,
  `filename` text NOT NULL,
  `total` int(4) NOT NULL,
  `file_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `file_groups`
--

INSERT INTO `file_groups` (`id`, `group_name`, `filename`, `total`, `file_id`, `created_at`, `updated_at`) VALUES
(18, 'Example_0', '1643124551_0', 100, 14, '2022-01-25 15:29:11', '2022-01-25 15:29:11'),
(19, 'Example_1', '1643124551_1', 100, 14, '2022-01-25 15:29:11', '2022-01-25 15:29:11'),
(20, 'Example_2', '1643124551_2', 100, 14, '2022-01-25 15:29:11', '2022-01-25 15:29:11'),
(21, 'Example_3', '1643124551_3', 38, 14, '2022-01-25 15:29:11', '2022-01-25 15:29:11'),
(22, 'Sample_0', '1643125111_0', 100, 15, '2022-01-25 15:38:31', '2022-01-25 15:38:31'),
(23, 'Sample_1', '1643125111_1', 100, 15, '2022-01-25 15:38:31', '2022-01-25 15:38:31'),
(24, 'Sample_2', '1643125111_2', 100, 15, '2022-01-25 15:38:31', '2022-01-25 15:38:31'),
(25, 'Sample_3', '1643125111_3', 38, 15, '2022-01-25 15:38:31', '2022-01-25 15:38:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(1000) NOT NULL,
  `password` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `status`, `type`, `created_at`, `updated_at`, `token`) VALUES
(1, 'Shah Ul Jasun', 'shahjasun@gmail.com', '$2y$10$7Qi7.PjEggrHU16TyO78FO6AGuN6SxGkBbwcvgRjVvquC9O1B3LxK', 1, 'admin', '2022-01-25 12:08:10', '2022-01-25 12:31:56', NULL),
(3, 'abtahitajwar', 'abtahitajwar@gmail.com', '$2y$10$1EEygkJjN47uA4PK7lGAnes/l38obwGL5DTGFcPQlOixik9vPE/eS', 1, 'user', '2022-01-25 13:30:24', '2022-01-25 16:14:38', '$2y$10$NqCGSoXp9l4Wbxd2TW44MuyDcbMo/vGzy04I0NLLiO2NvLnkZoHX.'),
(5, 'Harry Potter Man', 'harrypotter@gmail.com', '$2y$10$jQocU/ccNAP1GdsQP1JBfO.zjNA.LFkhh8kH9UA4ZY1GAiiOrqYGe', 1, 'user', '2022-01-25 16:29:44', '2022-01-25 10:45:47', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `file_user` (`user_id`);

--
-- Indexes for table `file_groups`
--
ALTER TABLE `file_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `file_to_filegroup` (`file_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `file_groups`
--
ALTER TABLE `file_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `file_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `file_groups`
--
ALTER TABLE `file_groups`
  ADD CONSTRAINT `file_to_filegroup` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
