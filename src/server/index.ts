import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fetchXeroBalanceSheetData } from './controller/xeroController';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Routes
app.get('/api/balance-sheet', fetchXeroBalanceSheetData);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});