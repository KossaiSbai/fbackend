import express from 'express';
import { router as briefRoutes } from './routes/briefs';
import { router as evaluateRoutes } from './routes/evaluate';
import { router as submissionRoutes } from './routes/submissions';
import { router as influencerRoutes } from './routes/influencers';
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())

app.use('/api', briefRoutes);
app.use('/api', evaluateRoutes);
app.use('/api', submissionRoutes);
app.use('/api', influencerRoutes);
const port = 3001;

app.get('/', (req, res) => {
    res.send('Home Route');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});