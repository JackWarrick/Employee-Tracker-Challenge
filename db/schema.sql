DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    Department INT,

    PRIMARY KEY (id),

  FOREIGN KEY (Department)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,

    PRIMARY KEY (id),

  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL,

  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);