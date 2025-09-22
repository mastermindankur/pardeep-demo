import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
};

export type Assessment = {
  id: string;
  service: string;
  provider: string;
  date: string;
  riskScore: number;
  isHighRisk: boolean;
};

export type Sla = {
  id: string;
  provider: string;
  metric: string;
  target: string;
  actual: string;
  status: 'Met' | 'Breached' | 'At Risk';
};

export type ActionItem = {
  id: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Closed';
};

export type Document = {
  id:string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
};
