
INSERT INTO department (name)
VALUES ('Engineering'),
    ('Sales'),
    ('Management'),
    ('Marketing'),
    ('Finance'),
    ('Legal'),
    ('HR');

INSERT INTO role (title, salary, department_id) 
VALUES ('Software Engineer', 100000, 1),
    ('Sales Lead', 80000, 2),
    ('Manager', 120000, 3),
    ('Salesperson', 60000, 4),
    ('Lead Engineer', 150000, 5),
    ('Accountant', 125000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 3),
    ('Mike', 'Chan', 2, 3),
    ('Ashley', 'Rodriguez', 3, 3),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, 3),
    ('Malia', 'Brown', 6, 3);
