import { AssetSource, definePlugin } from "sanity";
import ModalWrapper from "./components/Modal";
import Icon from "./Icon";

export const dallEImageAssetSource: AssetSource = {
  name: "dall-e",
  title: "DALL·E",
  icon: Icon,
  component: ModalWrapper,
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
