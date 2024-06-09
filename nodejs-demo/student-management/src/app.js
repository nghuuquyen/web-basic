const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes');

dotenv.config();

const app = express();

app.set('view engine', 'ejs'); // Set view engine
app.set('views', path.join(__dirname, 'views')); // Set views directory

app.use(express.static('src/public')); // Serve static files from src/public

app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

app.use('/', routes); // Register all application routes

module.exports = app;
