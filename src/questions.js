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

const getRoleQuestion = (currentDepartments) => {
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

const getEmployeeQuestions = (currentRoles, currentEmployees) => {
  const employeeQuestions = [
    {
      name: "firstName",
      type: "input",
      message: "What's the employee's first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What's the employee's last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is their role?",
      choices: listRoles(currentRoles),
    },
    {
      name: "manager",
      type: "list",
      message: "Please select relevant manager",
      choices: listEmployees(currentEmployees),
    },
  ];

  return employeeQuestions;
};

const listDepartments = (currentDepartments) => {
  return currentDepartments.map((department) => ({
    name: department.dep_name,
    value: department.id,
  }));
};

const listRoles = (currentRoles) => {
  return currentRoles.map((role) => ({
    name: role.role,
    value: role.id,
  }));
};

const listEmployees = (employees) => {
  const employeeArray = employees.map((employee) => ({
    name: employee.employee,
    value: employee.id,
  }));

  employeeArray.push({
    name: "No manager",
    value: "NULL",
  });

  return employeeArray;
};

const listManagers = (managers) => {
  return managers.map((manager) => ({
    name: employee.employee,
    value: employee.manager_id,
  }));
};

module.exports = {
  choiceQuestions,
  getDepartmentQuestion,
  getRoleQuestion,
  getEmployeeQuestions,
};
