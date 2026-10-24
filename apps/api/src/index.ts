export type Status = "online" | "offline";
export type Brand = "hikvision" | "uniview" | "tvt" | "imou" | "dahua" | "arenti";
export type DeviceType = "camera" | "nvr";

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  brand: Brand;
  ip: string;
  status: Status;
}

export interface Client {
  id: string;
  name: string;
  location: string;
  devices: Device[];
}

export function summarize(client: Client) {
  const total = client.devices.length;
  const online = client.devices.filter((d) => d.status === "online").length;
  const healthPct = total === 0 ? 0 : Math.round((online / total) * 100);
  return { total, online, healthPct };
}

