-- 1. Crear y usar la base de datos
CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

-- 2. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabla de Usuarios (ACTUALIZADA)
CREATE TABLE IF NOT EXISTS usuarios (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  rol varchar(20) DEFAULT 'user', -- 👈 Agregamos esto para que quede guardado en el código
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Eliminar usuarios por id--
DELETE FROM usuarios WHERE id = '10';

--PERMITE UN SOLO EMAIL -- 
ALTER TABLE usuarios
ADD UNIQUE (email);

-- ADMIN --
ALTER TABLE usuarios
ADD COLUMN role VARCHAR(20) DEFAULT 'user';

-- Actualizar role a admin para un usuario específico --
UPDATE usuarios
SET role = 'admin'
WHERE id = '11';

-- Eliminar tabla --
DROP TABLE libros

--CAMBIAR NOMBRE DE COLUMNA --
ALTER TABLE usuarios CHANGE role rol VARCHAR(20) DEFAULT 'user';