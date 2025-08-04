-- Crear la base de datos si no existe
CREATE DATABASE universidad;
USE universidad;

-- Crear la tabla estudiantes
CREATE TABLE estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    correo VARCHAR(100),
    fecha_inscripcion DATE
);

-- Insertar datos en la tabla estudiantes
INSERT INTO estudiantes (nombre, apellido, edad, correo, fecha_inscripcion)
VALUES 
('Juan', 'Pérez', 20, 'juan.perez@example.com', '2025-02-18'),
('Ana', 'García', 22, 'ana.garcia@example.com', '2024-09-15'),
('Luis', 'Martínez', 21, 'luis.martinez@example.com', '2024-11-02'),
('Maria', 'López', 23, 'maria.lopez@example.com', '2023-12-20');
