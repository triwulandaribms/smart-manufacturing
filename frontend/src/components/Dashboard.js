import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Dashboard() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    api("/production/dashboard")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(summary).map((machine) => (
          <div key={machine} className="card">
            <h3 className="text-xl font-semibold">{machine}</h3>
            <p>Status: <span className="font-medium">{summary[machine].status}</span></p>
            <p>Total Production: <span className="font-medium">{summary[machine].totalProduction}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
