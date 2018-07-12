const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/players';