const express = require('express')
const router = express.Router()
const knex = require('knex') (require('../knexfile').development)

const listaAlunos = {
    alunos: []
};

router.get('/', (req, res, next) => {
    knex("alunos")
    .then(alunos => res.status(200).json(alunos))
});

router.get('/:id_aluno', (req, res, next) => {
    knex("alunos")
    .where({id: req.params.id_aluno})
    .then(alunos => {
        if (alunos.length) {
            res.status(200).json(alunos[0])
        } else {
            return res.status(404).json({ mensagem: 'Aluno não encontrado' })
        }
    })
});

router.post('/', (req, res, next) => {
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

router.put('/:id_aluno', (req, res, next) => {
    const { nome, genero, email } = req.body;

    if (!nome || !genero || !email) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
    }

    knex('alunos')
        .where({ id: req.params.id_aluno })
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

router.delete('/:id_aluno', (req, res, next) => {
    knex('alunos')
        .where({ id: req.params.id_aluno })
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