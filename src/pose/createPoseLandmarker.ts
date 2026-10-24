import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";

export async function createPoseLandmarker(): Promise<PoseLandmarker> {
  const files = await FilesetResolver.forVisionTasks("/mediapipe");
  return PoseLandmarker.createFromOptions(files, {
    baseOptions: {
      modelAssetPath: "/pose_landmarker_lite.task",
    },
    runningMode: "VIDEO",
    numPoses: 1,
  });
}
