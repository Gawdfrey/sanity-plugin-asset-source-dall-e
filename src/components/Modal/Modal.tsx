import React, { useState } from "react";
import { Card, Dialog, Tab, TabList, TabPanel } from "@sanity/ui";
import { AssetSourceComponentProps } from "sanity";
import { SettingsView } from "../Settings";
import GenerateVariations from "./GenerateVariations";
import EditImage from "./EditImage";

export default function Modal(props: AssetSourceComponentProps) {
  const [id, setId] = useState("generate-variants");
  return (
    <Dialog
      width={200}
      header={"DALL·E"}
      id={"dialog"}
      onClose={props.onClose}
      title={"DALL·E"}
    >
      <TabList space={2} padding={3}>
        <Tab
          aria-controls="generate-variants-panel"
          id="generate-variants-tab"
          label="Generate variants"
          onClick={() => setId("generate-variants")}
          selected={id === "generate-variants"}
        />
        <Tab
          aria-controls="edit-image-panel"
          id="edit-image-tab"
          label="Edit image"
          onClick={() => setId("edit-image")}
          selected={id === "edit-image"}
        />
        <Tab
          aria-controls="settings-panel"
          id="settings-tab"
          label="Settings"
          onClick={() => setId("settings")}
          selected={id === "settings"}
        />
      </TabList>
      <TabPanel
        aria-labelledby="generate-variants-tab"
        hidden={id !== "generate-variants"}
        id="generate-variants-panel"
      >
        <Card padding={4}>
          <GenerateVariations {...props} />
        </Card>
      </TabPanel>
      <TabPanel
        aria-labelledby="edit-image-tab"
        hidden={id !== "edit-image"}
        id="edit-image-panel"
      >
        <Card padding={4}>
          <EditImage {...props} />
        </Card>
      </TabPanel>
      <TabPanel
        aria-labelledby="settings-tab"
        hidden={id !== "settings"}
        id="settings-panel"
      >
        <Card padding={4}>
          <SettingsView />
        </Card>
      </TabPanel>
    </Dialog>
  );
}
