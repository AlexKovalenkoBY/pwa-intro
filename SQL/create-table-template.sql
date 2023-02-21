-- Active: 1676131907121@@127.0.0.1@3306
CREATE TABLE country(  
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name TEXT
);

CREATE TABLE car_details(  
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	brand TEXT,
	model TEXT,
	price INT,
	manufacture_year INT,
	cartype TEXT,
	fuel TEXT,
	enginetype TEXT,
	driveunit TEXT,
transmission TEXT,
mileage BIGINT,
location TEXT

);

-- Цена: 
--  $8650
-- Марка 
--  Mazda
-- Модель 
--  3 Preferred
-- Год выпуска 
--  2021
-- Тип кузова 
--  ХЭТЧБЭК
-- Тип топлива 
--  БЕНЗИН
-- Двигатель 
--  2.5 л.
-- Привод 
--  FWD
-- Коробка 
--  АКПП
-- Расположение 
-- в пути
-- Пробег 
