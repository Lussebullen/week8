CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    genre VARCHAR(50),
    published_year INT,
);

-- Random starting data for testing. The rest will be added through the API.
INSERT INTO books (title, genre, published_year) VALUES
('1984', 'Dystopian Fiction', 1948),
('Animal Farm', 'Political Satire', 1945),
('Brave New World', 'Dystopian Fiction', 1932),
('The Great Gatsby', 'American Literature', 1925),
('To Kill a Mockingbird', 'Fiction', 1960);