// server.js - Denna fil startar servern och hanterar API-rutter. Den använder Express.js s

// Ladda miljövariabler från .env-filen
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Skapa en Express-applikation
const app = express();

// Middleware för att hantera CORS och JSON-kroppar
app.use(cors());
app.use(express.json());

// Importera och använd API-rutter för meny och autentisering
app.use("/api/auth", require("./routes/authRoutes"));

// Importera och använd API-rutter för meny och autentisering
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Starta servern och lyssna på port 3000
app.listen(3000, () => {
    console.log("Server running");
});