export { auth as middleware } from "./auth";

export const config = {
  matcher: [
    // Everything except auth routes, the sign-in page, API routes
    // (which check the session themselves) and static assets.
    "/((?!api|signin|_next/static|_next/image|favicon.ico|manifest.json|icons|sw.js).*)",
  ],
};
