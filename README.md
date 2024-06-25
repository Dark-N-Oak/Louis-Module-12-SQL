# Louis-Module-12-SQL
## Description
I've been task with making an employee tracker. I have created code for index.js and dbfolder containing javascript and sql code.
I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role when I start the application.
I am presented with a formatted table showing department names and department ids when I choose to view all departments.
I am presented with the job title, role id, the department that role belongs to, and the salary for that role when I choose to view all roles.
I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to when I choose to view all employees.
I am prompted to enter the name of the department and that department is added to the database when I choose to add a department.
I am prompted to enter the name, salary, and department for the role and that role is added to the database when I choose to add a role.
I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database when I choose to add an employee.
I am prompted to select an employee to update and their new role and this information is updated in the database when I choose to update an employee role.
Lastly, I made sure to leave the code well documented and free of errors.

## What's Included
* db Folder
    * connection.js
    * db.sql
    * schema.sql
    * seeds.sql
* index.js
* package.json
* README.md
  
## How to setup
* First gitclone the application to your machine.
* Next open the application in vscode.
* Then open pgadmin4 or postgresql.
* Then open a terminal in vscode.
* Enter into the terminal "psql -U postgres", and enter your password to connect to the sever.
* Then in the node terminal enter in "CREATE DATABASE employee_tracker_db;", this creates a database in pgadmin4.
* Enter into the node terminal "CREATE USER your_username WITH PASSWORD 'your_password';".
* Then enter in "GRANT ALL PRIVILEGES ON DATABASE employee_tracker_db TO your_username;" and login into pgadmin4 to make sure it worked.
* If didn't work you can go to pgadmin4 and manually turn on the privages in the user profile you created.
* Then in bash terminal enter in "psql -U your_username -d employee_tracker_db -f schema.sql" and "psql -U your_username -d employee_tracker_db -f seeds.sql".
* In bash terminal enter in "npm i inquirer@8.2.4" and "npm i pg".
* Once they're finish downloading, enter in bash terminal "node index.js and should be met with the application.
* If you encounter errors, check your PostgreSQL connection details in connection.js, SQL queries in index.js, and ensure PostgreSQL server is running.

## Screenshot
![Screenshot 2024-06-24 191651](https://github.com/Dark-N-Oak/Louis-Module-12-SQL/assets/163933013/c81fa3ac-69b8-4dc4-b25f-54f41e427b40)
## Video
