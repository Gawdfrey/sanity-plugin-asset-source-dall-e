/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import type { CompletePromptResponse, EditPromptResponse } from "./types";

const axiosClient = axios.create({
  baseURL: "https://api.openai.com/v1",
});

export function completePrompt(
  apiKey: string,
  prompt: string
): Promise<CompletePromptResponse> {
  return axiosClient
    .post(
      "/completions",
      {
        model: "text-davinci-002",
        prompt,
        max_tokens: 100,
        temperature: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => error.response.data);
}

export function editPrompt(
  apiKey: string,
  input: string,
  instruction: string
): Promise<EditPromptResponse> {
  return axiosClient
    .post(
      "/edits",
      {
        model: "text-davinci-002",
        input,
        instruction,
        temperature: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => error.response.data);
}
