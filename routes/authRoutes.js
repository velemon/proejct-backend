// authRoutes.js - Denna fil innehåller en route för att hantera inloggning.
// När en POST-förfrågan görs till /api/auth/login, kontrolleras användarnamn och lösenord.
// Om inloggningen är korrekt, genereras en JWT-token som skickas tillbaka i svaret.
// Om inloggningen är felaktig, returneras en 401 Unauthorized-status med ett felmeddelande.

// Importera nödvändiga moduler
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Route för inloggning
router.post("/login", (req, res) => {

    // Hämta användarnamn och lösenord från request-body
    const { username, password } = req.body;

    // Kontrollera om användarnamn och lösenord är korrekta
    if(
        username === "admin" &&
        password === "123456"
    ) {

        // Generera en JWT-token med användarnamn som payload och en hemlig nyckel
        const token = jwt.sign(
            { username },
            "hemlignyckel",
            { expiresIn: "1h" }
        );

        // Skicka tillbaka token i svaret
        return res.json({ token });
    }

    // Om inloggningen är felaktig, returnera 401 Unauthorized
    res.status(401).json({
        message: "Fel inloggning"
    });
});

// Exportera router så att den kan användas i server.js
module.exports = router;