"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navCommunity: [
    {
      title: "Religion",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Articles",
          url: "#",
        },
        {
          title: "Calendar",
          url: "#",
        },
      ],
    },
    {
      title: "Outreach",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Upcoming Events",
          url: "#",
        },
        {
          title: "Previous Events",
          url: "#",
        },
        {
          title: "Join a programme",
          url: "#",
        },
      ],
    },
  ],
  navSocial: [
    {
      title: "Events",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Event",
          url: "#",
        },
        {
          title: "Join Event",
          url: "#",
        },
        {
          title: "Edit Event",
          url: "#",
        },
      ],
    },
    {
      title: "Workshops",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Host a workshop",
          url: "#",
        },
        {
          title: "Join a workshop",
          url: "#",
        },
        {
          title: "Edit a workshop",
          url: "#",
        },
      ],
    },
    {
      title: "Talks",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Upcoming talks",
          url: "#",
        },
        {
          title: "Previous talks",
          url: "#",
        },
        {
          title: "Join a talk",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  setSelectedPage,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  setSelectedPage: (title: string) => void;
}) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">HOCA</span>
                  <span className="truncate text-xs">
                    The Greater Collective
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navSocial}
          title={"Social"}
          setSelectedPage={setSelectedPage}
        />
        <NavMain
          items={data.navCommunity}
          title={"Community"}
          setSelectedPage={setSelectedPage}
        />
        {/*<NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
