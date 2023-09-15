exports.up = function(knex) {
    return knex.schema.createTable("usuarios", tbl => {
      tbl.increments ('id') ;
      tbl.text ("nome", 255).unique().notNullable();
      tbl.text ("login", 255).unique().notNullable();
      tbl.text ("email", 100).notNullable();
      tbl.text ("senha", 100).notNullable();
      tbl.text ("roles", 100).notNullable();
    });   
  };

  exports.down = function(knex) {
    return knex.schema.dropTableIfExists ("usuarios")
  };
