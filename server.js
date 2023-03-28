const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "firstQuestion",
      message: "What do you want to do?",
      choices: [
        "View all Employees",
        "Add Employee",
        "View all Roles",
        "Add Role",
        "View all Departments",
        "Add Department",
        "Bye",
      ],
    })
    .then((answer) => {
      switch (answer.firstQuestion) {
        case "View all Employees":
          viewEmployee();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View all Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View all Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Bye":
          db.bye();
          break;
      }
    });
}

function viewEmployee() {
  db.query(
    `SELECT role_id AS ID, first_name, last_name, title, department_name, salary, manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department on role.department_id = department.id ORDER BY role.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function addEmployee() {
  db.query(`SELECT * FROM role`, (err, roles) => {
    if (err) throw err;
    roles = roles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    db.query(`SELECT * FROM employee`, (err, employees) => {
      if (err) throw err;
      employees = employees.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      });

      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "Enter the first name.",
          },
          {
            type: "input",
            name: "last_name",
            message: "Enter the last name.",
          },
          {
            type: "list",
            name: "role",
            message: "What is the new role?",
            choices: roles,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the new manager?",
            choices: employees,
          },
        ])
        .then((answer) => {
          db.query(
            `INSERT INTO employee SET`,
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.role,
              manager_id: answer.manager_id,
            },
            (err, res) => {
              if (err) throw err;
              init();
            }
          );
        });
    });
  });
}

function viewRoles() {
  db.query(
    `SELECT * FROM role JOIN department on role.department_id = department.id ORDER BY role.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function addRole() {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    dList = res.map((department) => {
      return {
        name: department.department_name,
        value: department.id,
      };
    });

    db.query(`SELECT * FROM role`, (err, res) => {
      if (err) throw err;
      roleList = res.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });

      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Name of role?",
          },
          {
            type: "input",
            name: "salary",
            message: "Salary of role?",
          },
          {
            type: "list",
            name: "department",
            message: "Department of role?",
            choices: dList,
          },
        ])
        .then((answer) => {
          db.query(
            `INSERT INTO role SET ?`,
            {
              title: answer.title,
              salary: answer.salary,
              department_id: answer.department,
            },
            (err, res) => {
              if (err) throw err;
              init();
            }
          );
        });
    });
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Name of department?",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO department SET ?`,
        {
          department_name: answer.department_name,
        },
        (err, res) => {
          if (err) throw err;
          init();
        }
      );
    });
}

init();