# Express Todolist
This is a simple todolist application which uses Express.js, Pug as the templating engine, and Postgres for the database.

## Set up
```
git clone https://github.com/ayaanqui/express-todolist.git
```
Now, we will install the dependencies
```
npm install
```

### Setting up database
1. Create a new Postgres database named `expressTodoList`
1. Now, create a file named `dbuser.json` inside `[project_root]/database/`
    - Add the following to `dbuser.json`: `{ "username": "", "password": "" }` and replace the empty quotes with the appropriate username and password values (*Note: `dbuser.json` is never staged*)

The database should now be set up.

## Run server
```
npm start
```