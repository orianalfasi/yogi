import { useState } from "react";
import { DoorScreen } from "./ui/DoorScreen.tsx";
import { PracticeScreen } from "./ui/PracticeScreen.tsx";
import PreparationScreen from "./ui/PreparationScreen.tsx";
import { SessionScreen } from "./ui/SessionScreen.tsx";
import {
  CompletionScreen,
  type CompletionRow,
} from "./ui/CompletionScreen.tsx";
import { openFrontCamera, stopCamera } from "./camera/useCamera.ts";
type Screen = "door" | "practice" | "preparation" | "session" | "completion";

const sampleRows: readonly CompletionRow[] = [
  { name: "Mountain", time: "12 seconds", correction: "Knees soft" },
  {
    name: "Warrior II",
    time: "15 seconds",
    correction: "Front knee over the ankle",
  },
  { name: "Tree", time: "10 seconds", correction: "Standing knee straight" },
];

let spokenLine: SpeechSynthesisUtterance | null = null;

export default function App() {
  const [screen, setScreen] = useState<Screen>("door");
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [failureSentence, setFailureSentence] = useState<string | null>(null);

  switch (screen) {
    case "door":
      return <DoorScreen onGuestClick={() => setScreen("practice")} />;
    case "practice":
      return (
        <PracticeScreen
          onBackClick={() => setScreen("door")}
          onStartFlow={() => setScreen("preparation")}
        />
      );
    case "preparation":
      return (
        <PreparationScreen
          onBackClick={() => {
            setFailureSentence(null);
            setScreen("practice");
          }}
          onStartFlow={async () => {
            spokenLine = new SpeechSynthesisUtterance("Mountain hello.");
            window.speechSynthesis.resume();
            window.speechSynthesis.speak(spokenLine);
            try {
              const stream = await openFrontCamera();
              setFailureSentence(null);
              setCameraStream(stream);
              setScreen("session");
            } catch (error) {
              if (error instanceof DOMException) {
                if (error.name === "NotAllowedError") {
                  setFailureSentence(
                    "Camera is blocked. On iPhone, go to Settings > Safari > Camera.",
                  );
                } else if (error.name === "NotFoundError") {
                  setFailureSentence("No camera was found.");
                } else {
                  setFailureSentence("The camera could not be opened.");
                }
              }
            }
          }}
          failureSentence={failureSentence}
        />
      );
    case "session":
      if (!cameraStream) {
        return null;
      }
      return (
        <SessionScreen
          onExit={() => {
            stopCamera(cameraStream);
            setCameraStream(null);
            setScreen("practice");
          }}
          onPreviewCompletion={() => {
            stopCamera(cameraStream);
            setCameraStream(null);
            setScreen("completion");
          }}
          cameraStream={cameraStream}
        />
      );
    case "completion":
      return (
        <CompletionScreen
          rows={sampleRows}
          onPracticeAgain={() => setScreen("preparation")}
          onDone={() => setScreen("practice")}
        />
      );
  }
}
