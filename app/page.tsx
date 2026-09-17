import { redirect } from "next/navigation";
import { auth, signOut } from "../auth";
import Checklist from "../components/Checklist";
import { defaultType } from "../lib/time";
import { nameOf } from "../lib/name";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.email) redirect("/signin");

  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/signin" });
  }

  const firstName = session.user.name
    ? session.user.name.split(" ")[0]
    : nameOf(session.user.email).split(" ")[0];

  return (
    <Checklist
      initialType={defaultType()}
      firstName={firstName}
      signOutAction={doSignOut}
    />
  );
}
