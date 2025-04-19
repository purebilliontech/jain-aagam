"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "./actions";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      router.push("/auth/login");
    };

    handleLogout();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Logging out...</h1>
        <p className="mt-2 text-muted-foreground">Please wait while we log you out.</p>
      </div>
    </div>
  );
}