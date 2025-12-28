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
    <section>
      <h2 className="section-title">DASHBOARD MONITORING MESIN</h2>

      <div className="dashboard-grid">
        {summary.map((m) => (
          <article key={m.machineId} className="machine-card">
          <div className="machine-header">
            <div className="row">
              <span className="label">Status</span>
              <StatusBadge status={m.status} />
            </div>
        
            <div className="row">
              <span className="label">Temperature</span>
              <span
                className={`temp-badge ${
                  m.temperature >= 80 ? "hot" : "normal"
                }`}
              >
                {m.temperature} °C
              </span>
            </div>
        
            <div className="row">
              <span className="label">Operator</span>
              <span className="value">{m.operatorName}</span>
            </div>
        
            <div className="row">
              <span className="label">Total Produksi</span>
              <span className="output-badge">
                {m.totalProduction}
              </span>
            </div>
          </div>
        </article>        
        ))}
      </div>
    </section>
  );
}
