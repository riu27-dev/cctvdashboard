export type Status = "online" | "offline" | "unknown";
export type Brand = "hikvision" | "uniview" | "tvt" | "imou" | "dahua" | "other";
export type DeviceType = "camera" | "nvr" | "dvr" | "xvr";

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  brand: Brand;
  ip: string;
  status: Status;
  lastCheckedAt?: string
  lastSeenAt?: string
}

export interface Client {
  id: string;
  name: string;
  location: string;
  devices: Device[];
}

export interface ClientSummary {
  total: number;
  online: number;
  offline: number;
  unknown: number;
  healthPct: number | null;
}

export function summarize(client: Client): ClientSummary {
  const total = client.devices.length;
  const online = client.devices.filter((d) => d.status === "online").length;
  const healthPct = total === 0 ? 0 : Math.floor((online / total) * 100);
  return { total, online, offline, unknown, healthPct };
}