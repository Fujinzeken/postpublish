/*
  Where the marketing site hands off to the product.

  Auth is not built here. The real app already owns sign in and sign up, so every
  call to action and the header's log in link leave for that app rather than
  resolving to a local route.

  Two destinations, because the app has both. Everything selling the product goes
  to sign up; only the header's log in goes to sign in. Pointing a returning user
  at a signup form is a small tax on the people most likely to convert.

  Named here rather than inline because between them they appear in the header, the
  hero, the how it works section, all four pricing plans and the closing section.
  Changing that in six files is how one of them ends up stale.

  Absolute URLs with the protocol, since these leave the origin. They open in a new
  tab, so the marketing page survives behind the app; see app-auth-link.tsx, which
  owns that behaviour and the rel that has to come with it.
*/
export const APP_SIGN_UP_URL = "https://app.postpublish.pro/auth/sign-up";
export const APP_SIGN_IN_URL = "https://app.postpublish.pro/auth/sign-in";
