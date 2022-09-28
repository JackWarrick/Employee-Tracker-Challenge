//QUESTIONS: how to present the data in the say that isn't JSON? 
//How to get the manager_id key assigned to a name so it will change to that instead of the number - or wait no the manager might be like the same as the id they are all assigned so I can change that in seeds to not be the same
//3. Connecting the role ids and manager ids with the names they correspond with
//4. should it do the autoincrement on ids?

const mysql = require('mysql2');
var inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      user: 'root',
      password: 'PAss563??',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  const homePage = [
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'home',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
  }
];

const departmentName = [
  {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'deptName',
},
];

const roleName = [
  {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'roleName',
},
];

const employeeName = [
  {
    type: 'input',
    message: 'What is the name of the employee?',
    name: 'employeeFirstName',
},
];


const doThis = () =>  {
  inquirer.prompt(homePage).then((data) => {
      if (data.home === 'View all departments'){
        db.query('SELECT * FROM department', (err, data1) => {
          if (err){
            return console.log('ERROR')
          }
          else console.log('All good')
          console.table(data1)
          doThis();
        })}

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


          else if (data.home === 'Add a department'){
            inquirer.prompt(departmentName).then((answer) => {
              db.query(`INSERT INTO department (department_name) values (${answer.deptName});`, (err, data4) => {
                if (err){
                  console.log(err)
                  return console.log('ERROR')
                }
                else console.log('All good')
                console.log(data4)
                doThis();
                //ERROR HERE
              })}  
              )}


          else if (data.home === 'Add a role'){
            inquirer.prompt(roleName).then((answer) => {
            db.query(`INSERT INTO roles (title) values (${answer.roleName})`, (err, data5) => {
              if (err){
                return console.log('ERROR')
              }
              else console.log('All good')
              console.log(data5)
              doThis();
            })}  
            )}

          else if (data.home === 'Add an employee'){
            inquirer.prompt(employeeName).then((answer) => {
              db.query(`INSERT INTO employee (first_name) values (${answer.employeeFirstName})`, (err, data6) => {
                if (err){
                  return console.log('ERROR')
                }
                else console.log('All good')
                console.log(data6)
                doThis();
              })}  
              )}
            
          else if (data.home === 'Update an employee role'){
                db.query('SELECT * FROM FIX!!!', (err, data7) => {
                  if (err){
                    return console.log('ERROR')
                  }
                  else console.log('All good')
                  console.log(data7)
                  doThis();
                })}  
      })};
      
    doThis();


  // NEED TO 
  // 1. run inquirer to execute what the user wants
  // - View all departments - View all roles - View all employees - Add a department - Add a role - Add an employee - Update an employee role
  // 2. User if statements like in the team profile generator challenge, use db.query with the methods like 'SELECT * FROM department' for showing all or `DELETE FROM favorite_books WHERE id = ?` - look at the mini project - or update one to change the database