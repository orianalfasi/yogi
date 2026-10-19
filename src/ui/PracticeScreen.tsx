import { flows } from "../poses/index.ts";
import poseDrawing from "../assets/yoga-pose.svg";
import { BackButton } from "./BackButton.tsx";
import "./PracticeScreen.css";

type PracticeScreenProps = {
  onBackClick: () => void;
  onStartFlow: () => void;
};

export function PracticeScreen(props: PracticeScreenProps) {
  return (
    <main className="practice-screen">
      <div className="practice-column">
        <BackButton onClick={props.onBackClick} />

        <header className="practice-intro">
          <div className="practice-copy">
            <h1>
              Welcome to
              <br />
              your practice
            </h1>
            <p>Take a moment for yourself.</p>
          </div>

          <div className="practice-pose-frame">
            <img
              className="practice-pose"
              src={poseDrawing}
              alt="A person in a yoga pose"
            />
          </div>
        </header>

        <section
          className="practice-flows"
          aria-labelledby="practice-flows-heading"
        >
          <h2 id="practice-flows-heading">Choose your flow</h2>

          {flows.map((flow) => {
            const available = flow.poses.length > 0;

            return (
              <article
                key={flow.name}
                className={
                  available
                    ? "practice-flow"
                    : "practice-flow practice-flow-later"
                }
              >
                <div className="practice-flow-content">
                  <h3>{flow.name}</h3>
                  <p className="practice-flow-description">
                    {flow.description}
                  </p>
                </div>

                {available ? (
                  <button
                    type="button"
                    className="practice-start"
                    onClick={props.onStartFlow}
                    aria-label={`Start ${flow.name} flow`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <span className="practice-soon">Coming soon</span>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
