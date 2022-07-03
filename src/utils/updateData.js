const inquirer = require("inquirer");
const { getUpdateRoleQuestions } = require("../questions");

const updateRole = async (currentRoles, currentEmployees, executeQuery) => {
  const { employee, role } = await inquirer.prompt(
    getUpdateRoleQuestions(currentEmployees, currentRoles)
  );

  await executeQuery(
    `UPDATE employee SET role_id = ${role} WHERE id = ${employee}`
  );

  const message = `Role successfully updated`;
  return message;
};

module.exports = {
  updateRole,
};
