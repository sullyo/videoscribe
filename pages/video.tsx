import { useState } from "react";
import Head from "next/head";
import { apiKeyAtom } from "@/atoms";
import { useToast } from "@/hooks/use-toast";
import { useAtom } from "jotai";

import { stripExtension } from "@/lib/utils";
import Dropzone from "@/components/dropzone";
import FileSelect from "@/components/file-select";
import { Icons } from "@/components/icons";
import { Layout } from "@/components/layout";
import { RobotLoader } from "@/components/transcription-loader";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

export default function VideoPage() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFileFormat] = useState("srt");
  const [downloadHref, setDownloadHref] = useState("srt");
  const [downLoadFile, setDownloadFile] = useState<Blob | null>(null);

  const { toast } = useToast();

  const [apiKey] = useAtom(apiKeyAtom);

  const handleTranscribe = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("model", "whisper-1");
      formData.append("response_format", format);

      const res = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          method: "POST",
          body: formData,
        }
      );

      const transcript = await res.text();

      setLoading(false);

      const file = new Blob([transcript], { type: "text/plain" });
      setDownloadFile(file);
      setDownloadHref(URL.createObjectURL(file));
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
              Transcribing your file...
            </h1>
            <p className="text-lg text-gray-400 dark:text-gray-300 sm:text-xl">
              Do not close this tab.
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
              download={`${stripExtension(files[0].name)}.${
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
              Transcribe another file
            </Button>
          </div>
        )}
        {!loading && !downLoadFile && (
          <>
            {files.length > 0 && (
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-center text-lg font-extrabold leading-tight tracking-tight sm:text-xl md:text-2xl lg:text-3xl">
                  File to transcribe:
                </h1>
                {files.map((file) => (
                  <p className=" sm:text-lg" key={file.name}>
                    {file.name}
                  </p>
                ))}
              </div>
            )}
            {files.length === 0 ? (
              <>
                <div className="flex flex-col gap-2">
                  <h1 className="text-center text-xl font-extrabold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
                    Upload a file and transcribe it.
                  </h1>
                  <p className="text-center text-sm text-slate-700 dark:text-slate-400 sm:text-lg">
                    Formats supported: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
                  </p>
                </div>
                <Dropzone setFiles={setFiles} files={files} />
              </>
            ) : (
              <div className=" mx-auto flex gap-2">
                <Button className="w-full" onClick={() => handleTranscribe()}>
                  Transcribe file
                </Button>
                <FileSelect format={format} setFileFormat={setFileFormat} />
              </div>
            )}
          </>
        )}
      </section>
    </Layout>
  );
}
