const inquirer = require("inquirer");
const { departmentQuestion } = require("../questions");

const newDepartment = async (executeQuery) => {
  const { department } = await inquirer.prompt(departmentQuestion);

  await executeQuery(
    `INSERT INTO department (dep_name) VALUES ("${department}")`
  );

  const message = `${department} Department Added`;
  return message;
};

const newRole = async (currentDepartments, executeQuery) => {
  const roleQuestions = [
    {
      name: "roleTitle",
      type: "input",
      message: "What is the role title?",
    },
    {
      name: "roleSalary",
      type: "input",
      message: "What is the role salary?",
    },
    {
      name: "roleDepartment",
      type: "list",
      message: "What department is this role?",
      choices: listDepartments(currentDepartments),
    },
  ];

  const { roleTitle, roleSalary, roleDepartment } = await inquirer.prompt(
    roleQuestions
  );

  await executeQuery(
    `INSERT INTO role (title, salary, department_id) VALUES ("${roleTitle}", "${roleSalary}", "${roleDepartment}")`
  );

  const message = `${roleTitle} successfully added`;
  return message;
};

const listDepartments = (currentDepartments) => {
  return currentDepartments.map((department) => ({
    name: department.dep_name,
    value: department.id,
  }));
};

module.exports = {
  newDepartment,
  newRole,
};
