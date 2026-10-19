import "./BackButton.css";

type BackButtonProps = {
  onClick: () => void;
};

export function BackButton(props: BackButtonProps) {
  return (
    <button
      type="button"
      className="back-button"
      onClick={props.onClick}
      aria-label="Go back"
    >
      {"<"}
    </button>
  );
}
