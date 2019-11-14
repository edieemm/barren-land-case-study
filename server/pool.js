const pg = require('pg');

let config = {
  host: 'localhost', 
  port: 5432, 
  database: 'myRetail-API',
  max: 10, 
  idleTimeoutMillis: 30000, 
};

const pool = new pg.Pool(config);

pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
