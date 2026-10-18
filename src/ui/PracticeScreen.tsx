import { useLayoutEffect, useRef, useState } from "react";
import { flows } from "../poses/index.ts";
import poseDrawing from "../assets/yoga-pose.svg";
import "./PracticeScreen.css";

const REVEAL_MS = 400;
const STAGGER_MS = 45;

export function PracticeScreen() {
  const [openName, setOpenName] = useState<string | null>(null);
  const flowsRef = useRef<HTMLElement>(null);

  function toggleFlow(name: string) {
    setOpenName((current) => (current === name ? null : name));
  }

  useLayoutEffect(() => {
    const root = flowsRef.current;
    if (root === null || typeof IntersectionObserver === "undefined") {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cards = [...root.querySelectorAll<HTMLElement>(".practice-flow")];
    const waiting = cards.filter((card) => {
      const rect = card.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      return !inView;
    });

    for (const card of waiting) {
      card.classList.add("practice-flow-wait");
    }

    if (waiting.length === 0) {
      return;
    }

    const timers = new Set<number>();

    const finish = (card: HTMLElement) => {
      card.style.transitionDelay = "";
      card.classList.remove("practice-flow-wait", "practice-flow-reveal");
    };

    const observer = new IntersectionObserver((entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting);
      entering.forEach((entry, index) => {
        const card = entry.target;
        if (!(card instanceof HTMLElement)) {
          return;
        }
        const delay = index * STAGGER_MS;
        card.style.transitionDelay = `${delay}ms`;
        card.classList.add("practice-flow-reveal");
        observer.unobserve(card);
        const timer = window.setTimeout(
          () => {
            finish(card);
            timers.delete(timer);
          },
          REVEAL_MS + delay + 80,
        );
        timers.add(timer);
        const onEnd = (event: TransitionEvent) => {
          if (event.target !== card) {
            return;
          }
          window.clearTimeout(timer);
          timers.delete(timer);
          card.removeEventListener("transitionend", onEnd);
          finish(card);
        };
        card.addEventListener("transitionend", onEnd);
      });
    });

    for (const card of waiting) {
      observer.observe(card);
    }

    return () => {
      observer.disconnect();
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
      for (const card of waiting) {
        finish(card);
      }
    };
  }, []);

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
          ref={flowsRef}
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
