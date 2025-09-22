import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SlaTable } from "./components/sla-table";
import { GenerateSummary } from "./components/generate-summary";
import { slas } from "@/lib/data";

export default function SlaPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          SLA Performance Monitor
        </h1>
        <GenerateSummary />
      </div>
      <p className="text-muted-foreground">
        Monitor Service Level Agreement performance, highlights breaches and risks.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>All Service Level Agreements</CardTitle>
          <CardDescription>
            Record and respond to provider breaches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SlaTable data={slas} />
        </CardContent>
      </Card>
    </div>
  );
}
