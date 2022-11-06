import type { FormEvent } from "react";

export enum ImageSize {
  Small = "256x256",
  Medium = "512x512",
  Large = "1024x1024",
}

export type Size = "256x256" | "512x512" | "1024x1024";

export type Format = "url" | "b64_json";
export interface GenerateImage {
  prompt: string;
  numberOfImages?: number;
  size?: Size;
  response_format?: Format;
}

export interface CreateVariation {
  image: Blob;
  n?: number;
  size?: Size;
  response_format?: Format;
}

export interface APIResponse {
  data: {
    b64_json: string;
  }[];
}

export interface DALLEFormEvent extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    imageSize: {
      value: ImageSize;
    };
    numberOfImages: {
      value: number;
    };
    prompt: {
      value: string;
    };
  };
}

export interface ResponseError {
  code: string;
  message: string;
  param: string | null;
  type: string;
}

export const imageSizes = [
  {
    value: ImageSize.Small,
    title: "256x256",
  },
  {
    value: ImageSize.Medium,
    title: "512x512",
  },
  {
    value: ImageSize.Large,
    title: "1024x1024",
  },
];
