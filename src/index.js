const inquirer = require("inquirer");
require("dotenv").config();
const mysql = require("mysql2/promise");

// link to database
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const getQueries = async () => {
  const db = await mysql.createConnection(config);

  const executeQuery = async (query) => {
    const [results] = await db.query(query);
    return results;
  };

  const closeConnection = async () => {
    await db.end();
  };

  return { executeQuery, closeConnection };
};

const init = async () => {
  const { executeQuery, closeConnection } = await getQueries();
  // declare variables
  let inProgress = true;

  const choiceQuestions = [
    {
      type: "list",
      message: "What would you like to do?",
      name: "choiceOption",
      choices: [
        {
          value: "getEmployees",
          name: "View All Employees",
        },
        {
          value: "addEmployees",
          name: "Add New Employee",
        },
        {
          value: "updateRole",
          name: "Update Employee Role",
        },
        {
          value: "addRole",
          name: "Add New Role",
        },
        {
          value: "getRoles",
          name: "View All Roles",
        },
        {
          value: "getDepartment",
          name: "View All Departments",
        },
        {
          value: "addDepartment",
          name: "Add New Department",
        },
        {
          value: "quit",
          name: "Quit Application",
        },
      ],
    },
  ];

  while (inProgress) {
    const { choiceOption } = await inquirer.prompt(choiceQuestions);

    if (choiceOption === "getEmployees") {
      const employees = await executeQuery(`SELECT e.id,
      CONCAT(e.first_name,' ',
             e.last_name) AS employee,
             r.salary, r.title,
             d.dep_name,
            CONCAT(m.first_name,' ',
             m.last_name) AS manager
      FROM employee AS e
        LEFT JOIN employee AS m 
        ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id
        ORDER BY e.last_name;
      `);

      console.table(employees);
    }

    if (choiceOption === "getDepartment") {
      const departments = await executeQuery("SELECT * FROM department");
      console.table(departments);
    }

    if (choiceOption === "getRoles") {
      const roles = await executeQuery(`SELECT
      role.id,
      role.title AS role,
      role.salary,
      department.dep_name AS department
      FROM role
      INNER JOIN department ON department.id = role.department_id`);

      console.table(roles);
    }

    if (choiceOption === "addDepartment") {
      const departmentInfo = await newDepartment();
      await executeQuery(
        `INSERT INTO department (dep_name) VALUES ("${departmentInfo}")`
      );
    }

    if (choiceOption === "quit") {
      await closeConnection();
      inProgress = false;
      console.log("Thank you for using this application");
    }
  }
};

const newDepartment = async () => {
  const departmentQuestion = [
    {
      name: "department",
      type: "input",
      message: "What is the department name?",
    },
  ];

  const { department } = await inquirer.prompt(departmentQuestion);

  return department;
};

init();
