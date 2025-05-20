"use client"

import * as React from "react"
import {
  Book,
  Users,
  Image,
  FileText,
  Video,
  Layout,
  Home,
  Globe,
  LogOut,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Users Management",
      url: "/admin/users",
      icon: Users,
      permissions: ["view:user"],
    },
    {
      title: "Media",
      url: "/admin/media",
      icon: Image,
      permissions: ["view:media"],
    },
    {
      title: "English Aagam",
      url: "/admin/english-agam",
      icon: Book,
      permissions: ["view:english-agam"],
    },
    {
      title: "Blog",
      url: "#",
      icon: FileText,
      permissions: ["view:blog-tag", "view:blog"],
      items: [
        {
          title: "Tags",
          url: "/admin/blog/tag",
          permissions: ["view:blog-tag"],
        },
        {
          title: "Post",
          url: "/admin/blog/post",
          permissions: ["view:blog"],
        },
      ],
    },
    {
      title: "Videos",
      url: "#",
      icon: Video,
      permissions: ["view:video-tag", "view:video", "view:playlist"],
      items: [
        {
          title: "Tags",
          url: "/admin/video/tag",
          permissions: ["view:video-tag"],
        },
        {
          title: "Video Links",
          url: "/admin/video/video-links",
          permissions: ["view:video"],
        },
        {
          title: "Playlist",
          url: "/admin/video/playlist",
          permissions: ["view:playlist"],
        },
      ],
    },
    {
      title: "Static Pages",
      url: "#",
      icon: Layout,
      permissions: ["modify:homepage", "modify:bhagwan-mahavir-page"],
      items: [
        {
          title: "Homepage",
          url: "/admin/homepage",
          permissions: ["modify:homepage"],
          icon: Home,
        },
        {
          title: "Bhagwan Mahavir Page",
          url: "/admin/bhagwan-mahavir",
          permissions: ["modify:bhagwan-mahavir-page"],
          icon: Globe,
        },
      ],
    },
    {
      title: "Frontend Playlists",
      url: "/admin/playlist",
      icon: Layout,
      permissions: ["view:frontend-playlist", "modify:frontend-playlist"],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h2 className="font-semibold text-center text-lg">Jain Agam</h2>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <Link href="/auth/logout">
          <Button variant={'secondary'} className="w-full py-2 my-4 ">
            Logout <LogOut />
          </Button>
        </Link>

      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
