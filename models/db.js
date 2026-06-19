// db.js - Denna fil hanterar anslutningen till MySQL-databasen. 
// Den använder mysql2-biblioteket för att skapa en anslutning med de angivna databasuppgifterna 
// (host, user, password, database). Anslutningen exporteras sedan så att den kan användas i andra delar av 
// applikationen.
const mysql = require("mysql2");

// Skapa en anslutning till MySQL-databasen
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kfc_project"
});

// Försök att ansluta till databasen och logga resultatet
db.connect((err) => {

    // Om det uppstår ett fel, logga det och returnera
    if (err) {
        console.log(err);
        return;
    }

    // Om anslutningen är framgångsrik, logga detta meddelandet
    console.log("Databasen är ansluten");
});

// Exportera anslutningen så att den kan användas i andra filer
module.exports = db;