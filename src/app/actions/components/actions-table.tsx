"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ActionItem } from "@/lib/types";

interface ActionsTableProps {
  data: ActionItem[];
}

export function ActionsTable({ data }: ActionsTableProps) {
  const getStatusVariant = (status: ActionItem["status"]) => {
    switch (status) {
      case "Open":
        return "destructive";
      case "In Progress":
        return "secondary";
      case "Closed":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.description}</TableCell>
            <TableCell>{item.assignedTo}</TableCell>
            <TableCell>{item.dueDate}</TableCell>
            <TableCell className="text-right">
              <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
