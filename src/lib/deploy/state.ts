import type { DeployState, DeployLog, DeployLogType } from "./types";

type Subscriber = (log: DeployLog) => void;

interface DeployStore {
  state: DeployState;
  subscribers: Set<Subscriber>;
}

const DEFAULT_STATE: DeployState = {
  status: "idle",
  logs: [],
  startedAt: null,
  finishedAt: null,
};

function getStore(): DeployStore {
  const g = globalThis as unknown as { __deployStore?: DeployStore };
  if (!g.__deployStore) {
    g.__deployStore = {
      state: { ...DEFAULT_STATE, logs: [] },
      subscribers: new Set(),
    };
  }
  return g.__deployStore;
}

export function getDeployState(): DeployState {
  return getStore().state;
}

export function setDeployStatus(status: DeployState["status"]) {
  const store = getStore();
  store.state.status = status;
  if (status === "deploying") {
    store.state.startedAt = new Date().toISOString();
    store.state.finishedAt = null;
  }
  if (status === "success" || status === "error") {
    store.state.finishedAt = new Date().toISOString();
  }
}

export function addDeployLog(message: string, type: DeployLogType = "info") {
  const store = getStore();
  const log: DeployLog = {
    timestamp: new Date().toISOString(),
    message,
    type,
  };
  store.state.logs.push(log);
  for (const cb of store.subscribers) {
    cb(log);
  }
}

export function resetDeploy() {
  const store = getStore();
  store.state = { ...DEFAULT_STATE, logs: [] };
}

export function subscribe(cb: Subscriber): () => void {
  const store = getStore();
  store.subscribers.add(cb);
  return () => {
    store.subscribers.delete(cb);
  };
}
