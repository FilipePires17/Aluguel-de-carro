import mysql from "mysql";

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'mypassword',
    database: 'mydb'
});

export default sql;