/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import type {
  APIResponse,
  GenerateImage,
  Size,
  Format,
  CreateVariation,
} from "./types";

const axiosClient = axios.create({
  baseURL: "https://api.openai.com/v1/images",
});

export async function generateImage(
  apiKey: string,
  prompt: string,
  numberOfImages = 1,
  size: Size = "256x256",
  response_format: Format = "url"
): Promise<APIResponse> {
  const { data } = await axiosClient
    .post(
      "/generations",
      <GenerateImage>{
        prompt,
        numberOfImages,
        size,
        response_format,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    .catch((error) => error.response.data);
  return data;
}

export async function createVariation(
  apiKey: string,
  image: Blob,
  n = 1,
  size: Size = "256x256",
  response_format: Format = "b64_json"
): Promise<APIResponse> {
  const { data } = await axiosClient.post(
    "/variations",
    <CreateVariation>{
      image,
      n,
      response_format,
      size,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

export async function editImage(
  apiKey: string,
  image: Blob,
  mask: Blob,
  prompt: string,
  n = 1,
  size: Size = "256x256",
  response_format: Format = "b64_json"
): Promise<APIResponse> {
  const { data } = await axiosClient.post(
    "/edits",
    <CreateVariation>{
      image,
      mask,
      prompt,
      n,
      response_format,
      size,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}
