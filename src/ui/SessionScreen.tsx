import "./SessionScreen.css";
import { useEffect, useRef, useState } from "react";
import { createPoseLandmarker } from "../pose/createPoseLandmarker.ts";
import type { PoseLandmarker } from "@mediapipe/tasks-vision";
import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { watchPose } from "../pose/watchPose.ts";
import { drawSkeleton } from "./drawSkeleton.ts";
type SessionScreenProps = {
  onExit: () => void;
  onPreviewCompletion: () => void;
  cameraStream: MediaStream;
};

export function SessionScreen(props: SessionScreenProps) {
  const [poseLandmarker, setPoseLandmarker] = useState<
    "loading" | "ready" | "failed"
  >("loading");
  const videoRef = useRef<HTMLVideoElement>(null);
  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
  const landmarksRef = useRef<NormalizedLandmark[]>([]);
  const dotReadoutRef = useRef<HTMLParagraphElement>(null);
  const renderCount = useRef(0);
  const renderReadoutRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    renderCount.current += 1;
    const readout = renderReadoutRef.current;
    if (readout !== null) {
      readout.textContent = `Renders: ${renderCount.current}`;
    }
  });

  useEffect(() => {
    if (poseLandmarker !== "ready") {
      return;
    }
    const landmarker = poseLandmarkerRef.current;
    const video = videoRef.current;
    if (landmarker === null || video === null) {
      return;
    }

    return watchPose(video, landmarker, landmarksRef, (frame) => {
      const readout = dotReadoutRef.current;
      const canvas = canvasRef.current;
      const nose = frame[0];

      if (canvas === null) {
        return;
      }

      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }

      const ctx = canvas.getContext("2d");

      if (ctx === null) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawSkeleton(
        ctx,
        frame,
        { width: video.videoWidth, height: video.videoHeight },
        { width: canvasWidth, height: canvasHeight },
      );

      if (import.meta.env.DEV && readout !== null && nose !== undefined) {
        readout.textContent = nose.x.toFixed(2);
      }
    });
  }, [poseLandmarker]);

  useEffect(() => {
    let cancelled = false;

    createPoseLandmarker()
      .then((landmarker) => {
        if (cancelled) {
          landmarker.close();
          return;
        }
        poseLandmarkerRef.current = landmarker;
        setPoseLandmarker("ready");
      })
      .catch(() => {
        if (!cancelled) {
          setPoseLandmarker("failed");
        }
      });

    return () => {
      cancelled = true;
      poseLandmarkerRef.current?.close();
      poseLandmarkerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video === null) {
      return;
    }
    video.srcObject = props.cameraStream;
    return () => {
      video.srcObject = null;
    };
  }, [props.cameraStream]);

  return (
    <main className="session-screen">
      <video
        ref={videoRef}
        className="session-video"
        autoPlay
        muted
        playsInline
      />
      <canvas ref={canvasRef} className="session-canvas" />
      <div className="session-column">
        <h1>Mountain</h1>
        <p className="session-hint">Face the camera.</p>
        <p className="session-correction">Stand tall.</p>
        {poseLandmarker === "loading" ? (
          <p className="session-hint">Loading the pose model…</p>
        ) : null}
        {poseLandmarker === "failed" ? (
          <p className="session-hint">The pose model could not be loaded.</p>
        ) : null}
        <button type="button" className="session-exit" onClick={props.onExit}>
          Exit
        </button>
        {import.meta.env.DEV ? (
          <button
            type="button"
            className="session-preview"
            onClick={props.onPreviewCompletion}
          >
            Preview completion
          </button>
        ) : null}
        {import.meta.env.DEV ? (
          <p className="session-hint" ref={renderReadoutRef} />
        ) : null}
        {import.meta.env.DEV ? (
          <p className="session-hint" ref={dotReadoutRef} />
        ) : null}
      </div>
    </main>
  );
}
