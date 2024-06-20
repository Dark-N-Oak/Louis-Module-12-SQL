// index.js
const inquirer = require('inquirer');
const db = require('./db/connection');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employee_tracker();
});

var employee_tracker = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Department', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
        switch (answers.prompt) {
            case 'View All Department':
                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) throw err;
                    console.log("Viewing All Departments: ");
                    console.table(result.rows); // PostgreSQL result is in result.rows
                    employee_tracker();
                });
                break;
            case 'View All Roles':
                db.query(`SELECT * FROM role`, (err, result) => {
                    if (err) throw err;
                    console.log("Viewing All Roles: ");
                    console.table(result.rows); // PostgreSQL result is in result.rows
                    employee_tracker();
                });
                break;
            case 'View All Employees':
                db.query(`SELECT * FROM employee`, (err, result) => {
                    if (err) throw err;
                    console.log("Viewing All Employees: ");
                    console.table(result.rows); // PostgreSQL result is in result.rows
                    employee_tracker();
                });
                break;
            case 'Add A Department':
                inquirer.prompt([{
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of the department?',
                    validate: departmentInput => {
                        if (departmentInput) {
                            return true;
                        } else {
                            console.log('Please Add A Department!');
                            return false;
                        }
                    }
                }]).then((answers) => {
                    db.query(`INSERT INTO department (name) VALUES ($1)`, [answers.department], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.department} to the database.`)
                        employee_tracker();
                    });
                });
                break;
            case 'Add A Role':
                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) throw err;

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'role',
                            message: 'What is the name of the role?',
                            validate: roleInput => {
                                if (roleInput) {
                                    return true;
                                } else {
                                    console.log('Please Add A Role!');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the salary of the role?',
                            validate: salaryInput => {
                                if (salaryInput) {
                                    return true;
                                } else {
                                    console.log('Please Add A Salary!');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'department',
                            message: 'Which department does the role belong to?',
                            choices: () => {
                                return result.rows.map(row => row.name);
                            }
                        }
                    ]).then((answers) => {
                        const department = result.rows.find(row => row.name === answers.department);

                        db.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [answers.role, answers.salary, department.id], (err, result) => {
                            if (err) throw err;
                            console.log(`Added ${answers.role} to the database.`)
                            employee_tracker();
                        });
                    });
                });
                break;
            case 'Add An Employee':
                db.query(`SELECT * FROM employee, role`, (err, result) => {
                    if (err) throw err;

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is the employee\'s first name?',
                            validate: firstNameInput => {
                                if (firstNameInput) {
                                    return true;
                                } else {
                                    console.log('Please Add A First Name!');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'What is the employee\'s last name?',
                            validate: lastNameInput => {
                                if (lastNameInput) {
                                    return true;
                                } else {
                                    console.log('Please Add A Last Name!');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the employee\'s role?',
                            choices: () => {
                                const roles = result.rows.map(row => row.title);
                                return [...new Set(roles)];
                            }
                        },
                        {
                            type: 'input',
                            name: 'manager',
                            message: 'Who is the employee\'s manager?',
                            validate: managerInput => {
                                if (managerInput) {
                                    return true;
                                } else {
                                    console.log('Please Add A Manager!');
                                    return false;
                                }
                            }
                        }
                    ]).then((answers) => {
                        const role = result.rows.find(row => row.title === answers.role);

                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [answers.firstName, answers.lastName, role.id, answers.manager], (err, result) => {
                            if (err) throw err;
                            console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                            employee_tracker();
                        });
                    });
                });
                break;
            case 'Update An Employee Role':
                db.query(`SELECT * FROM employee, role`, (err, result) => {
                    if (err) throw err;

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employee',
                            message: 'Which employee\'s role do you want to update?',
                            choices: () => {
                                const employees = result.rows.map(row => row.last_name);
                                return [...new Set(employees)];
                            }
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is their new role?',
                            choices: () => {
                                const roles = result.rows.map(row => row.title);
                                return [...new Set(roles)];
                            }
                        }
                    ]).then((answers) => {
                        const employee = result.rows.find(row => row.last_name === answers.employee);
                        const newRole = result.rows.find(row => row.title === answers.role);

                        db.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [newRole.id, employee.id], (err, result) => {
                            if (err) throw err;
                            console.log(`Updated ${answers.employee}'s role in the database.`)
                            employee_tracker();
                        });
                    });
                });
                break;
            case 'Log Out':
                db.end();
                console.log("Good-Bye!");
                break;
            default:
                console.log("Invalid choice.");
                break;
        }
    });
};
