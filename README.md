Same as before (2 Docker containers), but with an important addition. We will also use the "pg"-package,
and connect Express to postgreSQL.

There are two containers starting simultaneously using the settings in the compose.yml file.

** 1. The PostgreSQL container **

** 2. The pgadmin container **

Run "docker compose up -d" to start the containers
Run "node index.js" to start the express server
Both must be running.

Exercise 1 - A new route
I created a new route to fetch a single book
Method: GET
Route "/books/id"
Result: If successfull, the reuest returns the specified book data. If not, a friendly message is displayed
![Task-1](/images/get-book-by-id.png)
![Task-1](/images/get-book-by-id-fail-1.png)
![Task-1](/images/get-book-by-id-fail-2.png)
