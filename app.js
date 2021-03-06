const express = require('express');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const urlEncodeParser = bodyParser.urlencoded({extended:false});
const app = express();
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'mypassword',
    database = 'mydb'
})
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Inicial
app.get('/', function(req, res){
    res.render('index');
})
// Cliente
app.get('/cliente', function(req, res){
    res.render('cliente');
})
app.post('/home',urlEncodeParser, function(req, res){
})
app.post('/cliente', urlEncodeParser, function(req, res){
    sql.query("insert into cliente values(?,?,?,?)")
})
// Admin

app.listen(8080, function(req, res){
    console.log('tudo certo');
})