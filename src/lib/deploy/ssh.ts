import { Client } from "ssh2";
import type { VpsConfig } from "./types";
import { addDeployLog, setDeployStatus } from "./state";

function getVpsConfig(): VpsConfig {
  const host = process.env.VPS_HOST;
  const password = process.env.VPS_PASSWORD;
  const projectPath = process.env.VPS_PROJECT_PATH;

  if (!host || !password || !projectPath) {
    throw new Error(
      "Missing VPS env vars: VPS_HOST, VPS_PASSWORD, VPS_PROJECT_PATH are required"
    );
  }

  return {
    host,
    port: parseInt(process.env.VPS_PORT || "22", 10),
    user: process.env.VPS_USER || "root",
    password,
    projectPath,
    gitRepo: process.env.VPS_GIT_REPO || "",
  };
}

function runCommand(
  conn: Client,
  command: string
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) return reject(err);

      let stdout = "";
      let stderr = "";

      stream.on("data", (data: Buffer) => {
        const text = data.toString();
        stdout += text;
        // Stream each line as a log
        for (const line of text.split("\n").filter(Boolean)) {
          addDeployLog(line, "info");
        }
      });

      stream.stderr.on("data", (data: Buffer) => {
        const text = data.toString();
        stderr += text;
        for (const line of text.split("\n").filter(Boolean)) {
          addDeployLog(line, "error");
        }
      });

      stream.on("close", (code: number) => {
        resolve({ code: code ?? 0, stdout, stderr });
      });
    });
  });
}

function connectSsh(config: VpsConfig): Promise<Client> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn
      .on("ready", () => resolve(conn))
      .on("error", (err) => reject(err))
      .connect({
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password,
        readyTimeout: 10000,
      });
  });
}

async function runStep(
  conn: Client,
  label: string,
  command: string
): Promise<void> {
  addDeployLog(`--- ${label} ---`, "info");
  const result = await runCommand(conn, command);
  if (result.code !== 0) {
    throw new Error(`Step "${label}" failed with exit code ${result.code}`);
  }
  addDeployLog(`${label} completed`, "success");
}

export async function testConnection(): Promise<boolean> {
  const config = getVpsConfig();
  try {
    const conn = await connectSsh(config);
    const result = await runCommand(conn, "echo 'Connection OK' && uptime");
    conn.end();
    return result.code === 0;
  } catch {
    return false;
  }
}

export async function executeDeploy(): Promise<void> {
  const config = getVpsConfig();
  setDeployStatus("deploying");
  addDeployLog("Starting deployment...", "info");

  let conn: Client | null = null;

  try {
    addDeployLog(`Connecting to ${config.host}:${config.port}...`, "info");
    conn = await connectSsh(config);
    addDeployLog("SSH connection established", "success");

    const dir = config.projectPath;

    await runStep(conn, "Git Pull", `cd ${dir} && git pull origin main`);
    await runStep(conn, "Install Dependencies", `cd ${dir} && pnpm install --frozen-lockfile`);
    await runStep(conn, "Build", `cd ${dir} && pnpm build`);
    await runStep(conn, "Restart PM2", `cd ${dir} && pm2 restart rank-and-rent || pm2 start pnpm --name rank-and-rent -- start`);

    setDeployStatus("success");
    addDeployLog("Deployment completed successfully!", "success");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    addDeployLog(`Deployment failed: ${message}`, "error");
    setDeployStatus("error");
  } finally {
    conn?.end();
  }
}

export async function executeFirstTimeSetup(): Promise<void> {
  const config = getVpsConfig();
  setDeployStatus("deploying");
  addDeployLog("Starting first-time VPS setup...", "info");

  let conn: Client | null = null;

  try {
    addDeployLog(`Connecting to ${config.host}:${config.port}...`, "info");
    conn = await connectSsh(config);
    addDeployLog("SSH connection established", "success");

    // Install Node.js 20 via NodeSource
    await runStep(
      conn,
      "Install Node.js 20",
      "curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs"
    );

    // Install pnpm
    await runStep(conn, "Install pnpm", "npm install -g pnpm");

    // Install PM2
    await runStep(conn, "Install PM2", "npm install -g pm2");

    // Clone repo
    if (!config.gitRepo) {
      throw new Error("VPS_GIT_REPO env var is required for first-time setup");
    }
    await runStep(
      conn,
      "Clone Repository",
      `git clone ${config.gitRepo} ${config.projectPath}`
    );

    // Install dependencies
    await runStep(
      conn,
      "Install Dependencies",
      `cd ${config.projectPath} && pnpm install`
    );

    // Build
    await runStep(conn, "Build", `cd ${config.projectPath} && pnpm build`);

    // Start with PM2
    await runStep(
      conn,
      "Start with PM2",
      `cd ${config.projectPath} && pm2 start pnpm --name rank-and-rent -- start && pm2 save`
    );

    setDeployStatus("success");
    addDeployLog("First-time setup completed successfully!", "success");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    addDeployLog(`Setup failed: ${message}`, "error");
    setDeployStatus("error");
  } finally {
    conn?.end();
  }
}
