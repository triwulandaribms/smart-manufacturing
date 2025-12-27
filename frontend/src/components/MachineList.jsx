import { useEffect, useState } from "react";
import { api } from "../api/api";
import StatusBadge from "./StatusBadge";
import "./MachineList.css";

export default function MachineList() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    api("machines/get-all")
      .then((res) => setMachines(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Machine Management</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {machines.map((m) => (
          <div key={m.id} className="card">
            <h3 className="font-semibold">{m.name}</h3>
            <p>Type: {m.type}</p>
            <p>Status: <StatusBadge status={m.status} /></p>
            <p>Temperature: {m.temperature}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

