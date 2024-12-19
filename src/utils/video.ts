import { YoutubeTranscript } from "youtube-transcript";
import { google } from "googleapis";
const youtube = google.youtube({ version: "v3", auth: process.env.YOUTUBE_API_KEY });

async function getTranscriptYoutubeVideo(videoId: string) {
    var transcript_obj = await YoutubeTranscript.fetchTranscript(videoId);
    const text = transcript_obj.map((t) => t.text).join(' ');
    return text
}

type YouTubeVideoData = {
    description: string;
    tags: string[];
    comments: any[];
    transcript: string;
};



export async function fetchYouTubeVideoData(videoId: string): Promise<YouTubeVideoData | undefined> {
    try {

        let transcript = await getTranscriptYoutubeVideo(videoId);

        const videoResponse = await youtube.videos.list({
            part: ["snippet"],
            id: [videoId],
        });

        if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
            console.log("Video not found.");
            return;
        }

        const { description, tags } = videoResponse.data.items[0].snippet!!;
        if (!description || !tags) {
            console.log("Description or tags not found.");
            return;
        }

        console.log("Description:", description);
        console.log("Tags:", tags);

        const commentsResponse = await youtube.commentThreads.list({
            part: ["snippet"],
            videoId: videoId,
            maxResults: 10,
            order: "relevance",
        });

        console.log("\nTop Comments:");
        let comments = commentsResponse.data.items?.map(comment => comment.snippet?.topLevelComment?.snippet?.textDisplay) ?? [];
        return { description, tags, comments, transcript };
    } catch (error) {
        console.error("Error fetching video data:", error);
    }
}
