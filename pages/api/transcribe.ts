import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import fetch from "node-fetch";
import ytdl from "ytdl-core";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { videoUrl, apiKey, format } = req.body;

    const fileStream = ytdl(videoUrl).pipe(fs.createWriteStream("output.mp4"));

    await new Promise((resolve) => {
      fileStream.on("finish", resolve);
    });
    const form = new FormData();
    form.append("file", fs.createReadStream("output.mp4"));
    form.append("model", "whisper-1");
    form.append("response_format", format);

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: form,
      }
    );
    const data = await response.text();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
