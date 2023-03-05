import { Configuration, OpenAIApi } from "openai";

export const OpenAITranscriber = async (file: File, apiKey: string) => {
  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const model = "whisper-1";
  const response_format = "srt";
  const transcription = await openai.createTranscription(
    file,
    model,
    response_format
  );

  if (transcription.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }
  return transcription.data.text;
};
