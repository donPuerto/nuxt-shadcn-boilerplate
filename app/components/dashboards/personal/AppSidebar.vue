<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  LineChart,
  User,
  Package,
  AudioWaveform,
  GalleryVerticalEnd,
  Command
} from "lucide-vue-next"

import NavMain from "./NavMain.vue"
import NavProjects from "./NavProjects.vue"
import NavUser from "./NavUser.vue"
import TeamSwitcher from "./TeamSwitcher.vue"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard" },
        { title: "Analytics", url: "/dashboard/analytics" },
        { title: "Activity", url: "/dashboard/activity" },
      ],
    },
    {
      title: "Sales",
      url: "/sales",
      icon: LineChart,
      items: [
        { title: "Leads", url: "/sales/leads" },
        { title: "Deals", url: "/sales/deals" },
        { title: "Reports", url: "/sales/reports" },
      ],
    },
    {
      title: "Personal",
      url: "/personal",
      icon: User,
      items: [
        { title: "Profile", url: "/personal/profile" },
        { title: "Settings", url: "/personal/settings" },
        { title: "Packages", url: "/personal/packages" },
      ],
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Package },
    { name: "Sales & Marketing", url: "#", icon: AudioWaveform },
    { name: "Travel", url: "#", icon: GalleryVerticalEnd },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
