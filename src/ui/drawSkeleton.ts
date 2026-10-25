import { PoseLandmarker } from "@mediapipe/tasks-vision";
import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { mapLandmark } from "../pose/mapLandmark.ts";

export function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  frame: readonly NormalizedLandmark[],
  camera: { width: number; height: number },
  canvas: { width: number; height: number },
): void {
  ctx.strokeStyle = "#f4efe8";
  ctx.fillStyle = "#f4efe8";
  ctx.lineWidth = 3;

  for (const connection of PoseLandmarker.POSE_CONNECTIONS) {
    const start = frame[connection.start];
    const end = frame[connection.end];

    if (
      start === undefined ||
      end === undefined ||
      (start.visibility ?? 0) < 0.5 ||
      (end.visibility ?? 0) < 0.5
    ) {
      continue;
    }

    const startDot = mapLandmark(start, camera, canvas, true);
    const endDot = mapLandmark(end, camera, canvas, true);

    ctx.beginPath();
    ctx.moveTo(startDot.x, startDot.y);
    ctx.lineTo(endDot.x, endDot.y);
    ctx.stroke();
  }

  for (const landmark of frame) {
    if ((landmark.visibility ?? 0) < 0.5) {
      continue;
    }

    const dot = mapLandmark(landmark, camera, canvas, true);

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}
