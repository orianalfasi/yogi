import { useState } from "react";
import { flows } from "../poses/index.ts";
import poseDrawing from "../assets/yoga-pose.svg";
import "./PracticeScreen.css";

export function PracticeScreen() {
  const [openName, setOpenName] = useState<string | null>(null);

  function toggleFlow(name: string) {
    setOpenName((current) => (current === name ? null : name));
  }

  return (
    <main className="practice-screen">
      <div className="practice-column">
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
            const expanded = available && openName === flow.name;

            if (available) {
              return (
                <article
                  key={flow.name}
                  className={
                    expanded
                      ? "practice-flow practice-flow-open"
                      : "practice-flow"
                  }
                  onClick={
                    expanded
                      ? undefined
                      : () => {
                          setOpenName(flow.name);
                        }
                  }
                >
                  <div className="practice-flow-head">
                    <h3>
                      <button
                        type="button"
                        className="practice-flow-toggle"
                        aria-expanded={expanded}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFlow(flow.name);
                        }}
                      >
                        {flow.name}
                      </button>
                    </h3>
                  </div>
                  <p className="practice-flow-description">
                    {flow.description}
                  </p>
                  {expanded ? (
                    <button type="button" className="practice-start">
                      {"Start flow >"}
                    </button>
                  ) : null}
                </article>
              );
            }

            return (
              <article
                key={flow.name}
                className="practice-flow practice-flow-later"
              >
                <div className="practice-flow-head">
                  <h3>{flow.name}</h3>
                  <span className="practice-soon">Coming soon</span>
                </div>
                <p className="practice-flow-description">{flow.description}</p>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
