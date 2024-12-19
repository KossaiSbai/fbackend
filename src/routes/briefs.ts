import express from 'express';
export const router = express.Router();
import { pool } from "../db"
import { Brief } from '../types';

export const getBriefById = async (id: string): Promise<Brief | undefined> => {
    try {
        const result = await pool.query('SELECT * FROM briefs WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            console.error('Brief not found');
            return undefined;
        }
        return result.rows[0]
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

router.get('/briefs', async (req: any, res: any) => {
    try {
        const result = await pool.query('SELECT * FROM briefs');
        const briefs: Brief[] = result.rows;
        res.json(briefs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch briefs' });
    }
});

router.get('/briefs/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const brief: Brief | undefined = await getBriefById(id);
    if (!brief) {
        res.status(500).json(brief);
    } else {
        res.json(brief);
    }
});

router.post('/briefs', async (req: any, res: any) => {
    const { name, content, brand_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO briefs (name, content, brand_id) VALUES ($1, $2, $3) RETURNING *',
            [name, content, brand_id]
        );
        const brief: Brief = result.rows[0];
        res.status(201).json(brief);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create brief' });
    }
});
