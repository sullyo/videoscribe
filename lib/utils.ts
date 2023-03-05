import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function stripExtension(filename: string): string {
  return filename.split(".").slice(0, -1).join(".");
}
