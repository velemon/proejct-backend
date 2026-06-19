// createAdmin.js - Denna fil används för att skapa en administratörsanvändare i databasen
const bcrypt = require("bcryptjs");
const db = require("./models/db");

const password = "admin123";

// Hasha lösenordet innan det sparas i databasen
bcrypt.hash(password, 10, (err, hash) => {

    // Om det uppstår ett fel under hashning, logga det och avsluta
    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        ["admin", hash],
        // Callback-funktion som hanterar resultatet av SQL-frågan
        (err) => {
            // Om det uppstår ett fel, logga det. Annars, logga att admin skapats och avsluta processen
            if (err) console.log(err);
            else console.log("Admin skapad");
            process.exit();
        }
    );

});