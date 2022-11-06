import { useSecrets } from "@sanity/studio-secrets";
import { Button, Card, Label, Select, Stack, TextInput } from "@sanity/ui";
import { useMutation } from "@tanstack/react-query";
import { AssetSourceComponentProps } from "sanity";
import { editImage } from "../../client";
import { DALLEFormEvent, ImageSize, imageSizes } from "../../types";
import urlToStream from "../../utils/urlToStream";
import { namespace } from "../Settings";
import Canvas from "./Canvas";

export default function EditImage({
  selectedAssets,
  onSelect,
}: AssetSourceComponentProps) {
  const { secrets } = useSecrets<{
    apiKey: string;
  }>(namespace);
  let image = new Blob();
  let mask = new Blob();
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
        response = await editImage(
          secrets.apiKey,
          image,
          mask,
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
    const prompt = event.target.prompt?.value as string;
    mutate({ imageSize, numberOfImages, prompt });
  }

  return (
    <Stack space={5}>
      <form onSubmit={handleSubmit}>
        <Stack space={5}>
          <Stack space={2}>
            <Label>
              Draw on the image to select the parts you want to edit
            </Label>
            <Canvas url={url} />
          </Stack>
          <Stack space={2}>
            <Label>Prompt</Label>
            <TextInput name="prompt" />
          </Stack>
          <Stack space={2}>
            <Label>Image Size</Label>
            <Select name={"imageSize"}>
              {imageSizes.map((size) => (
                <option key={size.title} value={size.value}>
                  {size.title}
                </option>
              ))}
            </Select>
          </Stack>
          <Stack space={2}>
            <Label>Number of returned images</Label>
            <Select name={"numberOfImages"}>
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
          <div>
            <Button
              text="Generate variations"
              tone="primary"
              type="submit"
              loading={isLoading}
            />
          </div>
        </Stack>
      </form>
    </Stack>
  );
}
