import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const { Pool } = pg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books");
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Endpoint to get a specific book by ID
app.get("/books/:id", async (req, res) => {
    const { id } = req.params; // Get the book ID from the URL parameters
    try {
        const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Book not found");
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post("/books", async (req, res) => {
    const { title, genre, published_year } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO books (title, genre, published_year) VALUES ($1, $2, $3) RETURNING *",
            [title, genre, published_year]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put("/books/:id", async (req, res) => {
    const { id } = req.params; // Get the book ID from the URL parameters
    const { title, genre, published_year } = req.body; // Get the new book data from the request body
    try {
        const result = await pool.query(
            "UPDATE books SET title = $1, genre = $2, published_year = $3 WHERE id = $4 RETURNING *",
            [title, genre, published_year, id] // Replace the placeholders with the actual values
        );
        if (result.rows.length === 0) {
            return res.status(404).send("Book not found");
        }
        res.json(result.rows[0]); // Return the updated book data
    } catch (err) {
        res.status(500).send(err.message);
    }
});



app.delete("/books/:id", async (req, res) => {
    const { id } = req.params; // Get the book ID from the URL parameters
    try {
        const result = await pool.query(
            "DELETE FROM books WHERE id = $1 RETURNING *",
            [id]
        );  
        if (result.rows.length === 0) {
            return res.status(404).send("Book not found");
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});