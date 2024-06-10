const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
};
