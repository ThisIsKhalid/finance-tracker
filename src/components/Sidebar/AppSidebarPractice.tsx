import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    badge: 2,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    badge: 5,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
    badge: 0,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
    badge: 0,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">My App</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.title === "Home"}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>
                    {item.badge > 0 ? item.badge : null}
                  </SidebarMenuBadge>
                  {/* <SidebarMenuSkeleton showIcon /> */}
                </SidebarMenuItem>
              ))}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Settings />
                        <span>More Options</span>
                      </a>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <a href="#">Option 1</a>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <a href="#">Option 2</a>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <LogOut />
                <span>Sign Out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
