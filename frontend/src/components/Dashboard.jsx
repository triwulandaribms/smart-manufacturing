import { useEffect, useState } from "react";
import { api } from "../api/api";
import StatusBadge from "./StatusBadge";
import "./Dashboard.css";


export default function Dashboard() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    api("production/dashboard")
      .then((res) => setSummary(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Smart Manufacturing Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {summary.map((m) => (
          <div key={m.machineId} className="card">
            <h3 className="text-xl font-semibold">{m.machineName}</h3>

            <p>Status: <StatusBadge status={m.status} /></p>
            <p>Temperature: {m.temperature}°C</p>
            <p>Operator: {m.operatorName}</p>
            <p className="font-semibold">
              Output / Shift: {m.totalProduction}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
