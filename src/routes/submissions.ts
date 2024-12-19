import express from 'express';
export const router = express.Router();
import { pool } from "../db"
import { Submission } from '../types';


export async function addSubmission(briefId: number, brandId: number, influencerId: number, text: string, feedback: string) {
    try {
        await pool.query(
            'INSERT INTO submissions (brief_id, brand_id, influencer_id, text, feedback) VALUES ($1, $2, $3, $4, $5)',
            [briefId, brandId, influencerId, text, feedback]
        );
        console.log("Submission saved to database.");
    } catch (dbError) {
        console.error("Error saving submission to database:", dbError);
    }
}

router.get('/submissions', async (req: any, res: any) => {
    try {
        const result = await pool.query('SELECT * FROM submissions');
        const submissions: Submission[] = result.rows;
        res.json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
});


router.get('/submissions/:id', async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM submissions WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        const submission: Submission = result.rows[0];
        res.json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch the submission' });
    }
});

