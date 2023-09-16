const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('usuarios').del()
  await knex('usuarios').insert([
    {id: 1, nome: 'Usuario Admin', login: 'admin', email: 'usuario.admin@gmail.com', senha: bcrypt.hashSync("1234", 8), roles: 'USER;ADMIN'},
    {id: 2, nome: 'Usuário Padrão', login: 'user', email: 'usuario.padrao@gmail.com', senha: bcrypt.hashSync("1234", 8), roles: 'USER'}
  ]);
};