import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { DocumentsTable } from "./components/documents-table";
import { documents as initialDocuments } from "@/lib/data";
import type { Document } from "@/lib/types";

export default function DocumentsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let documents: Document[] = [...initialDocuments];
  if (searchParams?.newDocument) {
    try {
      const newDoc = JSON.parse(
        Array.isArray(searchParams.newDocument)
          ? searchParams.newDocument[0]
          : searchParams.newDocument
      );
      // Add the new document to the beginning of the array
      documents.unshift(newDoc);
    } catch (e) {
      console.error("Failed to parse new document from URL", e);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Document Hub
        </h1>
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
      <p className="text-muted-foreground">
        Securely store and manage compliance documentation, assessment records, and SLA agreements.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>A repository for all your compliance-related files.</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentsTable data={documents} />
        </CardContent>
      </Card>
    </div>
  );
}
