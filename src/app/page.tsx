import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const userRole = cookieStore.get("user_role")?.value;

  if (!token) {
    redirect("/login");
  }

  // Redirect based on user role
  if (userRole === "ADMIN") {
    redirect("/dashboard");
  } else {
    redirect("/user/dashboard");
  }
}
