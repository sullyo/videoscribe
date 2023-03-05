import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

export const config = {
  api: {
    responseLimit: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { videoUrl } = req.body;

    const videoInfo = await ytdl.getInfo(videoUrl as string);
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
      quality: "highest",
    });
    const response = await fetch(videoFormat.url);

    res.writeHead(200, {
      "Content-Type": `audio/mpeg`,
      "Cache-Control": `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    });

    res.end(Buffer.from(await response.arrayBuffer()));
    // res.setHeader("Content-Type", "audio/mpeg");
    // res.setHeader(
    //   "Content-Disposition",
    //   `attachment; filename="${videoInfo.videoDetails.title}.mp3"`
    // );
    // res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

export default handler;
