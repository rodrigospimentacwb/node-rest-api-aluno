const express = require('express')
const router = express.Router()
const authRouter = require('./authRouter')
const securityFilters = require('../middleware/security-filters')

const knexEnv = process.env.NODE_ENV || 'development'
const knexConfig = require('../knexfile')[knexEnv]
const knex = require('knex')(knexConfig)

const rootPath = "/alunos"
function basePath(path) {
    return rootPath + path
}

router.get(basePath('/'), securityFilters.checkAuth(), (req, res, next) => {
    knex("alunos")
    .then(alunos => res.status(200).json(alunos))
});

router.get(basePath('/:id'), securityFilters.checkAuth("USER"), (req, res, next) => {
    knex("alunos")
    .where({id: req.params.id})
    .then(alunos => {
        if (alunos.length) {
            res.status(200).json(alunos[0])
        } else {
            return res.status(404).json({ mensagem: 'Aluno não encontrado' })
        }
    })
});

router.post(basePath('/'), securityFilters.checkAuth("ADMIN"), (req, res, next) => {
    const { nome, genero, email } = req.body;

    if (!nome || !genero || !email) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
    }

    knex('alunos')
        .insert({ nome, genero, email })
        .returning('*')
        .then(aluno => {
            res.status(201).json(aluno[0]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro ao criar o aluno.' });
        });
});

router.put(basePath('/:id'), securityFilters.checkAuth("ADMIN"), (req, res, next) => {
    const { nome, genero, email } = req.body;

    if (!nome || !genero || !email) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
    }

    knex('alunos')
        .where({ id: req.params.id })
        .update({ nome, genero, email })
        .returning('*')
        .then(aluno => {
            if (aluno.length) {
                res.status(200).json(aluno[0]);
            } else {
                res.status(404).json({ mensagem: 'Aluno não encontrado.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro ao atualizar o aluno.' });
        });
});

router.delete(basePath('/:id'), securityFilters.checkAuth("ADMIN"), (req, res, next) => {
    knex('alunos')
        .where({ id: req.params.id })
        .del()
        .then(deletedCount => {
            if (deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ mensagem: 'Aluno não encontrado.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro ao excluir o aluno.' });
        });
});

module.exports = router