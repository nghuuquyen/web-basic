# Install

```
npm install
```

# Installing MySQL Database

You could use XAMPP to install MySQL database. After installing XAMPP, you could access MySQL database using phpMyAdmin.

# Setup Environment

Create `.env` like `.env.example` and set the values.
```
PORT=3000
DATABASE_HOST=<Fill with your database host>
DATABASE_PORT=<Fill with your database port>
DATABASE_USER=<Fill with your database user>
DATABASE_PASSWORD=<Fill with your database password>
DATABASE_NAME=<Fill with your database name>
```

Fill the values with your database configuration.

# Initial Database

Create database
```
npx sequelize-cli db:create
```

Run database migration to create tables
```
npx sequelize-cli db:migrate
```

Seed data
```
npx sequelize-cli db:seed:all
```


# Run

```
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.


# Reset Database

To reset the database, you could run the following command.

```
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```