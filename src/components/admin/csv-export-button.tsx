"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToCsv } from "@/lib/csv-export";

interface CsvExportButtonProps {
  filename: string;
  data: Record<string, string | number | boolean | null | undefined>[];
  label?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function CsvExportButton({
  filename,
  data,
  label = "Export CSV",
  variant = "outline",
  size = "sm",
}: CsvExportButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className="gap-2 rounded-xl"
      onClick={() => exportToCsv(filename, data)}
      disabled={data.length === 0}
    >
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
}
