"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { permission } from "process"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Users Management",
      url: "/admin/users",
      icon: Bot,
      permissions: ["view:user"],
    },
    {
      title: "Media",
      url: "/admin/media",
      icon: Bot,
      permissions: ["view:media"],
    },
    {
      title: "Blog",
      url: "#",
      icon: BookOpen,
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
      icon: BookOpen,
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
      icon: BookOpen,
      permissions: ["modify:homepage", "modify:bhagwan-mahavir-page"],
      items: [
        {
          title: "Homepage",
          url: "/admin/homepage",
          permissions: ["modify:homepage"],
        },
        {
          title: "Bhagwan Mahavir Page",
          url: "/admin/bhagwan-mahavir",
          permissions: ["modify:bhagwan-mahavir-page"],
        },
      ],
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
        {/* TODO: Add Logout button  */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
