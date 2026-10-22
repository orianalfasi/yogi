import "./SessionScreen.css";
import { useEffect, useRef } from "react";
type SessionScreenProps = {
  onExit: () => void;
  onPreviewCompletion: () => void;
  cameraStream: MediaStream;
};

export function SessionScreen(props: SessionScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video === null) {
      return;
    }
    video.srcObject = props.cameraStream;
    return () => {
      video.srcObject = null;
    };
  }, [props.cameraStream]);

  return (
    <main className="session-screen">
      <video
        ref={videoRef}
        className="session-video"
        autoPlay
        muted
        playsInline
      />
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
