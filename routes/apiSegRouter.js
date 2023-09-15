const express = require('express')
const apiSegRouter = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const knexEnv = process.env.NODE_ENV || 'development'
const knexConfig = require('../knexfile')[knexEnv]
const knex = require('knex')(knexConfig)

apiSegRouter.post('/login', (req, res) => {
    const { login, senha } = req.body;
    console.log(login)
    console.log(senha)
    knex("usuarios")
        .where({"login" : login})
        .then(usuarios => {
            console.log(usuarios)
            if(usuarios.length) {                
                bcrypt.compare(usuarios[0].senha, senha)
                    .then (senhaOk => {
                        jwt.sign({"login": login }, process.env.JWT_SECRET, {expiresIn: '1h' } , (err, token) => {
                            if (err) {
                                res.status(500).json({mensagem: "Erro ao gerar token"})
                            }
                            res.status(200).json({ token })
                        })
                    })
            } else {
                res.status(401).json({ mensagem: "Usuário ou senha inválidos" })
            }
        })
})

apiSegRouter.checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null)  
        return res.status(401).json({mensagem: "Token Inválido"})

    jwt.verify(token , process.env.JWT_SECRET, (err, payload) => {
        if (err)  
            return res.status(401).json({mensagem: "Token Inválido"})
        req.token = payload
        next()
    })
}

module.exports = apiSegRouter