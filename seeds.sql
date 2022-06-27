USE company_db;

INSERT INTO department(dep_name) VALUES ("Marketing");
INSERT INTO department(dep_name) VALUES ("Finance");
INSERT INTO department(dep_name) VALUES ("IT");
INSERT INTO department(dep_name) VALUES ("Sales");

INSERT INTO role(title, salary, department_id) VALUES ("Marketing Manager", 40000.00, "1");
INSERT INTO role(title, salary, department_id) VALUES ("Marketing Assistant", 20000.00, "1");
INSERT INTO role(title, salary, department_id) VALUES ("Finance Manager", 60000.00, "2");
INSERT INTO role(title, salary, department_id) VALUES ("Finance Assistant", 40000.00, "2");
INSERT INTO role(title, salary, department_id) VALUES ("IT Manager", 30000.00, "3");
INSERT INTO role(title, salary, department_id) VALUES ("IT Assistant", 18000.00, "3");
INSERT INTO role(title, salary, department_id) VALUES ("Sales Manager", 35000.00, "4");
INSERT INTO role(title, salary, department_id) VALUES ("Sales Assistant", 23000.00, "4");

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Bob", "Smith", "1", null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Dave", "Smith", "2", "1");
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Ian", "Smith", "2", "1");