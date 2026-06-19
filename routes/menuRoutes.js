// menuRoutes.js - Denna fil hanterar alla API-rutter relaterade till maträtter (menu)

const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const db = require("../models/db");

// GET alla maträtter
router.get("/", (req, res) => {

    // SQL-fråga för att hämta alla maträtter från databasen
    db.query(
        "SELECT * FROM menu",
        (err, results) => {

            // Om det uppstår ett fel under SQL-frågan, returnera 500 Internal Server Error med felmeddelandet
            if (err) {
                return res.status(500).json(err);
            }

            // Skicka tillbaka resultaten som JSON i svaret
            res.json(results);
        }
    );
});

// GET en maträtt baserat på ID
router.get("/:id", (req, res) => {

    // Hämta ID från URL-parametrarna
    const id = req.params.id;

    // SQL-fråga för att hämta en specifik maträtt baserat på ID
    db.query(
        "SELECT * FROM menu WHERE id = ?",
        [id],
        // Callback-funktion som hanterar resultatet av SQL-frågan
        (err, results) => {

            // Om det uppstår ett fel under SQL-frågan, returnera 500 Internal Server Error med felmeddelandet
            if (err) {
                return res.status(500).json(err);
            }

            // Om inga maträtter hittas med det angivna ID:t, returnera 404 Not Found med ett felmeddelande
            if (results.length === 0) {
                return res.status(404).json({
                    message: "Maträtten hittades inte"
                });
            }

            // Skicka tillbaka den första (och enda) maträtten som JSON i svaret
            res.json(results[0]);
        }
    );
});

// CREATE maträtt (SKYDDAD MED JWT)
router.post("/", auth, (req, res) => {

    // Hämta nödvändiga fält från request-body
    const {
        name,
        description,
        marinade,
        price
    } = req.body;

    // Kontrollera att alla obligatoriska fält är ifyllda
    if (!name || !marinade || !price) {
        return res.status(400).json({
            message: "Alla obligatoriska fält måste fyllas i"
        });
    }

    // SQL-fråga för att skapa en ny maträtt i databasen
    db.query(
        "INSERT INTO menu (name, description, marinade, price) VALUES (?, ?, ?, ?)",
        [name, description, marinade, price],
        (err) => {

            // Om det uppstår ett fel under SQL-frågan, returnera 500 Internal Server Error med felmeddelandet
            if (err) {
                return res.status(500).json(err);
            }

            // Om maträtten skapas framgångsrikt, returnera 201 Created med ett framgångsmeddelande i svaret
            res.status(201).json({
                message: "Maträtt skapad"
            });
        }
    );
});

// UPDATE maträtt (SKYDDAD MED JWT)
router.put("/:id", auth, (req, res) => {

    // Hämta ID från URL-parametrarna
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
        [name, description, marinade, price, id],
        // Callback-funktion som hanterar resultatet av SQL-frågan
        (err) => {

            // Om det uppstår ett fel under SQL-frågan, returnera 500 Internal Server Error med felmeddelandet
            if (err) {
                return res.status(500).json(err);
            }

            // Om maträtten uppdateras framgångsrikt, returnera ett framgångsmeddelande i svaret
            res.json({
                message: "Maträtt uppdaterad"
            });
        }
    );
});

// DELETE maträtt (SKYDDAD MED JWT)
router.delete("/:id", auth, (req, res) => {

    // Hämta ID från URL-parametrarna
    const id = req.params.id;

    // SQL-fråga för att ta bort en maträtt baserat på ID
    db.query(
        "DELETE FROM menu WHERE id = ?",
        [id],
        // Callback-funktion som hanterar resultatet av SQL-frågan
        (err) => {

            // Om det uppstår ett fel under SQL-frågan, returnera 500 Internal Server Error med felmeddelandet
            if (err) {
                return res.status(500).json(err);
            }

            // Om maträtten tas bort framgångsrikt, returnera ett framgångsmeddelande i svaret
            res.json({
                message: "Maträtt borttagen"
            });
        }
    );
});

// Exportera router
module.exports = router;