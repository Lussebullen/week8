There are two containers starting simultaneously using the settings in the compose.yml file.

** 1. The PostgreSQL container **

** 2. The pgadmin container **

Run "docker compose up -d" to start the containers

To create the database for the exercises you need to downloaded the file clubdata.sql and:
- manually create a new database named "exercises"
- Right-click on the exercises database, select the Query tool and Copy -> Paste the contents of the file clubdata.sql in the query window. OBS! Remove from the top of the file the unnecessary/errorneous rows such as "CREATE DATABASE exercises;" or "\c exercises"
- Run the SQL query to create and populate the tables with data.
- Test the database with a simple query (see the picture): ![Task 1-3](images/db-test.png)

The file cd.sql contains the solution for all the SQL problems found here: https://pgexercises.com/questions/basic/ 