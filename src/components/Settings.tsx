import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Card, Stack, Text, TextInput, Button } from "@sanity/ui";
import { useSecrets } from "@sanity/studio-secrets";

export const namespace = "sanity-plugin-asset-source-dall-e";

const pluginConfigKeys = [
  {
    key: "apiKey",
    title: "Your secret API key",
  },
];

export type SettingsKey = {
  key: string;
  title: string;
  description?: string;
};

export const SettingsView = () => {
  const { loading, secrets, storeSecrets } =
    useSecrets<Record<string, any>>(namespace);
  const [newSecrets, setNewSecrets] = React.useState<Record<string, any>>({});

  useEffect(() => {
    if (secrets) {
      setNewSecrets(secrets);
    }
  }, [secrets]);

  const onClick = useCallback(
    () => storeSecrets(newSecrets),
    [storeSecrets, newSecrets]
  );

  return (
    <Stack space={3}>
      {pluginConfigKeys.map((keyEntry) => (
        <SettingsKeyEntry
          key={keyEntry.key}
          keyEntry={keyEntry}
          loading={loading}
          newSecrets={newSecrets}
          setNewSecrets={setNewSecrets}
        />
      ))}
      <div>
        <Button
          disabled={loading}
          onClick={onClick}
          text={loading ? "Loading…" : "Save"}
          tone="primary"
        />
      </div>
    </Stack>
  );
};

interface SettingsKeyProps {
  loading: boolean;
  newSecrets: Record<string, any>;
  setNewSecrets: Dispatch<SetStateAction<Record<string, any>>>;
  keyEntry: SettingsKey;
}

function SettingsKeyEntry({
  loading,
  setNewSecrets,
  newSecrets,
  keyEntry,
}: SettingsKeyProps) {
  const onChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const target = event.currentTarget;
      const { value } = target;
      setNewSecrets((prevState) => {
        const newState = { ...prevState };
        newState[keyEntry.key] = value;
        return newState;
      });
    },
    [keyEntry, setNewSecrets]
  );

  return (
    <Stack space={2}>
      <Text as="label" weight="semibold" size={1}>
        {keyEntry.title}
      </Text>
      {keyEntry.description && (
        <Text muted size={1}>
          {keyEntry.description}
        </Text>
      )}
      <TextInput
        disabled={loading}
        onChange={onChange}
        value={newSecrets[keyEntry.key] ?? ""}
      />
    </Stack>
  );
}
