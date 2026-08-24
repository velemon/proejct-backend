# REST API – Seoul Crunch

Detta repository innehåller REST-webbtjänsten för **Seoul Crunch**, ett fiktivt företag som säljer Korean Fried Chicken med olika marinader.

Webbtjänsten är byggd med **Node.js, Express och MariaDB/MySQL** och används som datakälla för projektets publika webbplats. Ett separat administrationsgränssnitt används av personalen för att hantera menyn.

API:et stödjer CRUD och använder **JWT** för att skydda administrativa funktioner.

Projektet består av tre separata delar:

REST-webbtjänst:
Node.js + Express + MariaDB/MySQL + JWT.

Administrationsgränssnitt:
Används av personal för att logga in och administrera menyn.

Publik webbplats:
Hämtar menydata från REST API:et och presenterar den för besökare.

Den publika webbplatsen kan läsa menydata utan inloggning, medan ändringar kräver administratörens JWT-token.

---

## Teknik

- Node.js
- Express
- MariaDB/MySQL
- MySQL2
- JWT
- JavaScript
- Git

---

## Länk

API:et körs lokalt på:

http://localhost:3000

Meny:

http://localhost:3000/api/menu

Inloggning:

http://localhost:3000/api/auth/login

---

## Installation & databas

API:et använder en MariaDB-databas. Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Starta sedan servern med npm run dev.

Menyinformationen lagras i MariaDB/MySQL-databasen:

kfc_project

---

## Användning

| **Metod** | **Ändpunkt** | **Beskrivning** |
| **JWT** | ------------- | --------------------------------------------------------------------------------- |
| GET | /api/menu | Hämtar alla maträtter poster. | Nej |
| GET | /api/menu/:ID | Hämtar en maträtt med angivet ID. | Nej |
| POST | /api/menu | Skapar en maträtt | Ja |
| PUT | /api/menu/:ID | Uppdaterar en maträtt | Ja |
| DELETE | /api/menu/:ID | Raderar en maträtt | Ja |
| DELETE | /api/auth/login | Loggar in administratör | Nej |

Menydata returneras/skickas som JSON med följande struktur:

```
{
    "id": 1,
    "name": "Original Korean Chicken",
    "description": "Krispig koreansk friterad kyckling",
    "marinade": "Soy Garlic",
    "price": 129
}
```
---

## JWT

Administrativa funktioner är skyddade med JWT.
Efter inloggning returneras en token som skickas med vid POST, PUT och DELETE:

Authorization: Bearer DIN_TOKEN

Om en giltig token saknas nekas den skyddade förfrågan.

--- 