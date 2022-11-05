import React, { useEffect, useState } from "react";
import { ThemeProvider, studioTheme } from "@sanity/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AssetSourceComponentProps } from "sanity";
import { SettingsView, useSecrets } from "@sanity/studio-secrets";
import GenerateVariants from "./GenerateVariants";

export const namespace = "sanity-plugin-asset-source-dall-e";

const pluginConfigKeys = [
  {
    key: "apiKey",
    title: "Your secret API key",
  },
];

export default function GenerateVariantsProvider(
  props: AssetSourceComponentProps
) {
  const { secrets } = useSecrets(namespace);
  const [showSettings, setShowSettings] = useState(true);

  useEffect(() => {
    if (secrets) {
      setShowSettings(false);
    }
  }, [secrets]);

  if (showSettings) {
    return (
      <SettingsView
        namespace={namespace}
        keys={pluginConfigKeys}
        onClose={() => {
          setShowSettings(false);
        }}
        title={"Input secrets"}
      />
    );
  }

  return (
    <ThemeProvider theme={studioTheme}>
      <QueryClientProvider client={new QueryClient()}>
        <GenerateVariants {...props} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
