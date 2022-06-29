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

const init = async () => {
  const db = await mysql.createConnection(config);
  // declare variables
  let inProgress = true;

  const choiceQuestions = [
    {
      type: "list",
      message: "What would you like to do?",
      name: "choiceOption",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    },
  ];

  while (inProgress) {
    const userChoice = await inquirer.prompt(choiceQuestions);

    if (userChoice.choiceOption == "View All Employees") {
      const employees = await getAllEmployees(db);
      console.table(employees);
    }

    if (userChoice.choiceOption == "Quit") {
      console.log("Thank you for using this application");
      inProgress = false;
    }
  }
};

const getAllEmployees = async (db) => {
  const [results] = await db.query("SELECT * FROM employee");
  return results;
};

init();
