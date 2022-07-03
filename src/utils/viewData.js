const getDepartments = async (executeQuery) => {
  const departments = await executeQuery("SELECT * FROM department");
  return departments;
};

const getRoles = async (executeQuery) => {
  const roles = await executeQuery(`SELECT
      role.id,
      role.title AS role,
      role.salary,
      department.dep_name AS department
      FROM role
      INNER JOIN department ON department.id = role.department_id`);
  return roles;
};

const getEmployees = async (executeQuery) => {
  const employees = await executeQuery(`SELECT e.id,
    CONCAT(e.first_name,' ',
           e.last_name) AS employee,
           r.salary, r.title,
           d.dep_name,
          CONCAT(m.first_name,' ',
           m.last_name) AS manager
    FROM employee AS e
      LEFT JOIN employee AS m 
      ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id
      ORDER BY e.last_name;
    `);
  return employees;
};

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
};
