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

const getDepartmentQuestion = () => {
  const departmentQuestions = [
    {
      name: "department",
      type: "input",
      message: "What is the department name?",
    },
  ];

  return departmentQuestions;
};

const getRoleQuestion = (currentDepartments, listDepartments) => {
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

  return roleQuestions;
};

module.exports = {
  choiceQuestions,
  getDepartmentQuestion,
  getRoleQuestion,
};
