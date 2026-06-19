// authRoutes.js - Denna fil innehåller en route för att hantera inloggning.

// Importera nödvändiga moduler
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Hämta JWT-secret från miljövariabler (.env)
const SECRET_KEY = process.env.JWT_SECRET;

// Route för inloggning
router.post("/login", (req, res) => {

    // Hämta användarnamn och lösenord från request-body
    const { username, password } = req.body;

    // Enkel kontroll av inloggningsuppgifter
    if (
        username === "admin" &&
        password === "123456"
    ) {

        // Generera en JWT-token med användarinformation
        const token = jwt.sign(
            { username },
            SECRET_KEY,
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