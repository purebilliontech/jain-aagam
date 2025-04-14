"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  TruckIcon,
  UserIcon,
  ShoppingBagIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  BarChartIcon
} from "lucide-react"

import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"


interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: string | string[];
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: HomeIcon
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: UserIcon,
    permission: ""
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: UserIcon,
    permission: ""
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: UserIcon,
    permission: ""
  }
];



export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, hasPermission, hasAnyPermission } = useAuth()
  const pathname = usePathname()
  const isAdminPath = pathname.startsWith("/admin")


  // Filter menu items based on user permissions
  const filteredNavItems = navItems.filter((item) => {
    if (!item.permission) return true

    if (Array.isArray(item.permission)) {
      return hasAnyPermission(item.permission)
    }

    return hasPermission(item.permission)
  })

  return (
    <Sidebar className={cn("border-r bg-sky-500", className)} {...props}>
      <SidebarHeader className="flex items-center justify-between border-b p-4">
        <div className="font-bold text-black">
          {(user?.isSeller || isAdminPath) ? "Admin Panel" : "FlyAsh Platform"}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {filteredNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                tooltip={item.title}
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/profile" className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link href="/auth/logout" className="flex items-center gap-2">
                <LogOutIcon className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}