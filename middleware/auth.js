// auth.js - Denna fil innehåller middleware-funktionen som används för att autentisera användare.
// Den kontrollerar om en JWT-token finns i request-headern och verifierar den.
// Om token är giltig, läggs den avkodade informationen till i request-objektet och nästa middleware-funktion anropas.
// Om token saknas eller är ogiltig, returneras en 401 Unauthorized-status med ett felmeddelande.

const jwt = require("jsonwebtoken");

// Hemlig nyckel för att signera och verifiera JWT
const SECRET_KEY = "kfc_secret_key";

// Middleware-funktion för att autentisera användare
module.exports = (req, res, next) => {

    // Hämta token från request-headern
    const authHeader = req.headers.authorization;

    // Kontrollera att headern finns och har rätt format
    if (!authHeader) {
        return res.status(401).json({
            message: "Ingen token"
        });
    }

    // Format: "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    // Om token saknas efter split
    if (!token) {
        return res.status(401).json({
            message: "Token saknas"
        });
    }

    // Försök att verifiera token och avkoda den
    try {

        const decoded = jwt.verify(
            token,
            SECRET_KEY
        );

        // Lägg till användarinformation i request-objektet
        req.user = decoded;

        // Gå vidare till nästa middleware/route
        next();

    } catch (err) {

        // Om token är ogiltig eller utgången
        return res.status(401).json({
            message: "Ogiltig eller utgången token"
        });
    }
};