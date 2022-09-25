INSERT INTO department (id, department_name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO roles (id, title, salary, department)
VALUES (1, "Salesperson", 60000, 1),
       (2, "Software Engineer", 130000, 2),
       (3, "Accountant", 90000, 3),
       (4, "Lawyer", 150000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Will", "Nelson", 1, 1),
       (2, "Adi", "Elezovic", 2, 2),
       (3, "Luke", "Filipic", 3, 3),
       (4, "Steve", "Snelling", 4, 4),
       (5, "Nathan", "Moenck", 4, 4);