"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Phone, Mail, Search, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { exportToCsv } from "@/lib/csv-export";
import type { LeadStatus } from "@/types";

interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  site: string;
  service: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
}

const demoLeads: LeadRow[] = [
  {
    id: "1",
    name: "Robert Chen",
    email: "rchen@email.com",
    phone: "(702) 555-0134",
    site: "Henderson EV Charger Pros",
    service: "Level 2 Home Charger",
    status: "new",
    source: "form",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Amanda Garcia",
    email: "agarcia@email.com",
    phone: "(702) 555-0189",
    site: "Henderson EV Charger Pros",
    service: "Tesla Wall Connector",
    status: "contacted",
    source: "form",
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    name: "David Kim",
    email: "dkim@email.com",
    phone: "(702) 555-0267",
    site: "Henderson EV Charger Pros",
    service: "Electrical Panel Upgrade",
    status: "qualified",
    source: "call",
    createdAt: "1 day ago",
  },
  {
    id: "4",
    name: "Lisa Thompson",
    email: "lthompson@email.com",
    phone: "(702) 555-0412",
    site: "Henderson EV Charger Pros",
    service: "Tesla Wall Connector",
    status: "converted",
    source: "form",
    createdAt: "2 days ago",
  },
  {
    id: "5",
    name: "Marcus Williams",
    email: "mwilliams@email.com",
    phone: "(702) 555-0334",
    site: "Henderson EV Charger Pros",
    service: "Commercial EV Charging",
    status: "new",
    source: "form",
    createdAt: "3 hours ago",
  },
];

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-cerulean/10 text-cerulean border-cerulean/20",
  contacted: "bg-amber-warm/10 text-amber-warm border-amber-warm/20",
  qualified: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  converted: "bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20",
  lost: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function LeadsTable() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = demoLeads.filter((lead) => {
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.site.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  function handleExportCsv() {
    const rows = filteredLeads.map((lead) => ({
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Site: lead.site,
      Service: lead.service,
      Status: lead.status,
      Source: lead.source,
      "Created At": lead.createdAt,
    }));
    exportToCsv("leads-export.csv", rows);
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Leads
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {filteredLeads.length} leads total
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-xl border-slate-200 w-[240px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10 rounded-xl border-slate-200 w-[150px]">
                <Filter className="h-4 w-4 text-slate-400 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-xl h-10"
              onClick={handleExportCsv}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-6">
              Contact
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Site
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Service
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Status
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Time
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-right pr-6">
              Quick Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((lead) => (
            <TableRow
              key={lead.id}
              className="hover:bg-slate-50/50 border-slate-100"
            >
              <TableCell className="pl-6">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {lead.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{lead.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-slate-600">{lead.site}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-slate-600">{lead.service}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-medium capitalize rounded-full text-xs",
                    statusStyles[lead.status]
                  )}
                >
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-slate-400">
                  {lead.createdAt}
                </span>
              </TableCell>
              <TableCell className="text-right pr-6">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-slate-400 hover:text-cerulean"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-slate-400 hover:text-cerulean"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
