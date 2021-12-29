import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();
// connect to the database with connection string
mongoose.connect(process.env.URL, {useNewUrlParser: true});

// take the connection from mongoose
const db = mongoose.connection;

db.once('open', () => console.log('Connected to database'));

app.use(express.json());
app.listen(PORT, () => console.log('Server is listening!'));