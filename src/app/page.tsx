import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  ClipboardList,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  actionItems,
  assessments,
  slas,
} from "@/lib/data";

export default function DashboardPage() {
  const highRiskAssessments = assessments.filter((a) => a.isHighRisk).length;
  const openActionItems = actionItems.filter((a) => a.status !== "Closed").length;
  const slaBreaches = slas.filter((s) => s.status === "Breached").length;

  const recentAssessments = [...assessments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              High-Risk Assessments
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <Link href="/assessment">
              <div className="text-2xl font-bold hover:underline">{highRiskAssessments}</div>
            </Link>
            <p className="text-xs text-muted-foreground">
              Requiring immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Action Items
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <Link href="/actions">
              <div className="text-2xl font-bold hover:underline">{openActionItems}</div>
            </Link>
            <p className="text-xs text-muted-foreground">
              Pending completion
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active SLA Breaches</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Link href="/sla">
              <div className="text-2xl font-bold text-destructive hover:underline">{slaBreaches}</div>
            </Link>
            <p className="text-xs text-muted-foreground">
              Across all service providers
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Risk Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="text-center">Risk</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAssessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">{assessment.service}</TableCell>
                  <TableCell>{assessment.provider}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={assessment.isHighRisk ? "destructive" : "secondary"}>
                      {assessment.isHighRisk ? "High" : "Low"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{assessment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
