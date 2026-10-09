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
We create a new route to fetch a single book
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
![Task-3](/images/welcome.png)

## Exercise 4 - Filter and sort
In this part we change the route for GET books to support additional parameters. For example:
- books/genre=drama or books/sort=published_year, or both together books/genre=drama&sort=published_year. To reflect the changes made I added more books to the database of a certain genre (Fiction).

The next image shows a list of books sorted by the publishing year 
![Task-4](/images/sorted-by-published.png)

And here we can see the list of books, both sorted by the publishing year and filtered to only contain the specific genre (Fiction)
![Task-4](/images/sorted-by-published-and-filtered.png)

## Exercise 5 - PATCH
In this part we implement a PATCH route that only updates the fields that are sent with the request (and not those that are missing).
If Anything is missing, the table row affected will preserve the old data, avoiding NULL values to polute our information.

The next image shows a PATCH operation wher only 2 (of 3) parameters are sent (and modified). "genre" is not present in the mix so it won't be affected by our change.
![Task-5](/images/patch.png)

## Exercise 6 - Add authors table
In this part we 
- add an authors table connected to the books table with a 1-to-many relationship.
- create a new route GET /authors to fetch all authors.
- create a new route POST /authors to create a new author.
- create a new route GET /authors/:id/books to fetch all the books a specific author wrote.

The next image shows books wrote by a specific author (where the author id is specified in the URL).
![Task-6](/images/author-found.png)

But we can also have cases where the author did not publish anything yet, or the book has an unknown origin (i.e ancient documents).
![Task-6](/images/author-unknown.png)

Instead of throwing the error code 23503 (foreign key violation) we display a friendlt message:
![Task-6](/images/author-not-exist.png)