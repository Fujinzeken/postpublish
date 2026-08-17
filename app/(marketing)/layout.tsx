import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

/*
  The marketing shell: header, content, footer.

  It lives in a route group so the auth pages can opt out of it entirely rather than
  each page assembling its own chrome. Anything public and persuasive belongs in
  here; anything task-shaped belongs in (auth).
*/
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {/* flex-1 so the footer stays put rather than riding up on short viewports,
          since the body is the flex column. */}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
