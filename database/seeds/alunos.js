exports.seed = async function(knex) {
  await knex('alunos').del()
  await knex('alunos').insert([
    {id: 1, nome: 'Jonas Faria da Silva', genero: 'M', email: 'jonas.silva@gmail.com'},
    {id: 2, nome: 'Ana Paula Gomes', genero: 'F', email: 'a.paula.gomes@bol.com'},
    {id: 3, nome: 'Lucas Pereira Goncalvez', genero: 'M', email:'lucas.gon@gmail.com'},
    {id: 4, nome: 'Valeria Sanchez', genero: 'F', email: 'v.sanchez@hotmail.com'}
  ]);
};