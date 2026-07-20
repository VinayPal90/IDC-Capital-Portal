import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dealRoutes from './src/modules/deals/deals.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', dealRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`IDC Capital Server running on port ${PORT}`);
});