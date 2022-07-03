const inquirer = require("inquirer");
const { getDepartmentQuestion, getRoleQuestion } = require("../questions");

const newDepartment = async (executeQuery) => {
  const { department } = await inquirer.prompt(getDepartmentQuestion());

  await executeQuery(
    `INSERT INTO department (dep_name) VALUES ("${department}")`
  );

  const message = `${department} Department Added`;
  return message;
};

const newRole = async (currentDepartments, executeQuery) => {
  const { roleTitle, roleSalary, roleDepartment } = await inquirer.prompt(
    getRoleQuestion(currentDepartments, listDepartments)
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
