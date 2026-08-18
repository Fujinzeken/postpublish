import { APP_SIGN_IN_URL, APP_SIGN_UP_URL } from "../site-config";

/*
  Every hand-off to the product app goes through this.

  There are nine of them: the header's log in and trial button, both mobile menu
  buttons, the hero, the how it works section, all four pricing plans and the
  closing section. Written out by hand that is nine chances to forget rel, and
  target="_blank" without rel="noopener" hands the opened page a reference back to
  this one through window.opener.

  The new tab is also announced. A link that moves someone to a different tab
  without saying so is disorienting for anyone who cannot see it happen, and
  sr-only is positioned out of flow so it costs no layout inside these flex
  buttons.
*/
export function AppAuthLink({
  to = "sign-up",
  className,
  onClick,
  children,
}: {
  /**
   * Which side of the app to open. Defaults to sign up, which is seven of the
   * eight call sites; only the header's log in asks for the other.
   */
  to?: "sign-up" | "sign-in";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={to === "sign-in" ? APP_SIGN_IN_URL : APP_SIGN_UP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
