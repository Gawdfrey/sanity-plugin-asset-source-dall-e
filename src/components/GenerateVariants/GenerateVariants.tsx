import React from "react";
import { DALLEFormEvent, ImageSize, ResponseError } from "../../types";
import { Dialog, Select, Button, Stack, Label, Box, Grid } from "@sanity/ui";
import { useMutation } from "@tanstack/react-query";
import { createVariation } from "../../client";
import { AssetSourceComponentProps } from "sanity";
import { useSecrets } from "@sanity/studio-secrets";
import { namespace } from ".";
import urlToStream from "../../utils/urlToStream";
import ErrorComponent from "../Error";

const imageSizes = [
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

export default function GenerateVariants({
  onClose,
  selectedAssets,
  onSelect,
}: AssetSourceComponentProps) {
  const { secrets } = useSecrets<{
    apiKey: string;
  }>(namespace);
  let image: Blob = new Blob();
  const url = `${selectedAssets[0].url}?fm=png`;
  urlToStream(url).then((data) => {
    image = data;
  });
  const { data, mutate, isLoading, isError, error } = useMutation(
    ["variants"],
    async ({ numberOfImages, imageSize }: any) => {
      if (!secrets) return;
      let response;
      try {
        response = await createVariation(
          secrets.apiKey,
          image,
          numberOfImages,
          imageSize
        );
      } catch (error: any) {
        throw new Error(
          error.response?.data?.error?.message || "Unknown error"
        );
      }
      return response;
    }
  );

  async function handleSubmit(event: DALLEFormEvent) {
    event.preventDefault();
    const imageSize = event.target.imageSize?.value as ImageSize;
    const numberOfImages = (event.target.numberOfImages?.value as number) || 1;
    mutate({ imageSize, numberOfImages });
  }

  async function handleUse(b64_json: string) {
    onSelect([
      {
        value: `data:image/png;base64,${b64_json}`,
        kind: "base64",
      },
    ]);
  }

  return (
    <Dialog
      width={200}
      header={"Generate variants"}
      id={"dialog"}
      onClose={onClose}
      title={"Generate variants"}
    >
      <Box padding={[3, 3, 4, 5]}>
        <Stack space={5}>
          <form onSubmit={handleSubmit}>
            <Stack space={5}>
              <Stack space={2}>
                <Label>Image Size</Label>
                <Select
                  fontSize={[2, 2, 3, 4]}
                  padding={[3, 3, 4]}
                  space={[3, 3, 4]}
                  name={"imageSize"}
                >
                  {imageSizes.map((size) => (
                    <option key={size.title} value={size.value}>
                      {size.title}
                    </option>
                  ))}
                </Select>
              </Stack>
              <Stack space={2}>
                <Label>Number of returned images</Label>
                <Select
                  fontSize={[2, 2, 3, 4]}
                  padding={[3, 3, 4]}
                  space={[3, 3, 4]}
                  name={"numberOfImages"}
                >
                  {[...Array(10).keys()].map((size) => {
                    const value = size + 1;
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </Select>
              </Stack>
              <Button
                fontSize={[2, 2, 3]}
                padding={[3, 3, 4]}
                text="Generate variations"
                tone="primary"
                type="submit"
                loading={isLoading}
              />
            </Stack>
          </form>
          <Label>Generated images</Label>
          {isError ? (
            <ErrorComponent error={error as ResponseError} />
          ) : (
            <Stack>
              <Grid columns={[2, 3, 4, 6]} gap={[1, 1, 2, 3]} padding={4}>
                {data?.data?.map(({ b64_json }, index) => (
                  <Stack key={index} space={2}>
                    <img
                      src={`data:image/png;base64,${b64_json}`}
                      style={{ width: "100%" }}
                    />
                    <Button
                      fontSize={[2, 2, 3]}
                      text="Use"
                      type="button"
                      tone="positive"
                      onClick={() => handleUse(b64_json)}
                    />
                  </Stack>
                ))}
              </Grid>
            </Stack>
          )}
        </Stack>
      </Box>
    </Dialog>
  );
}
