import { Card } from "@sanity/ui";
import type { ResponseError } from "../types";

type ErrorProps = {
  error: ResponseError;
};

export default function Error({ error }: ErrorProps) {
  return (
    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={1}
      tone="critical"
      aria-label="Error"
    >
      {error.message}
    </Card>
  );
}
