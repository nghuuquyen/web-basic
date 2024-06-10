import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
};
