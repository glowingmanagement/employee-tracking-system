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
    console.log("HERE");
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
          value: "viewRoles",
          name: "View All Roles",
        },
        {
          value: "addRole",
          name: "Add New Role",
        },
        {
          value: "viewRoles",
          name: "View All Roles",
        },
        {
          value: "viewDepartment",
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
      const employees = await executeQuery(
        "SELECT * FROM employee JOIN (role JOIN department ON role.department_id = department.id) ON employee.role_id = role.id"
      );

      console.table(employees);
    }

    if (choiceOption === "quit") {
      await closeConnection();
      inProgress = false;
      console.log("Thank you for using this application");
    }
  }
};

init();
