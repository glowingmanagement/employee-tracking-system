const inquirer = require("inquirer");
const {
  getDepartmentQuestion,
  getRoleQuestion,
  getEmployeeQuestions,
} = require("../questions");

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
    getRoleQuestion(currentDepartments)
  );

  await executeQuery(
    `INSERT INTO role (title, salary, department_id) VALUES ("${roleTitle}", "${roleSalary}", "${roleDepartment}")`
  );

  const message = `${roleTitle} successfully added`;
  return message;
};

const newEmployee = async (currentRoles, currentEmployees, executeQuery) => {
  const { firstName, lastName, role, manager } = await inquirer.prompt(
    getEmployeeQuestions(currentRoles, currentEmployees)
  );

  if (manager === "NULL") {
    await executeQuery(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${role}", NULL)`
    );
  } else {
    await executeQuery(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${role}", "${manager}")`
    );
  }

  const message = `${firstName} ${lastName} successfully added as an employee`;
  return message;
};

module.exports = {
  newDepartment,
  newRole,
  newEmployee,
};
