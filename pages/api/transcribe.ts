import fs from "fs";
import ytdl from "ytdl-core";

const handler = async (req: Request): Promise<Response> => {
  try {
    const { videoUrl, apiKey } = (await req.json()) as {
      videoUrl: string;
      apiKey: string;
    };
    const file = ytdl(videoUrl).pipe(fs.createWriteStream("video.mp4"));

    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "whisper-1",
        file: "rew",
        response_format: "srt",
      }),
    });

    return new Response(JSON.stringify({ stuff: "lol" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
