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

-- 3. Tabla de Libros
CREATE TABLE IF NOT EXISTS libros (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  author varchar(100) NOT NULL,
  category varchar(50) DEFAULT NULL,
  description text,
  image varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabla de Calificaciones
CREATE TABLE IF NOT EXISTS calificaciones (
  id int NOT NULL AUTO_INCREMENT,
  usuario_id int DEFAULT NULL,
  libro_id int DEFAULT NULL,
  rating int DEFAULT NULL,
  PRIMARY KEY (id),
  -- Relaciones (Llaves foráneas)
  KEY usuario_id (usuario_id),
  KEY libro_id (libro_id),
  CONSTRAINT calificaciones_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
  CONSTRAINT calificaciones_ibfk_2 FOREIGN KEY (libro_id) REFERENCES libros (id),
  -- Regla: El rating debe ser un número entre 1 y 5
  CONSTRAINT calificaciones_chk_1 CHECK ((rating >= 1) and (rating <= 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;