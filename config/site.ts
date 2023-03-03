import { NavItem } from "@/types/nav";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "videoscribe",
  description:
    "Transcribe any Youtube video for free with OpenAI's whisper API",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/sullyo",
    github: "https://github.com/sullyo/videoscribe",
  },
};
