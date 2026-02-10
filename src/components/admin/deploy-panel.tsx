"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Rocket,
  ServerCog,
  Loader2,
  CheckCircle2,
  XCircle,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeployStatus, DeployLog } from "@/lib/deploy/types";

export default function DeployPanel({
  vpsHost,
  projectPath,
}: {
  vpsHost: string;
  projectPath: string;
}) {
  const [status, setStatus] = useState<DeployStatus>("idle");
  const [logs, setLogs] = useState<DeployLog[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [logs, scrollToBottom]);

  // Fetch current state on mount
  useEffect(() => {
    fetch("/api/deploy")
      .then((res) => res.json())
      .then((state) => {
        setStatus(state.status);
        setLogs(state.logs || []);
        if (state.status === "deploying") {
          connectStream();
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function connectStream() {
    const eventSource = new EventSource("/api/deploy/stream");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "done") {
          setStatus(data.status);
          eventSource.close();
          return;
        }

        setLogs((prev) => [...prev, data as DeployLog]);
      } catch {
        // Invalid JSON, skip
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };
  }

  async function handleDeploy() {
    setLogs([]);
    setStatus("deploying");

    const res = await fetch("/api/deploy", { method: "POST" });
    if (!res.ok) {
      const data = await res.json();
      setStatus("error");
      setLogs([
        {
          timestamp: new Date().toISOString(),
          message: data.error || "Failed to start deployment",
          type: "error",
        },
      ]);
      return;
    }

    connectStream();
  }

  async function handleSetup() {
    setLogs([]);
    setStatus("deploying");

    const res = await fetch("/api/deploy/setup", { method: "POST" });
    if (!res.ok) {
      const data = await res.json();
      setStatus("error");
      setLogs([
        {
          timestamp: new Date().toISOString(),
          message: data.error || "Failed to start setup",
          type: "error",
        },
      ]);
      return;
    }

    connectStream();
  }

  const isDeploying = status === "deploying";

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
            isDeploying
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-cerulean text-white hover:bg-cerulean/90 shadow-sm"
          )}
        >
          {isDeploying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Rocket className="h-4 w-4" />
          )}
          {isDeploying ? "Deploying..." : "Deploy"}
        </button>

        <button
          onClick={handleSetup}
          disabled={isDeploying}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
            isDeploying
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-slate-800 text-white hover:bg-slate-700 shadow-sm"
          )}
        >
          <ServerCog className="h-4 w-4" />
          First-Time Setup
        </button>

        {vpsHost && (
          <a
            href={`https://${vpsHost}:8090`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            CyberPanel
          </a>
        )}

        {/* Status badge */}
        {status !== "idle" && (
          <div className="ml-auto">
            <StatusBadge status={status} />
          </div>
        )}
      </div>

      {/* VPS info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-slate-500 mb-1">Host</p>
          <p className="font-mono font-medium text-slate-900">
            {vpsHost || "Not configured"}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-slate-500 mb-1">Project Path</p>
          <p className="font-mono font-medium text-slate-900">
            {projectPath || "Not configured"}
          </p>
        </div>
      </div>

      {/* Terminal output */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
          <Terminal className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-medium text-slate-400">
            Deploy Logs
          </span>
          {isDeploying && (
            <Loader2 className="h-3 w-3 animate-spin text-cerulean-light ml-auto" />
          )}
        </div>
        <div
          ref={terminalRef}
          className="p-4 h-[400px] overflow-y-auto font-mono text-xs leading-relaxed"
        >
          {logs.length === 0 ? (
            <p className="text-slate-600">
              Waiting for deployment... Click &quot;Deploy&quot; to start.
            </p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-slate-600 select-none shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span
                  className={cn(
                    log.type === "error" && "text-red-400",
                    log.type === "success" && "text-emerald-400",
                    log.type === "info" && "text-slate-300"
                  )}
                >
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: DeployStatus }) {
  if (status === "deploying") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
        <Loader2 className="h-3 w-3 animate-spin" />
        Deploying
      </span>
    );
  }
  if (status === "success") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="h-3 w-3" />
        Success
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        <XCircle className="h-3 w-3" />
        Failed
      </span>
    );
  }
  return null;
}
