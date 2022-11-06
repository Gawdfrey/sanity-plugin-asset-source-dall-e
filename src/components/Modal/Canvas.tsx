import { Button, Card } from "@sanity/ui";
import { useRef } from "react";
import { ResetIcon } from "@sanity/icons";

type CanvasProps = {
  url: string;
};
export default function Canvas({ url }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  resize();

  let pos = { x: 0, y: 0 };

  function setPosition(e: any) {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }

  function resize() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  function draw(e: any) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (e.buttons !== 1) return;

    ctx.beginPath();

    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#c03a2b5c";

    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);

    ctx.stroke();
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  return (
    <Card border>
      <Button
        aria-label="Clear canvas"
        icon={ResetIcon}
        tone="critical"
        onClick={clear}
      />
      <canvas
        ref={canvasRef}
        onResize={resize}
        onMouseMove={draw}
        onMouseDown={setPosition}
        onMouseEnter={setPosition}
        id="edit-image-canvas"
        width="600"
        height="300"
        style={{
          backgroundImage: `url(${url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          cursor: "crosshair",
        }}
      />
    </Card>
  );
}
