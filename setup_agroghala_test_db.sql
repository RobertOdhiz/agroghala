CREATE DATABASE IF NOT EXISTS `agroghala_dev_db`;

CREATE USER IF NOT EXISTS 'ag_dev'@'localhost' IDENTIFIED BY '########';

GRANT ALL PRIVILEGES ON agroghala_dev_db.* TO 'ag_dev'@'localhost';

GRANT SELECT ON performance_schema.* TO 'ag_dev'@'localhost';
