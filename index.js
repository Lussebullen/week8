import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(express.json());

const port = process.env.APP_PORT;

app.get("/", (req, res) => {
    res.send("Welcome to the Books API!");
});


const allowedSorts = ["id", "title", "genre", "published_year"];

app.get("/books", async (req, res) => {
  //Filter out the books by genre if the query parameter is provided
  const genre = req.query.genre;
  let query = "SELECT * FROM books";
  const params = [];
  const sort = req.query.sort || "id";

  if (genre) {
    query += " WHERE genre = $1";
    params.push(genre);
  }

  if (!allowedSorts.includes(sort)) {
    return res.status(400).send("Invalid sort parameter");
  }

  try {
    const result = await pool.query(query + ` ORDER BY ${sort}`, params);
    //If the list of books is empty, return a 404 status code with a message
    if (result.rows.length === 0) {
      return res.status(404).send("No books were found that match your criteria");
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint to get a specific book by ID
app.get("/books/:id", async (req, res) => {
    const { id } = req.params; // Get the book ID from the URL parameters
    if (isNaN(id)) {
        return res.status(400).send("Invalid book ID");
    }
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
    // Validate the input data
    if (!title || !genre || !published_year) {
        return res.status(400).send("Missing required fields: title, genre, published_year");
    }
    try {
        const result = await pool.query(
            "INSERT INTO books (title, genre, published_year) VALUES ($1, $2, $3) RETURNING *",
            [title, genre, published_year]
        );
        res.status(201).json(result.rows[0]);
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

app.patch("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, genre, published_year } = req.body;

  // Avoid updating if no fields are provided
  if (title === undefined && genre === undefined && published_year === undefined) {
    return res.status(400).send("No fields provided for update");
  }

  try {
    const result = await pool.query(
      `UPDATE books
       SET title = COALESCE($1, title),
           genre = COALESCE($2, genre),
           published_year = COALESCE($3, published_year)
       WHERE id = $4
       RETURNING *`,
      [title ?? null, genre ?? null, published_year ?? null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});