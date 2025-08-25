"use client";

import { UserAvatar } from "@/components/ui/user-avatar";
import { useAuthContext } from "@/app/components/providers/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Activity,
  ChevronsUpDown,
  Code,
  FileText,
  Home,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigation data grouped by sections
const navigationData = {
  main: {
    title: "Main",
    icon: Home,
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
    ],
  },
  account: {
    title: "Account",
    icon: User,
    items: [
      {
        title: "Profile",
        url: "/profile",
        icon: User,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
  resources: {
    title: "Resources",
    icon: Code,
    items: [
      {
        title: "Documentation",
        url: "/docs",
        icon: FileText,
      },
    ],
  },
  legal: {
    title: "Legal",
    icon: Shield,
    items: [
      {
        title: "Privacy Policy",
        url: "/privacy",
        icon: Shield,
      },
      {
        title: "Terms of Service",
        url: "/terms",
        icon: FileText,
      },
    ],
  },
};

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { user, signOut } = useAuthContext();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="py-6">
              <Link href="/">
                <Activity className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-semibold">Next.js Template</span>
                  <span className="text-xs text-muted-foreground">
                    Starter Kit
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(navigationData).map(([key, section]) => (
          <SidebarGroup key={key}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className={
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : ""
                        }
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 group-data-[collapsible=icon]:p-2 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <UserAvatar
                    size="md"
                    className="h-8 w-8 rounded-lg"
                    showBackground={true}
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.email?.split("@")[0] || "User"}
                    </span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                align="end"
              >
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="gap-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
