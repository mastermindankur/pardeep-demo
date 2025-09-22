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
import type { Sla } from "@/lib/types";

interface SlaTableProps {
  data: Sla[];
}

export function SlaTable({ data }: SlaTableProps) {
  const getStatusVariant = (status: Sla["status"]) => {
    switch (status) {
      case "Breached":
        return "destructive";
      case "At Risk":
        return "secondary";
      case "Met":
        return "default";
      default:
        return "outline";
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Provider</TableHead>
          <TableHead>Metric</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Actual</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.provider}</TableCell>
            <TableCell>{item.metric}</TableCell>
            <TableCell>{item.target}</TableCell>
            <TableCell>{item.actual}</TableCell>
            <TableCell className="text-right">
              <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
