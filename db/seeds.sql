INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

INSERT INTO role (title, salary, department_id) VALUES
  ('Software Engineer', 85000, 1),
  ('Salesperson', 75000, 2),
  ('Accountant', 125000, 3),
  ('Lawyer', 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Jack', 'Marstonn', 1, 4),
  ('John', 'Oliver', 2, 3),
  ('Adam', 'Sachs', 3, 1),
  ('Howard', 'Smith', 4, 5);
