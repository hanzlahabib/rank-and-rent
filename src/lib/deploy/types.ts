export type DeployStatus = "idle" | "deploying" | "success" | "error";

export type DeployLogType = "info" | "error" | "success";

export interface DeployLog {
  timestamp: string;
  message: string;
  type: DeployLogType;
}

export interface DeployState {
  status: DeployStatus;
  logs: DeployLog[];
  startedAt: string | null;
  finishedAt: string | null;
}

export interface VpsConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  projectPath: string;
  gitRepo: string;
}
