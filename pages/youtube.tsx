import { useState } from "react";
import Head from "next/head";
import { apiKeyAtom } from "@/atoms";
import { toast } from "@/hooks/use-toast";
import { useAtom } from "jotai";

import FileSelect from "@/components/file-select";
import { Icons } from "@/components/icons";
import { Layout } from "@/components/layout";
import { RobotLoader } from "@/components/transcription-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";

export default function YoutubePage() {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [format, setFileFormat] = useState("srt");
  const [file, setFile] = useState<File>();
  const [downloadHref, setDownloadHref] = useState("");
  const [downLoadFile, setDownloadFile] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState("");
  const [apiKey] = useAtom(apiKeyAtom);

  const handleYoutubeDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl, apiKey, format }),
      });

      const { transcript } = await response.json();
      const file = new Blob([transcript], { type: "text/plain" });
      setDownloadFile(file);
      setDownloadHref(URL.createObjectURL(file));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Transcribing ",
        variant: "destructive",
        description:
          "OpenAI had an issue transcribing your file. Either try again or try a different file.",
        action: (
          <ToastAction
            altText="Try uploading again"
            onClick={() => window.location.reload()}
          >
            Try again
          </ToastAction>
        ),
      });
      console.error(error.message);
    }
  };

  if (apiKey.length < 51) {
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
              Please enter your OpenAI API Key
            </h1>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Videoscribe</title>
        <meta name="description" content="Upload and transcribe your files" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid max-w-4xl items-center gap-6 pt-6 pb-8 md:py-24">
        {loading && (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-center text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl">
              Transcribing this youtube video...
            </h1>
            <p className="text-lg text-gray-400 dark:text-gray-300 sm:text-xl">
              This may take a few minutes. Do not close this tab.
            </p>
            <RobotLoader />
          </div>
        )}
        {downLoadFile && (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-center text-xl font-extrabold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
              Done!
            </h1>
            <a
              href={downloadHref}
              download={`videoscribe-yt-dl.${
                format === "text" ? "txt" : format
              }`}
              className="flex items-center justify-center text-center text-lg text-slate-700 hover:underline dark:text-slate-400 sm:text-xl"
            >
              Download your transcript here
              <Icons.download className="sm:h-4.5 sm:w-4.5 ml-2 h-4 w-4 text-slate-700 dark:text-slate-400" />
            </a>
            <Button
              className="mx-auto mt-6 w-full sm:w-1/2"
              onClick={() => window.location.reload()}
            >
              Transcribe another video
            </Button>
          </div>
        )}
        {!loading && !downLoadFile && (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-center text-xl font-extrabold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
                Choose a youtube video & transcribe it
              </h1>
            </div>
            <div className=" flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Paste Youtube Link"
                className="md:col-span-3"
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <div className="flex flex-row justify-center gap-2">
                <Button
                  className="w-full"
                  onClick={() => handleYoutubeDownload()}
                >
                  Start
                </Button>
                <FileSelect format={format} setFileFormat={setFileFormat} />
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
