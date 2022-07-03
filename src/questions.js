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
        value: "getRoles",
        name: "View All Roles",
      },
      {
        value: "addRole",
        name: "Add New Role",
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

const departmentQuestion = [
  {
    name: "department",
    type: "input",
    message: "What is the department name?",
  },
];

module.exports = {
  choiceQuestions,
  departmentQuestion,
};
