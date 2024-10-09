import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiClient = axios.create({
  baseURL: "https://judge.codershub.live", // Base URL for all requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const languages = new Map([
  ["cpp", "76"],
  ["c", "75"],
  ["java", "62"],
  ["javascript", "63"],
  ["typescript", "74"],
  ["rust", "73"],
  ["python", "71"],
  ["go", "60"],
]);

export const convertToBase64 = (code: string) => {
  const convertedCode = code;
  return convertedCode;
};

export const parseAns = (outputString: string) => {
  try {
    return JSON.parse(outputString) as {
      stdout: string | null;
      time: string | null;
      memory: string | null;
      stderr: string | null;
      token: string;
      compile_output: string | null;
      message: string | null;
      status: {
        id: number;
        description: string;
      };
    };
  } catch (error) {
    console.error("Failed to parse output string:", error);
    return null;
  }
};
