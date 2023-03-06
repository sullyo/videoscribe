import { randomUUID } from "crypto";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import fetch from "node-fetch";
import ytdl from "ytdl-core";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const outputFile = `/tmp/${randomUUID()}.mp4`;
    const { videoUrl, apiKey, format } = req.body;
    try {
      const fileStream = ytdl(videoUrl, {
        quality: "140",
      }).pipe(fs.createWriteStream(outputFile));

      await new Promise((resolve) => {
        fileStream.on("finish", resolve);
      });
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Unable to download video: ${err.message}`);
    }
    try {
      const form = new FormData();
      form.append("file", fs.createReadStream(outputFile));
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

      res.status(200).json({ transcript: data });
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      return res
        .status(400)
        .send(`Issue with transcribing video from openai: ${err.message}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
