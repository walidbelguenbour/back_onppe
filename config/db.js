const { Pool } = require('pg');

const pool = new Pool({
    user: 'openpg',
    host: 'localhost',
    database: 'onppe_db',
    password: 'openpgpwd',
    dialect: 'openpgpwd',
    port: 5432
});

module.exports = pool;