import type {
  NormalizedLandmark,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";

export function watchPose(
  video: HTMLVideoElement,
  landmarker: PoseLandmarker,
  landmarks: { current: NormalizedLandmark[] },
  onFrame: (frame: readonly NormalizedLandmark[]) => void,
): () => void {
  let frameId = 0;
  let lastTime = 0;

  const tick = (now: number) => {
    frameId = requestAnimationFrame(tick);
    if (now - lastTime < 1000 / 15) {
      return;
    }
    lastTime = now;

    if (video.readyState < 2) {
      return;
    }

    const result = landmarker.detectForVideo(video, now);
    landmarks.current = result.landmarks[0] ?? [];
    onFrame(landmarks.current);
  };

  frameId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frameId);
}
