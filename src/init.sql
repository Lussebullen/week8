CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    genre VARCHAR(50),
    published_year INT
);


CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- on delete cascade means that if a book is deleted, the corresponding author_id in the authors table will also be deleted.
-- This is useful for maintaining referential integrity between the two tables.
-- But the relationship is a 1-to-many relationship, where one author can have many books, but each book can only have one author. 
-- So the foreign key will be created in the books table using the ALTER TABLE statement below. 
ALTER TABLE books ADD COLUMN author_id INT REFERENCES authors(id) ON DELETE RESTRICT;

-- Random starting data for books table (WITHOUT authors relationship). The rest will be added through the API.
-- NOTE: Only run this prior to exercise 6.
INSERT INTO books (title, genre, published_year) VALUES
('1984', 'Dystopian Fiction', 1948),
('Animal Farm', 'Political Satire', 1945),
('Brave New World', 'Dystopian Fiction', 1932),
('The Great Gatsby', 'American Literature', 1925),
('To Kill a Mockingbird', 'Fiction', 1960),
('Pride and Prejudice', 'Romance', 1813),
('The Catcher in the Rye', 'Fiction', 1951),
('The Hobbit', 'Fantasy', 1937),
('Fahrenheit 451', 'Dystopian Fiction', 1953),
('Moby Dick', 'Adventure Fiction', 1851);

-- For exercise 6 we will add some authors to the authors table, and then update the books table to include the author_id for each book.
-- I also added an "Unknown" author to the authors table, so that we can use that as a default author for any books that don't have an author yet.
INSERT INTO authors (name) VALUES
('Unknown'),
('George Orwell'),
('Aldous Huxley'),
('F. Scott Fitzgerald'),
('Harper Lee'),
('Jane Austen'),
('J.D. Salinger'),
('J.R.R. Tolkien'),
('Ray Bradbury'),
('Herman Melville');

UPDATE books SET author_id = 2 WHERE title IN ('1984', 'Animal Farm');
UPDATE books SET author_id = 3 WHERE title = 'Brave New World';
UPDATE books SET author_id = 4 WHERE title = 'The Great Gatsby';
UPDATE books SET author_id = 5 WHERE title = 'To Kill a Mockingbird';
UPDATE books SET author_id = 6 WHERE title = 'Pride and Prejudice';
UPDATE books SET author_id = 7 WHERE title = 'The Catcher in the Rye';
UPDATE books SET author_id = 8 WHERE title = 'The Hobbit';
UPDATE books SET author_id = 9 WHERE title = 'Fahrenheit 451';
UPDATE books SET author_id = 10 WHERE title = 'Moby Dick';