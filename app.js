require('dotenv').config()
console.log('Ambiente:', process.env.NODE_ENV)

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })) 
app.use(express.json());

const rotaAlunos = require('./routes/alunosRouter');
app.use('/alunos', rotaAlunos);

const rotaSeguranca = require('./routes/apiSegRouter');
app.use('/seg', rotaSeguranca);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).send({});
        }
        next();
})

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
})

module.exports = app;