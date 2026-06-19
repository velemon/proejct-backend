// menuRoutes.js - Denna fil hanterar alla API-rutter relaterade till maträtter (menu)
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const db = require("../models/db");

// GET alla maträtter
router.get("/", (req, res) => {

    // Utför SQL-fråga för att hämta alla maträtter
    db.query(
        "SELECT * FROM menu",
        (err, results) => {

            // Om det uppstår ett fel, returnera 500 Internal Server Error
            if (err) {
                return res.status(500).json(err);
            }

            // Skicka tillbaka resultaten i JSON-format
            res.json(results);
        }
    );
});

// GET en maträtt baserat på ID
router.get("/:id", (req, res) => {

    // Hämta ID från URL-parametrar
    const id = req.params.id;

    // Utför SQL-fråga för att hämta maträtten med det angivna ID:t
    db.query(
        "SELECT * FROM menu WHERE id = ?",
        [id],
        (err, results) => {

            // Om det uppstår ett fel, returnera 500 Internal Server Error
            if (err) {
                return res.status(500).json(err);
            }

            // Om ingen maträtt hittas, returnera 404 Not Found
            if (results.length === 0) {
                return res.status(404).json({
                    message: "Maträtten hittades inte"
                });
            }

            // Skicka tillbaka den första (och enda) maträtten i resultaten
            res.json(results[0]);
        }
    );
});

// CREATE maträtt
router.post("/", (req, res) => {

    // Hämta nödvändiga fält från request-body
    const {
        name,
        description,
        marinade,
        price
    } = req.body;

    // Kontrollera att alla obligatoriska fält är ifyllda
    if (!name || !marinade || !price) {
        // Om något obligatoriskt fält saknas, returnera 400 Bad Request
        return res.status(400).json({
            message: "Alla obligatoriska fält måste fyllas i"
        });
    }

    // Utför SQL-fråga för att skapa en ny maträtt i databasen
    db.query(
        "INSERT INTO menu (name, description, marinade, price) VALUES (?, ?, ?, ?)",
        [
            name,
            description,
            marinade,
            price
        ],
        // Callback-funktion som hanterar resultatet av SQL-frågan
        (err, result) => {

            // Om det uppstår ett fel, returnera 500 Internal Server Error
            if (err) {
                return res.status(500).json(err);
            }

            // Skicka tillbaka ett framgångsmeddelande med status 201 Created
            res.status(201).json({
                message: "Maträtt skapad"
            });
        }
    );
});

// UPDATE maträtt
router.put("/:id", (req, res) => {

    // Hämta ID från URL-parametrar
    const id = req.params.id;

    // Hämta nödvändiga fält från request-body
    const {
        name,
        description,
        marinade,
        price
    } = req.body;

    // Kontrollera att alla obligatoriska fält är ifyllda
    db.query(
        `UPDATE menu
         SET name = ?,
             description = ?,
             marinade = ?,
             price = ?
         WHERE id = ?`,
        [
            name,
            description,
            marinade,
            price,
            id
        ],
        // Callback-funktion som hanterar resultatet av SQL-frågan
        (err, result) => {

            // Om det uppstår ett fel, returnera 500 Internal Server Error
            if (err) {
                return res.status(500).json(err);
            }

            // Skicka tillbaka ett framgångsmeddelande
            res.json({
                message: "Maträtt uppdaterad"
            });
        }
    );
});

// DELETE maträtt
router.delete("/:id", (req, res) => {

    // Hämta ID från URL-parametrar
    const id = req.params.id;

    // Utför SQL-fråga för att radera maträtten med det angivna ID:t
    db.query(
        "DELETE FROM menu WHERE id = ?",
        [id],
        (err, result) => {

            // Om det uppstår ett fel, returnera 500 Internal Server Error
            if (err) {
                return res.status(500).json(err);
            }

            // Skicka tillbaka ett framgångsmeddelande
            res.json({
                message: "Maträtt borttagen"
            });
        }
    );
});

// Exportera router
module.exports = router;