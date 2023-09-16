const express = require('express')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const knexEnv = process.env.NODE_ENV || 'development'
const knexConfig = require('../knexfile')[knexEnv]
const knex = require('knex')(knexConfig)

const rootPath = "/auth"
function basePath(path) {
    return rootPath + path
}

authRouter.post(basePath('/login'), (req, res) => {
    const { login, senha } = req.body;
    knex("usuarios")
        .where({"login" : login})
        .then(usuarios => {
            console.log(usuarios)
            if(usuarios.length) {                
                bcrypt.compare(usuarios[0].senha, senha)
                    .then (() => {
                        jwt.sign({
                            login: usuarios[0].login,
                            roles: usuarios[0].roles
                        }, process.env.JWT_SECRET, {expiresIn: '1h' } , (err, token) => {
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

module.exports = authRouter