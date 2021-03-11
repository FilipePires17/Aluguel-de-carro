const express = require('express');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const urlEncodeParser = bodyParser.urlencoded({extended:false});
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'mypassword',
    database: 'mydb'
});
const sessionStore = new MySQLStore({}, sql);

app.use(session({
    key: 'session-cookie',
    secret: 'primeirocrud',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next();
    } else {
        res.redirect('/cliente');
    }
}

// Inicial
app.get('/', (req, res) => {
    res.render('index');
});
// Cliente
app.get('/cliente', (req, res) => {
    res.render('cliente');
});
app.get('/cliente_cadastro', (req, res) => {
    res.render('cliente_cadastro');
});
app.get('/home', isAuth, (req, res) => {
    sql.query('select * from carro order by carro.modelo',
    (err, results, fields)=>{
        if(err) throw err;
        res.render('home', {data: results});
    })
    
});
app.get('/detalhes-aluguel/:id', isAuth, (req, res) => {
    const CodCar = Number(req.params.id);
    sql.query('select * from carro where CodCar = ?', [CodCar],
    (err, results, fields)=>{
        if(err) throw err;
        if(results.length == 0){
            req.flash('error_msg', 'Carro nao encontrado');
            res.redirect('/home');
        } else if(results.length > 1){
            req.flash('error_msg', 'Ops, erro interno :(');
            res.redirect('/home');
        } else {
            res.render('detalhes-aluguel', {data:results});
        }
        
    })
    
})
app.post('/cliente_cadastro', urlEncodeParser, (req, res) => {
    var erros = [];
    let isAvailable = true;

    if(!req.body.user){
        erros.push({texto: "Usuario invalido"});
    }
    if(!req.body.name){
        erros.push({texto: "Nome invalido"});
    }
    if(!req.body.cnh){
        erros.push({texto: "CNH invalida"});
    }
    if(!req.body.adress){
        erros.push({texto: "Endereço invalido"});
    }

    if(erros.length > 0){
        res.render("cliente_cadastro", {erros: erros})
    } else {
        sql.query('select * from cliente', (err, results, fields) => {
            if(err) throw err;
            for (let i = 0; i < results.length; i++) {
                if(req.body.user == results[0].CodCli){
                    isAvailable = false;
                    req.flash('error_msg', 'Nome de usuario indisponivel');
                    res.redirect('/cliente_cadastro');
                    break;
                }                
            }
        if(isAvailable){
            sql.query('insert into cliente values(?, ?, ?, ?)',
            [req.body.user, req.body.name, req.body.cnh, req.body.adress]);
            sql.query('insert into telefone values(?, ?)',
            [req.body.user, req.body.phone]);
            req.flash('success_msg', 'Cadastrado com sucesso');
            res.redirect('/cliente');
        }
        });
    }

});
app.post('/cliente', urlEncodeParser, (req, res) => {
    var erros = [];

    if(!req.body.user){
        erros.push({texto: 'Usuario invalido'});
    }

    if(erros.length > 0){
        res.render('cliente', {erros: erros})
    } else {
        sql.query('select * from cliente where CodCli = ?',
        [req.body.user], (err, results, fields) => {
            if(err) throw err;
            if(results.length == 0){
                req.flash('error_msg', 'Usuario inexistente');
                res.redirect('/cliente');
            } else if(results.length > 1){
                req.flash('error_msg', 'Ops! Algo deu errado no nosso server');
                res.redirect('/cliente');
            } else{
                req.session.isAuth = true;
                req.session.Cliente = req.body.user;
                res.redirect('/home');
            }

        });
    }
});
app.post('/logout', (req, res) => {
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/');
    })
})
app.post('/detalhes-aluguel', urlEncodeParser, (req, res) => {
    const start_date = req.body.start_date;
    const finish_date = req.body.finish_date;
    const CodCli = req.session.Cliente;
    const CodCar = Number(req.body.codcar);
    const url = '/detalhes-aluguel/' + req.body.codcar;
    sql.query('select * from aluguel where ' + 
    '(? >= DataInicio && ? <= DataFinal) ' +
    '|| (? >= DataInicio && ? <= DataFinal)',
    [finish_date, finish_date, start_date, start_date],
    (err, results, field) => {
        if(err) throw err;
        if(results.length > 0){
            req.flash('error_msg', 'Data indisponivel');
            res.redirect(url);
        } else {
            if(finish_date < start_date){
                req.flash('error_msg',
                'Data final nao pode ser menor que data inicial');
                res.redirect(url);
            } else {
                sql.query('insert aluguel(DataInicio, DataFinal, CodCLi, CodCar)' +
                ' values(?,?,?,?)', [start_date, finish_date, CodCli, CodCar]);
                req.flash('success_msg', 'Aluguel realizado com sucesso');
                res.redirect('/home');
            }
        }
    })
})
// Admin

app.listen(8080, (req, res) => {
    console.log('tudo certo');
});