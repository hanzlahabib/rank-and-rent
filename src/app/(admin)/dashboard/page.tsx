import StatsCards from "@/components/admin/stats-cards";
import SitesTable from "@/components/admin/sites-table";
import LeadsTable from "@/components/admin/leads-table";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Overview of your rank-and-rent portfolio
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Recent leads */}
      <LeadsTable />

      {/* Sites table */}
      <SitesTable />
    </div>
  );
}
