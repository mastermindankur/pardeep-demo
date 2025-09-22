"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/lib/types";
import {
  LayoutDashboard,
  ShieldCheck,
  BarChartHorizontal,
  ClipboardList,
  FileText,
} from "lucide-react";

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Risk Assessment",
    href: "/assessment",
    icon: ShieldCheck,
  },
  {
    title: "SLA Monitor",
    href: "/sla",
    icon: BarChartHorizontal,
  },
  {
    title: "Action Tracker",
    href: "/actions",
    icon: ClipboardList,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarContent className="p-2">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.title}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
