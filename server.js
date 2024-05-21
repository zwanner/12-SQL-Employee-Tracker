
const inquirer = require("inquirer");
// Import and require Pool (node-postgres)
const { Pool } = require("pg");
const pg = require("pg");
const fs = require("fs");
const { Console } = require("console");


// Connect to database
const pool = new Pool(
    {
        // TODO: Enter PostgreSQL username
        user: 'postgres',
        host: 'localhost',
        database: 'employee_db',
        // TODO: Enter PostgreSQL password
        password: 'snowen17',
        port: 5432
    },
    console.log(`Connected to the employee database.`)
)

pool.connect()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Connection error", err.stack);
    });
const PORT = process.env.PORT || 3001;

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name."
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name."
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the employee's role ID."
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter the employee's manager ID."
        }
    ]).then((response) => {
        pool.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
            [response.first_name, response.last_name, response.role_id, response.manager_id],
            (err, res) => {
                if (err) throw err;
                console.log("Employee added successfully.");
                mainMenu();
            }
        );
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the role title."
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the role salary."
        },
        {
            type: "input",
            name: "department_id",
            message: "Enter the department ID."
        }
    ]).then((response) => {
        pool.query(
            "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
            [response.title, response.salary, response.department_id],
            (err, res) => {
                if (err) throw err;
                console.log("Role added successfully.");
                mainMenu();
            }
        );
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the department name."
        }
    ]).then((response) => {
        pool.query(
            "INSERT INTO department (name) VALUES ($1)",
            [response.name],
            (err, res) => {
                if (err) throw err;
                console.log("Department added successfully.");
                mainMenu();
            }
        );
    });
}

function viewAllEmployees() {
    pool.query(
        "SELECT * FROM employee",
        (err, res) => {
            if (err) throw err;
            console.table(res.rows);
            mainMenu();
        }
    );
}

function viewAllRoles() {
    pool.query(
        "SELECT * FROM role",
        (err, res) => {
            if (err) throw err;
            console.table(res.rows);
            mainMenu();
        }
    );
}

function viewAllDepartments() {
    pool.query(
        "SELECT * FROM department",
        (err, res) => {
            if (err) throw err;
            console.table(res.rows);
            mainMenu();
        }
    );
}



function updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the ID of the employee you want to update:',
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'Select the new role for the employee:',
                choices: [
                    'Manager',
                    'Sales Lead',
                    'Salesperson',
                    'Lead Engineer',
                    'Marketing Manager',
                    'HR Specialist',
                    'IT Analyst',
                    'Operations Manager'
                ],
            },
        ])
        .then((answers) => {
            const { employeeId, newRole } = answers;
            // Implement logic to update the employee's role in the database
            pool.query(
                'UPDATE employee SET role = $1 WHERE id = $2',
                [newRole, employeeId],
                (error, result) => {
                    if (error) {
                        console.log('An error occurred:', error);
                    } else {
                        console.log('Employee role updated successfully');
                    }
                }
            );
        })
        .catch((error) => {
            console.log('An error occurred:', error);
        });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "Enter the employee's ID."
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the new role ID."
        }
    ]).then((response) => {
        pool.query(
            "UPDATE employee SET role_id = $1 WHERE id = $2",
            [response.role_id, response.employee_id],
            (err, res) => {
                if (err) throw err;
                console.log("Employee role updated successfully.");
                mainMenu();
            }
        );
    });

}

function deleteEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the ID of the employee you want to delete:',
            },
        ])
        .then((answers) => {
            const { employeeId } = answers;
            // Implement logic to delete the employee from the database
            pool.query(
                'DELETE FROM employee WHERE id = $1',
                [employeeId],
                (error, result) => {
                    if (error) {
                        console.log('An error occurred:', error);
                    } else {
                        console.log('Employee deleted successfully');
                    }
                    mainMenu();
                }
            );
        })
        .catch((error) => {
            console.log('An error occurred:', error);
            mainMenu();
        });
}

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["Add Employee", "Add Role", "Add Department", "Update Employee Role", "Delete Employee", "View All Employees", "View All Roles", "View All Departments", "Exit"]
        }
    ]).then((response) => {
        switch (response.choice) {
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Exit":
                process.exit();
                break;
        }
    });

}

mainMenu();