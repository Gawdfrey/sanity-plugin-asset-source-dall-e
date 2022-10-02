/* eslint-disable no-console */
import { createPlugin } from "sanity";

interface gpt3PluginConfig {
  apiKey: string;
}

export const gpt3Plugin = createPlugin<gpt3PluginConfig>((config) => {
  console.log(config);
  return {
    name: "sanity-plugin-gpt3",
  };
});
