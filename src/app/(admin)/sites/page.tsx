import SitesTable from "@/components/admin/sites-table";

export default function SitesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
          Sites
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your rank-and-rent properties
        </p>
      </div>
      <SitesTable />
    </div>
  );
}
