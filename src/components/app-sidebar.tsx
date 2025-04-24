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

// This is sample data.
const data = {
  navMain: [

    {
      title: "Users Management",
      url: "/admin/users",
      icon: Bot,
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
      items: [
        {
          title: "Tags",
          url: "/admin/blog/tag",
        },
        {
          title: "Post",
          url: "/admin/blog/post",
        },
      ],
    },
    {
      title: "Videos",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Tags",
          url: "/admin/video/tag",
        },
        {
          title: "Video Links",
          url: "/admin/video/video-links",
        },
        {
          title: "Playlist",
          url: "/admin/video/playlist",
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
