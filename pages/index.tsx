/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ytdl from "ytdl-core";

import { siteConfig } from "@/config/site";
import { Layout } from "@/components/layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function IndexPage() {
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
      <section className="container grid max-w-4xl items-center gap-6 pt-12 pb-8 sm:gap-8 md:py-36">
        <div className="flex flex-col gap-6 sm:gap-8 ">
          <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Transcribe any video for free.
          </h1>
          <p className="mx-auto max-w-sm text-center text-lg text-slate-700 dark:text-slate-400 sm:text-xl md:max-w-xl">
            Turn videos into text in minutes. Whether it's your own files or a
            YouTube video, we've got you covered.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href={siteConfig.links.video} className={buttonVariants()}>
            Upload File
          </Link>
          <Link
            href={siteConfig.links.youtube}
            className={buttonVariants({ variant: "outline" })}
          >
            Youtube Link
          </Link>
        </div>
      </section>
    </Layout>
  );
}
