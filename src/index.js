const inquirer = require("inquirer");
require("dotenv").config();
const mysql = require("mysql2/promise");
const { getDepartments, getRoles, getEmployees } = require("./utils/viewData");
const { newDepartment, newRole } = require("./utils/addData");
const { choiceQuestions } = require("./questions");

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

  while (inProgress) {
    const { choiceOption } = await inquirer.prompt(choiceQuestions);

    if (choiceOption === "getEmployees") {
      console.table(await getEmployees(executeQuery));
    }

    if (choiceOption === "addEmployees") {
      console.log("add employees");
    }

    if (choiceOption === "updateRole") {
      console.log("update role");
    }

    if (choiceOption === "getRoles") {
      console.table(await getRoles(executeQuery));
    }

    if (choiceOption === "addRole") {
      const currentDepartments = await getDepartments(executeQuery);
      const roleInfo = await newRole(currentDepartments, executeQuery);
    }

    if (choiceOption === "getDepartment") {
      console.table(await getDepartments(executeQuery));
    }

    if (choiceOption === "addDepartment") {
      const departmentInfo = await newDepartment(executeQuery);
      console.log(departmentInfo);
    }

    if (choiceOption === "quit") {
      await closeConnection();
      inProgress = false;
      console.log("Thank you for using this application");
    }
  }
};

init();
