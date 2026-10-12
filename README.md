# ESlint and Zod
In this exercise we add the packages ESlint and Zod to our application.
- ESlint reduces the risk of introducing errors in our code (from within)
- Zod reduces the risk of recieving and processing data that is not in the expected format

## Exercise 1 - Install the packages ESlint and Zod
Set up ESlint with Bash: **npm init @eslint/config@latest** and run it with Bash: **npm run lint**

Install Zod\
Bash: **npm i zod**

Note: Make sure to install the packages for types for both express and pg: Bash: **npm install -D @types/express @types/node @types/pg**\
Otherwise you will start getting type-error messages as soon as you rename the files from .js to .ts\
The rule for **no-console** in eslint.config.ts will warn (see image below) if we forgot to remove the console statements from our code (which should not appear in production code). In development code, however, we need console.log every so often to repair bugs.\
![Task-1](/images/linter-console-warn.png)

## Exercise 2 - Restructuring
- env.ts created and placed in the **src** folder
- db.ts and index.ts both make use of the validated data
- zod schemas moved into their own schemas.ts file
- Removing POSTGRES_USER from the .env file reports now a readable error (see image)
![Task-2](/images/readable-error.png)

## Exercise 3 - Validating POST and PATCH
- New zod schema created for PATCH route
- POST route(s) are now "zod protected"