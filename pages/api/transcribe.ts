import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

import { OpenAITranscriber } from "@/lib/openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { videoUrl, apiKey } = req.body;

    const videoInfo = await ytdl.getInfo(videoUrl as string);
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
      quality: "highest",
    });
    const response = await fetch(videoFormat.url);
    const blob = await response.blob();
    const file = new File([blob], `${videoInfo.videoDetails.title}.mp4`, {
      type: "video/mp4",
    });
    const text = await OpenAITranscriber(file, apiKey);

    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
