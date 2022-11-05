import { AssetSource, definePlugin } from "sanity";
import GenerateVariantsProvider from "./components/GenerateVariants";
import Icon from "./Icon";

export const dallEImageAssetSource: AssetSource = {
  name: "dall-e",
  title: "DALL·E",
  icon: Icon,
  component: GenerateVariantsProvider,
};

export const dallEAssetSourcePlugin = definePlugin(() => {
  return {
    name: "sanity-plugin-asset-source-dall-e",
    form: {
      image: {
        assetSources: [dallEImageAssetSource],
      },
    },
  };
});
