"use client";

import { useAuth } from "@/context/auth-context";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

type PermissionGuardProps = {
  permission: string | string[];
  fallbackUrl?: string;
  children: ReactNode;
};

export function PermissionGuard({
  permission,
  fallbackUrl = "/auth/login",
  children,
}: PermissionGuardProps) {
  const { user, isLoading, hasPermission } = useAuth();

  // If still loading auth state, show nothing
  if (isLoading) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!user) {
    redirect(fallbackUrl);
  }

  const hasRequiredPermission = Array.isArray(permission)
    ? permission.some(p => hasPermission(p))
    : hasPermission(permission);

  // If user doesn't have required permission, redirect
  if (!hasRequiredPermission) {
    redirect(fallbackUrl);
  }

  return <>{children}</>;
}