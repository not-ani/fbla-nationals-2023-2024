import "server-only";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export async function check() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/sign-in");
  }
  if (!user.isAdmin) {
    redirect("/unauthorized");
  }
}
