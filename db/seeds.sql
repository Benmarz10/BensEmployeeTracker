INSERT INTO department (name)
VALUES ("Marketing"),
       ("Production"),
       ("Sales"),
       ("Human Resources"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Marketing Officer", 300000, 1),
       ("Marketing Analyst", 95000, 1),
       ("Production Supervisor", 80000, 2),
       ("Production Lead", 60000, 2),
       ("Machine Operator", 45000, 2),
       ("Sales Manager", 150000, 3),
       ("Account Exec", 110000, 3),
       ("Compensation", 82000, 4),
       ("Safety", 90000, 4),
       ("Executive", 180000, 5),
       ("CEO", 400000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Ashleigh", "Brown", 1, 1),
       ("Sonia", "O'Brien", 2, 1),
       ("Archibald", "Bean", 3, 2),
       ("Gene", "Wiley", 4, 2),
       ("Tomos", "Cain", 5, 3),
       ("Dylan", "Leon", 6, 3),
       ("Sanaa", "Proctor", 7, 4),
       ("Faye", "Maldonado", 8, 4),
       ("Kevin", "Daniels", 9, 5),
       ("Damon", "Barker", 10, 5),
       ("Callum", "Anthony", 11, 5);
