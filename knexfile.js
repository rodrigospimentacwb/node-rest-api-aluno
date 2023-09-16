
require('dotenv').config()
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,

    seeds: {
      directory: './database/seeds',
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './database/seeds',
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    }
  }

};
