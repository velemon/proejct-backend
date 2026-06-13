// server.js - Denna fil startar servern och hanterar API-rutter. Den använder Express.js 
// för att skapa en webbserver och CORS för att tillåta cross-origin requests. 
// Den lyssnar på port 3000 och loggar när servern är igång.
const express = require("express");
const cors = require("cors");

// Skapa en Express-applikation
const app = express();

// Middleware för att hantera CORS och JSON-kroppar
app.use(cors());
app.use(express.json());

// Importera och använd API-rutter för meny och autentisering
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Starta servern och lyssna på port 3000
app.listen(3000, () => {
    console.log("Server running");
});