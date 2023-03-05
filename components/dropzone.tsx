import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";

interface DropzoneProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

const Dropzone = ({ setFiles, files }: DropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "video/mp4": [".mp4", ".m4a"],
      "video/mpeg": [".mpeg"],
      "audio/mpeg": [".mp3"],
      "audio/webm": [".webm"],
      "audio/wav": [".wav"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "mx-auto flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:hover:border-slate-500  dark:hover:bg-gray-900 ",
        {
          "bg-white": !isDragActive,
        }
      )}
    >
      <input {...getInputProps()} />
      <Icons.upload className="mb-3 h-10 w-10 " />
      <Button className="my-4">Upload files</Button>
      <p className="mb-2 text-gray-500 dark:text-gray-400">or drag and drop</p>
    </div>
  );
};

export default Dropzone;
