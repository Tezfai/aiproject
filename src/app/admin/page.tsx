import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

async function AdminPage() {
  // Development bypass: when developing locally you can set DEV_BYPASS_ADMIN=true
  // in your .env to load the admin UI without Clerk auth. This is ignored in production.
  const devBypass = process.env.NODE_ENV !== "production" && process.env.DEV_BYPASS_ADMIN === "true";
  if (devBypass) return <AdminDashboardClient />;

  const user = await currentUser();

  // user is not logged in -> send to homepage
  if (!user) redirect("/");

  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.emailAddresses[0]?.emailAddress;

  // user is not the admin -> send to homepage
  if (!adminEmail || userEmail !== adminEmail) redirect("/");

  return <AdminDashboardClient />;
}

export default AdminPage;