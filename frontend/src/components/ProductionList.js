import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function ProductionList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api("production/get-all")
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Production Logs</h2>
      <div className="space-y-3">
        {logs.map((l) => (
          <div key={l.id} className="card">
            <p><strong>Machine:</strong> {l.machine.name}</p>
            <p><strong>Quantity:</strong> {l.quantity}</p>
            <p><strong>Shift:</strong> {l.shift}</p>
            <p><strong>Operator:</strong> {l.operator.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
