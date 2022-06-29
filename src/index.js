const inquirer = require("inquirer");

const init = async () => {
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

  const userChoice = await inquirer.prompt(choiceQuestions);

  console.log(userChoice);
};

init();
