import express from 'express';
import { calculateDeal } from './deals.controller.js';

const router = express.Router();
router.post('/calculate-deal', calculateDeal);

export default router;