const mysql = require("mysql2");

const connection = mysql.createPool({
    host: "<Your-host>",
    user: "<Your-username>",
    password: "<Your-password>",
    database: "<Your-database>"
  });

module.exports = connection
