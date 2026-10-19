import { useState } from "react";
import { DoorScreen } from "./ui/DoorScreen.tsx";
import { PracticeScreen } from "./ui/PracticeScreen.tsx";
import PreparationScreen from "./ui/PreparationScreen.tsx";
import { SessionScreen } from "./ui/SessionScreen.tsx";
import {
  CompletionScreen,
  type CompletionRow,
} from "./ui/CompletionScreen.tsx";

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

export default function App() {
  const [screen, setScreen] = useState<Screen>("door");

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
          onBackClick={() => setScreen("practice")}
          onStartFlow={() => setScreen("session")}
        />
      );
    case "session":
      return (
        <SessionScreen
          onExit={() => setScreen("practice")}
          onPreviewCompletion={() => setScreen("completion")}
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
