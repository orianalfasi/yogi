import "./SessionScreen.css";

type SessionScreenProps = {
  onExit: () => void;
  onPreviewCompletion: () => void;
};

export function SessionScreen(props: SessionScreenProps) {
  return (
    <main className="session-screen">
      <div className="session-column">
        <h1>Mountain</h1>
        <p className="session-hint">Face the camera.</p>
        <p className="session-correction">Stand tall.</p>
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
      </div>
    </main>
  );
}
