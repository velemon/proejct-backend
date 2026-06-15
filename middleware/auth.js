// auth.js - Denna fil innehåller middleware-funktionen som används för att autentisera användare.
// Den kontrollerar om en JWT-token finns i request-headern och verifierar den. 
// Om token är giltig, läggs den avkodade informationen till i request-objektet och nästa middleware-funktion anropas. 
// Om token saknas eller är ogiltig, returneras en 401 Unauthorized-status med ett felmeddelande.
const jwt = require("jsonwebtoken");

// Middleware-funktion för att autentisera användare
module.exports = (req, res, next) => {

    // Hämta token från request-headern
    const token = req.headers.authorization;

    // Om ingen token finns, returnera 401 Unauthorized
    if (!token) {
        return res.status(401).json({
            message: "Ingen token"
        });
    }

    // Försök att verifiera token och avkoda den
    try {

        const decoded = jwt.verify(
            token,
            "hemlignyckel"
        );

        req.user = decoded;

        next();

        // Om token är ogiltig, returnera 401 Unauthorized
    } catch {

        res.status(401).json({
            message: "Ogiltig token"
        });
    }
};