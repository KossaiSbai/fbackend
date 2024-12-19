import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { fetchYouTubeVideoData } from "../utils/video";
import { getBriefById } from "./briefs";
import { getEvaluationPrompt } from "../utils/evaluation";
import { Brief } from "../types";
import { addSubmission } from "./submissions";

export const router = express.Router();
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/evaluate', async (req: any, res: any) => {
    const { submission, briefId } = req.body;

    const youtubeUrlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = submission.match(youtubeUrlPattern);
    let videoData;

    if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        videoData = await fetchYouTubeVideoData(videoId);
        console.log("Video Data:", videoData);
        if (!videoData) {
            console.error("Error fetching video data.");
            res.status(500).send("Failed to evaluate submission.");
        }
    }

    let { description, tags, comments, transcript } = videoData ?? { description: "", tags: [], comments: [], transcript: "" };

    try {

        const brief: Brief | undefined = await getBriefById(briefId);
        if (!brief) {
            res.status(404).send("Brief not found.");
            return;
        }

        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");


        let evaluationPrompt = getEvaluationPrompt(brief.content, submission, transcript, description, tags, comments);

        const stream = await openai.chat.completions.create({
            model: "gpt-4o",
            stream: true,
            temperature: 0.2,
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: evaluationPrompt,
                },
            ],
        });

        let fullContent = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            fullContent += content;
            res.write(content);
        }
        console.log("Full Content:", fullContent);
        console.log("Brief:", brief);

        await addSubmission(briefId, brief.brand_id, 1, submission, fullContent);

        res.end();
    } catch (error) {
        console.error("Error streaming OpenAI response:", error);
        res.status(500).send("Failed to evaluate submission.");
    }
});

export default router;
