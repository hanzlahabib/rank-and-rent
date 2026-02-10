import LeadsTable from "@/components/admin/leads-table";

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
          Leads
        </h1>
        <p className="text-slate-500 mt-1">
          Track and manage all incoming leads
        </p>
      </div>
      <LeadsTable />
    </div>
  );
}
