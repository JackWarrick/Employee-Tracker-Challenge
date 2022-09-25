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