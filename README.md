# Connect Express to our Docker containers
Same as before (2 Docker containers), but with an important addition. We will also use the "pg"-package,
and connect Express to postgreSQL.

There are two containers starting simultaneously using the settings in the compose.yml file.

** 1. The PostgreSQL container **

** 2. The pgadmin container **

Run "docker compose up -d" to start the containers
Run "node index.js" to start the express server
Both must be running.

## Exercise 1 - A new route
I created a new route to fetch a single book
Method: GET
Route "/books/id"
Result: If successfull, the reuest returns the specified book data. If not, a friendly message is displayed
![Task-1](/images/get-book-by-id.png)
![Task-1](/images/get-book-by-id-fail-1.png)
![Task-1](/images/get-book-by-id-fail-2.png)

## Exercise 2 - Adding more percise error messages. 
In our case, if the book id cannot be processes ("abc"), then a better message will be displayed insted of a "500: Internal server errror" 
![Task-2](/images/get-book-by-id-fail-3.png)
When creating a book, we can also add a friendly message if anything inportant is missing.
![Task-2](/images/create-missing-info.png)

## Exercise 3 - Cleaning up
- The pool was moved to it's own db.js file
- A new variable was added to the *.env file poining at port 3000. It is referenced by index.js
- The routes were modified slightly so that localhost:3000/books fetches all the books and localhost:3000 welcomes the user
![Task-2](/images/welcome.png)