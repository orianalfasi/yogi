import butterfly from "../assets/frame-12.png";
import "./DoorScreen.css";

type AccountAction = "sign-up" | "sign-in";

function AccountButton({
  action,
  children,
}: {
  action: AccountAction;
  children: string;
}) {
  return (
    <button
      type="button"
      className={
        action === "sign-up"
          ? "door-account door-account-primary"
          : "door-account door-account-secondary"
      }
      aria-disabled="true"
      aria-describedby="door-accounts-note"
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
type DoorScreenProps = {
  onGuestClick: () => void;
};
export function DoorScreen(props: DoorScreenProps) {
  return (
    <main className="door-screen">
      <div className="door-column">
        <div className="door-brand">
          <div className="door-logo">
            <svg className="logo-svg" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="30" fill="var(--yogi-circle)" />
            </svg>
            <img className="logo-butterfly" src={butterfly} alt="" />
          </div>
          <h1>Yogi</h1>
        </div>
        <div className="door-gap" />
        <div className="door-actions">
          <div className="door-accounts">
            <AccountButton action="sign-up">Sign up</AccountButton>
            <AccountButton action="sign-in">Sign in</AccountButton>
          </div>
          <p id="door-accounts-note" className="door-accounts-note">
            Sign up and sign in are not available yet.
          </p>
          <button
            type="button"
            className="door-guest"
            onClick={props.onGuestClick}
          >
            Continue as a guest
          </button>
        </div>
      </div>
    </main>
  );
}
