import { useState } from "react";
import Head from "next/head";

import Dropzone from "@/components/dropzone";
import { Icons } from "@/components/icons";
import { Layout } from "@/components/layout";
import { RobotLoader } from "@/components/transcription-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function YoutubePage() {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [downloadHref, setDownloadHref] = useState("");
  const [downLoadFile, setDownloadFile] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState("");

  return (
    <Layout>
      <Head>
        <title>Videoscribe</title>
        <meta name="description" content="Upload and transcribe your files" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid max-w-4xl items-center gap-6 pt-6 pb-8 md:py-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-xl font-extrabold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
            Choose a youtube video & transcribe it
          </h1>
        </div>
        <div className="grid gap-2 md:grid-cols-6">
          <Input
            type="text"
            placeholder="Paste Youtube Link"
            className="md:col-span-5"
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <Button className="md:col-span-1">Start</Button>
        </div>
      </section>
    </Layout>
  );
}
