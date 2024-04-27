import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

pool.getConnection()
  .then(connection => connection.release())
  .catch(error => {
    console.error('Problem with connection to database:', error);
    process.exit(1);
  });

export default pool;