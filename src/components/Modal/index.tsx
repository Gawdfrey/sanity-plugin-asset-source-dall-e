import React from "react";
import { ThemeProvider, studioTheme } from "@sanity/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AssetSourceComponentProps } from "sanity";
import Modal from "./Modal";

export default function ModalWrapper(props: AssetSourceComponentProps) {
  return (
    <ThemeProvider theme={studioTheme}>
      <QueryClientProvider client={new QueryClient()}>
        <Modal {...props} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
