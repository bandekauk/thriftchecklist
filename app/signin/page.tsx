import { redirect } from "next/navigation";
import { auth, signIn } from "../../auth";

export const dynamic = "force-dynamic";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user?.email) redirect("/");

  const { error } = await searchParams;

  async function doSignIn() {
    "use server";
    await signIn("google", { redirectTo: "/" });
  }

  return (
    <main className="signin">
      <h1>Shift Log</h1>
      <p>Opening and closing checklists for the shop.</p>

      {error === "AccessDenied" && (
        <div className="notice">
          <p style={{ color: "inherit", margin: 0 }}>
            That Google account isn&rsquo;t on the staff list. Sign in with the
            address Adam added, or ask him to add this one.
          </p>
        </div>
      )}

      <form action={doSignIn}>
        <button type="submit">Sign in with Google</button>
      </form>
    </main>
  );
}
