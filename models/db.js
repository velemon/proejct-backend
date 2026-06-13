// db.js - Denna fil hanterar anslutningen till MySQL-databasen. 
// Den använder mysql2-biblioteket för att skapa en anslutning med de angivna databasuppgifterna 
// (host, user, password, database). Anslutningen exporteras sedan så att den kan användas i andra delar av 
// applikationen.
const mysql = require("mysql2");

// Skapa en anslutning till MySQL-databasen
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kfc_project"
});

module.exports = connection;