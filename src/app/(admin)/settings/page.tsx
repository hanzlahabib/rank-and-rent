import DeployPanel from "@/components/admin/deploy-panel";

export default function SettingsPage() {
  const vpsHost = process.env.VPS_HOST || "";
  const projectPath = process.env.VPS_PROJECT_PATH || "";

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-slate-500 mt-1">
          VPS deployment and server configuration
        </p>
      </div>

      {/* Deploy section */}
      <section>
        <h2 className="font-display text-lg font-semibold text-slate-900 mb-4">
          VPS Deployment
        </h2>
        <DeployPanel vpsHost={vpsHost} projectPath={projectPath} />
      </section>
    </div>
  );
}
