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

module.exports = {
  newDepartment,
};
