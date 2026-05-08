import type { ScanData } from "../Scenes/Types/Scantype";

export const exportJSON = (data: ScanData) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `scan-${data.target}.json`;
  a.click();

  URL.revokeObjectURL(url);
};

export const exportCSV = (data: ScanData) => {
  if (!data?.nodes) return;

  const rows: string[] = [];

  // Header
  rows.push("IP,Port,Service,Version,Risk");

  // Flatten nodes → ports
  data.nodes.forEach(node => {
    node.ports.forEach(port => {
      rows.push(
        `${node.ip},${port.port},${port.service},${port.version || "Unknown"},${port.risk}`
      );
    });
  });

  const csvContent = rows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `scan-${data.target}.csv`;
  a.click();

  URL.revokeObjectURL(url);
};