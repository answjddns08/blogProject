const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "flask_user",
  password: "0808",
  database: "blog_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
