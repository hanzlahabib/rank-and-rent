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
import { cn } from "@/lib/utils";

interface TenantRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  sites: number;
  monthlyRate: number;
  status: "active" | "paused";
}

const demoTenants: TenantRow[] = [
  {
    id: "1",
    name: "QuickCharge EV Services",
    email: "ops@quickcharge.com",
    phone: "(702) 555-0100",
    sites: 1,
    monthlyRate: 2500,
    status: "active",
  },
  {
    id: "2",
    name: "SmartLiving AZ",
    email: "contact@smartliving.com",
    phone: "(480) 555-0200",
    sites: 1,
    monthlyRate: 1750,
    status: "active",
  },
];

export default function TenantsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
            Tenants
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your service provider renters
          </p>
        </div>
        <Button className="bg-cerulean hover:bg-cerulean-light text-white font-semibold rounded-xl px-5">
          Add Tenant
        </Button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-6">
                Tenant
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Contact
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Sites
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Monthly Rate
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-right pr-6">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoTenants.map((tenant) => (
              <TableRow
                key={tenant.id}
                className="hover:bg-slate-50/50 border-slate-100"
              >
                <TableCell className="pl-6">
                  <p className="font-semibold text-slate-900 text-sm">
                    {tenant.name}
                  </p>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm text-slate-600">{tenant.email}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {tenant.phone}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-semibold text-slate-900">
                    {tenant.sites}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-semibold text-slate-900 stat-number">
                    ${tenant.monthlyRate.toLocaleString()}/mo
                  </span>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium capitalize rounded-full text-xs",
                      tenant.status === "active"
                        ? "bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20"
                        : "bg-amber-warm/10 text-amber-warm border-amber-warm/20"
                    )}
                  >
                    {tenant.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
