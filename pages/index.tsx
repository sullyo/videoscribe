import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Layout } from "@/components/layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function IndexPage() {
  const [apiKey, setApiKey] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranscribe = async () => {
    if (!apiKey) {
      alert("Please enter an API key.");
      return;
    }
    setLoading(true);
    const transcriptionResponse = await fetch("/api/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey, videoUrl }),
    });
    setLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Videoscribe</title>
        <meta
          name="description"
          content="Video transcriber for Youtube built with Radix UI and Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid max-w-4xl items-center gap-6 pt-6 pb-8 md:py-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Transcribe any Youtube video for free.
          </h1>
          <p className="text-center text-lg text-slate-700 dark:text-slate-400 sm:text-2xl">
            Open source and free to use. To get started, add your OpenAI key.
          </p>
        </div>
        <Input
          type="text"
          placeholder="Api Key"
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Youtube video URL"
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <Button onClick={() => handleTranscribe()} disabled={loading}>
          Try now
        </Button>
      </section>
    </Layout>
  );
}
