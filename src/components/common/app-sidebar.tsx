"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
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
  SidebarRail,
} from "@/components/ui/sidebar"


interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: string | string[];
  subItems?: NavItem[];
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
    permission: "",
    subItems: [
      {
        title: "All Blogs",
        href: "/admin/blogs",
        icon: UserIcon,
        permission: ""
      },
      {
        title: "Categories",
        href: "/admin/blog/category",
        icon: UserIcon,
        permission: ""
      }
    ]
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


      <SidebarMenu>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem />
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>


      <SidebarContent>
        <SidebarMenu>
          {filteredNavItems.map((item) => (
            <React.Fragment key={item.href}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                  tooltip={item.title}
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>
                </SidebarMenuButton>
                {item.subItems && (
                  <SidebarMenu>
                    {item.subItems.map((subItem) => (
                      <SidebarMenuItem key={subItem.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === subItem.href || pathname.startsWith(`${subItem.href}/`)}
                          tooltip={subItem.title}
                        >
                          <Link href={subItem.href} className="flex items-center gap-2 pl-6">
                            <subItem.icon className="h-5 w-5" />
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                )}
              </SidebarMenuItem>
            </React.Fragment>
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