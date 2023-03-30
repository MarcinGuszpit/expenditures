-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 30 Mar 2023, 14:38
-- Wersja serwera: 5.5.68-MariaDB
-- Wersja PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `Expenditures`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Clients`
--

CREATE TABLE `Clients` (
  `ID` int(11) NOT NULL,
  `Short_name` varchar(35) COLLATE utf8_polish_ci NOT NULL,
  `name1` varchar(65) COLLATE utf8_polish_ci DEFAULT NULL,
  `name2` varchar(65) COLLATE utf8_polish_ci DEFAULT NULL,
  `PostalCode` varchar(5) COLLATE utf8_polish_ci DEFAULT NULL,
  `CITY` varchar(35) COLLATE utf8_polish_ci DEFAULT NULL,
  `STREET` varchar(35) COLLATE utf8_polish_ci DEFAULT NULL,
  `NR_VAT` varchar(15) COLLATE utf8_polish_ci DEFAULT NULL,
  `NR_REGON` varchar(15) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Operations`
--

CREATE TABLE `Operations` (
  `id` int(11) NOT NULL,
  `name` varchar(25) COLLATE utf8_polish_ci NOT NULL,
  `operation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `Operations`
--

INSERT INTO `Operations` (`id`, `name`, `operation`) VALUES
(1, 'Przychód', 1),
(2, 'Rozchód', -1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `SALES_BRANCHES`
--

CREATE TABLE `SALES_BRANCHES` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(50) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `SALES_BRANCHES`
--

INSERT INTO `SALES_BRANCHES` (`ID`, `NAME`) VALUES
(48, 'Zużycie gazu'),
(49, 'Zużycie dodatków krawieckich'),
(50, 'Zużycie nadruków na dzianinie'),
(51, 'Amortyzacja'),
(52, 'Energia'),
(53, 'Zużycia paliwa'),
(54, 'Zużycie części zamiennych'),
(55, 'Zużycie materiałów biurowych'),
(56, 'Zużycie worków, wieszaków, etykiet'),
(57, 'Zużycie dzianiny i tkaniny'),
(58, 'Zużycie materiałów elektrycznych i budowlanych'),
(59, 'Zużycie części środków czystości'),
(60, 'Usługi rachunkowe'),
(61, 'Usługi bankowe'),
(62, 'Usługi transportowe'),
(63, 'Usługi telekomunikacyjne'),
(64, 'Usługi komunalne'),
(65, 'Usługi szwalnicze'),
(66, 'Usługi remontowe'),
(67, 'Usługi pozostałe'),
(68, 'Podatek od nieruchomości'),
(69, 'Wynagrodzenia'),
(70, 'Składaka ZUS'),
(71, 'Podróźe służbowe'),
(72, 'Ubezpieczenia majątkowe'),
(73, 'Odsetki od kredytu'),
(74, 'Badania lekarskie'),
(75, 'Składa członkowska'),
(76, 'Zakup wody'),
(77, 'Pozostałe koszty'),
(78, 'Badania profilaktyczne'),
(79, 'Zużycie papieru podkładowego i do plotera'),
(80, 'Zużycie środków czystości'),
(81, 'Pozostałe zakupy'),
(82, 'Sprzedaż wyrobów'),
(83, 'Odsetki od zaległości budżetowych'),
(84, '43,33'),
(85, 'Zakup środków trwałych'),
(86, 'WB nr.99'),
(87, 'Ubezpieczenie DLBGX01'),
(88, 'Środki trwałe'),
(89, 'Odbiór odpadów komunaknych'),
(90, 'Usługa leasingu'),
(91, 'Zużycie  środków czystości'),
(92, 'Koszty zakupu');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `TAX_RATES`
--

CREATE TABLE `TAX_RATES` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(35) COLLATE utf8_polish_ci NOT NULL,
  `RATE` decimal(11,2) NOT NULL,
  `SELECTED` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `TAX_RATES`
--

INSERT INTO `TAX_RATES` (`ID`, `NAME`, `RATE`, `SELECTED`) VALUES
(1, '23% stawka podatku', '23.00', 1),
(2, '8% stawka obniżona', '8.00', 0),
(3, '5% stawka obniżona', '5.00', 0),
(4, 'zwolnienie z podatku', '0.00', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `TURNOVER`
--

CREATE TABLE `TURNOVER` (
  `ID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `NETTO` decimal(12,2) NOT NULL,
  `VAT` decimal(12,2) NOT NULL,
  `ID_TAX_RATE` int(11) NOT NULL,
  `ID_CLIENT` int(11) NOT NULL,
  `NUMER_FAKTURY` varchar(25) COLLATE utf8_polish_ci DEFAULT NULL,
  `ID_OPERATION` int(11) NOT NULL,
  `ID_sALE_BRANCH` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `Clients`
--
ALTER TABLE `Clients`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `Operations`
--
ALTER TABLE `Operations`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `SALES_BRANCHES`
--
ALTER TABLE `SALES_BRANCHES`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `TAX_RATES`
--
ALTER TABLE `TAX_RATES`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `TURNOVER`
--
ALTER TABLE `TURNOVER`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_client` (`ID_CLIENT`),
  ADD KEY `FK_TAX_RATE` (`ID_TAX_RATE`),
  ADD KEY `FK_OPERATION` (`ID_OPERATION`),
  ADD KEY `FK_SALE_BRANCH` (`ID_sALE_BRANCH`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `Clients`
--
ALTER TABLE `Clients`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `Operations`
--
ALTER TABLE `Operations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `SALES_BRANCHES`
--
ALTER TABLE `SALES_BRANCHES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT dla tabeli `TAX_RATES`
--
ALTER TABLE `TAX_RATES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `TURNOVER`
--
ALTER TABLE `TURNOVER`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
