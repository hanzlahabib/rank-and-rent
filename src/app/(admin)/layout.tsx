import AdminSidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="pl-[260px] min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
