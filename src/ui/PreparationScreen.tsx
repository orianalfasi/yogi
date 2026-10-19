import { BackButton } from "./BackButton.tsx";
import "./PreparationScreen.css";

type PreparationScreenProps = {
  onBackClick: () => void;
  onStartFlow: () => void;
};

export default function PreparationScreen(props: PreparationScreenProps) {
  return (
    <main className="preparation-screen">
      <div className="preparation-column">
        <BackButton onClick={props.onBackClick} />
        <header className="preparation-copy">
          <h1>Before you start</h1>
        </header>
        <ol className="preparation-steps">
          <li>Find good light.</li>
          <li>Keep your whole body in the frame.</li>
          <li>Turn the volume up.</li>
        </ol>
        <button
          type="button"
          className="preparation-start"
          onClick={props.onStartFlow}
        >
          Start
        </button>
      </div>
    </main>
  );
}
