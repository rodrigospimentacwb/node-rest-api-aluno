exports.up = function(knex) {
    return knex.schema.createTable("alunos", tbl => {
      tbl.increments ('id') ;
      tbl.text ("nome", 255).notNullable();
      tbl.text ("genero", 1).notNullable();
      tbl.text ("email", 255).notNullable();  
    });   
  };

  exports.down = function(knex) {
    return knex.schema.dropTableIfExists ("alunos")
  };
