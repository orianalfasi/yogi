import "./CompletionScreen.css";

export type CompletionRow = {
  name: string;
  time: string;
  correction: string;
};

type CompletionScreenProps = {
  rows: readonly CompletionRow[];
  onPracticeAgain: () => void;
  onDone: () => void;
};

export function CompletionScreen(props: CompletionScreenProps) {
  return (
    <main className="completion-screen">
      <div className="completion-column">
        <h1>Well done</h1>
        <ul className="completion-rows">
          {props.rows.map((row) => (
            <li key={row.name}>
              <h2>{row.name}</h2>
              <p>
                {row.time} · {row.correction}
              </p>
            </li>
          ))}
        </ul>
        <p className="completion-note">This practice is not saved.</p>
        <button
          type="button"
          className="completion-again"
          onClick={props.onPracticeAgain}
        >
          Practice again
        </button>
        <button type="button" className="completion-done" onClick={props.onDone}>
          Done
        </button>
      </div>
    </main>
  );
}
