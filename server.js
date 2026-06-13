// server.js - Denna fil startar servern och hanterar API-rutter. Den använder Express.js 
// för att skapa en webbserver och CORS för att tillåta cross-origin requests. 
// Den lyssnar på port 3000 och loggar när servern är igång.
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(3000, () => {
    console.log("Server running");
});