//Require everything we need to include to run the application
const mysql = require('mysql2');
var inquirer = require('inquirer');
const cTable = require('console.table');

//Create the connection to the database created in the schema
const db = mysql.createConnection(
    {
      user: 'root',
      password: 'PAss563??',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  //List of choices for the user to select from at the start
  const homePage = [
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'home',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
  }
];

//Question for adding new deparment pathway
const departmentName = [
  {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'deptName',
},
];

//Questions for adding new role pathway
const roleName = [
  {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'roleName', 
},
{
  type: 'input',
  message: 'What is the salary of the role?',
  name: 'roleSalary', 
},
{
  type: 'input',
  message: 'What is the Department Number of the role?',
  name: 'roleDeptNumber', 
},
];

//Questions for adding new employee pathway
const employeeName = [
  {
    type: 'input',
    message: 'What is the first name of the employee?',
    name: 'employeeFirstName',
},
{
  type: 'input',
  message: 'What is the last name of the employee?',
  name: 'employeeLastName',
},
{
  type: 'input',
  message: 'What is the role id of the employee?',
  name: 'employeeRoleId',
},
{
  type: 'input',
  message: 'What is the manager id of the employee?',
  name: 'employeeManagerId',
},
];

//Questions for updating an employee
const updateRole = [
  {
    type: 'input',
    message: 'What is the id of the employee?',
    name: 'employeeId',
},
{
  type: 'input',
  message: 'What would you like to change the role id to?',
  name: 'employeeRoleId',
},
];

//Master function - really the only function with a lot of paths inside of it
const doThis = () =>  {
  inquirer.prompt(homePage).then((data) => {
    //View all departments if user selects that
      if (data.home === 'View all departments'){
        db.query('SELECT * FROM department', (err, data1) => {
          //check for errors
          if (err){
            return console.log('ERROR')
          }
          //use console.table for the formatting of viewed information
          else console.log('All good')
          console.table(data1)
          doThis();
        })}
        //View all roles if user selects that
          else if (data.home === 'View all roles'){
          db.query('SELECT roles.id,title,salary,department_name FROM roles JOIN department ON roles.Department=department.id'//join the department table in the quote//
          , (err, data2) => {
            if (err){
              console.log(err)
              return console.log('ERROR')
            }
            else console.log('All good')
            console.table(data2)
            doThis();
          })}

          //View all employees if user selects that
          else if (data.home === 'View all employees'){
            db.query('SELECT * FROM employee JOIN roles ON employee.role_id=roles.id JOIN department ON roles.Department=department.id', (err, data3) => {
              if (err){
                console.log(err)
                return console.log('ERROR')
              }
              else console.log('All good')
              console.table(data3)
              doThis();
            })}  

          //Add a department with INSERT INTO if user selects that
          else if (data.home === 'Add a department'){
            inquirer.prompt(departmentName).then((answer) => {
              db.query(`INSERT INTO department (department_name) values ('${answer.deptName}')`, (err, data4) => {
                if (err){
                  console.log(err)
                  return console.log('ERROR')
                }
                else console.log('All good')
                console.log(data4)
                doThis();
              })}  
              )}

            //Add a role with INSERT INTO if user selects that
          else if (data.home === 'Add a role'){
            inquirer.prompt(roleName).then((answer) => {
            db.query(`INSERT INTO roles (title, salary, Department) values ('${answer.roleName}', '${answer.roleSalary}', '${answer.roleDeptNumber}')`, (err, data5) => {
              if (err){
                console.log(err)
                return console.log('ERROR')
              }
              else console.log('All good')
              console.log(data5)
              doThis();
            })}  
            )}

          //Add an employee with INSERT INTO if user selects that
          else if (data.home === 'Add an employee'){
            inquirer.prompt(employeeName).then((answer) => {
              db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('${answer.employeeFirstName}', '${answer.employeeLastName}', '${answer.employeeRoleId}', '${answer.employeeManagerId}')`, (err, data6) => {
                if (err){
                  return console.log('ERROR')
                }
                else console.log('All good')
                console.log(data6)
                doThis();
              })}  
              )}
           
          //Update an employee role with UPDATE if user selects it
          else if (data.home === 'Update an employee role'){
            inquirer.prompt(updateRole).then((answer) => {
                db.query(`UPDATE employee SET role_id = '${answer.employeeRoleId}' WHERE employee.id = '${answer.employeeId}' `, (err, data7) => {
                  if (err){
                    return console.log('ERROR')
                  }
                  else console.log('All good')
                  console.log(data7)
                  doThis();
                })})}  
      })};
      
    doThis();