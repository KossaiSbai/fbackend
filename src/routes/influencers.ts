import express from 'express';
export const router = express.Router();
import { pool } from "../db"
import { Influencer } from '../types';


router.get('/influencers', async (req: any, res: any) => {
    try {
        const result = await pool.query('SELECT * FROM influencers');
        const influencers: Influencer[] = result.rows;
        res.json(influencers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch influencers' });
    }
});


router.get('/influencers/:id', async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM influencers WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Influencer not found' });
        }
        const influencer: Influencer = result.rows[0];
        res.json(influencer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch the influencer' });
    }
});

