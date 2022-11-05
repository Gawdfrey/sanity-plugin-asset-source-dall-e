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

export interface GenerateImageResponse {
  created: number;
  data: {
    url: string;
  }[];
}

export interface CreateVariation {
  image: Blob;
  n?: number;
  size?: Size;
  response_format?: Format;
}

export interface CreateVariationResponse {
  data: {
    b64_json: string;
  }[];
}
[];

export interface DALLEFormEvent extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    imageSize: {
      value: ImageSize;
    };
    numberOfImages: {
      value: number;
    };
  };
}

export interface ResponseError {
  code: string;
  message: string;
  param: string | null;
  type: string;
}
