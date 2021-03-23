import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import usersRoutes from './routes/user.js';
import carsRoutes from './routes/car.js';
import rentsRoutes from './routes/rent.js'

const app = express();
const port = process.env.PORT || 8080;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, PATCH, GET, DELETE, POST'
        );
        res.status(200).send({});
    }
    next();
})

app.use('/cliente', usersRoutes);
app.use('/carro', carsRoutes);
app.use('/rent', rentsRoutes);

app.get('/', (req, res) => {res.status(200).send({mensagem: "Bem vindo(a)"})});

app.use((req, res, next) => {
    const erro = new Error('Not Found!');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {mensagem: error.message || 'Internal error'}
    });
});

app.listen(port, () => {
    console.log('tudo certo: http://localhost:8080');
});