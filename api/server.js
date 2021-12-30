import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import recordRoutes from './routes/record.js'
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();
// connect to the database with connection string
mongoose.connect(process.env.URL, {useNewUrlParser: true});

// take the connection from mongoose
const db = mongoose.connection;

db.once('open', () => console.log('Connected to database'));

app.use(express.json());

app.use(cors());
app.use('/records', recordRoutes);
app.listen(PORT, () => console.log('Server is listening!'));