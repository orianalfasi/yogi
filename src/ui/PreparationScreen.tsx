import { BackButton } from "./BackButton.tsx";
import "./PreparationScreen.css";

type PreparationScreenProps = {
  onBackClick: () => void;
  onStartFlow: () => void;
  failureSentence: string | null;
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

        {props.failureSentence && (
          <div className="preparation-failure" role="alert">
            <span className="preparation-failure-icon" aria-hidden="true">
              !
            </span>

            <div className="preparation-failure-content">
              <p className="preparation-failure-title">Camera unavailable</p>
              <p className="preparation-failure-message">
                {props.failureSentence}
              </p>
            </div>
          </div>
        )}

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
