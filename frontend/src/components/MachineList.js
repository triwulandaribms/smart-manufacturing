import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function MachineList() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    api("machines/get-all")
      .then((res) => setMachines(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Machines</h2>
      {machines.map((m) => (
        <div key={m.id} className="card">
          <h3 className="font-semibold">{m.name}</h3>
          <p>Type: {m.type}</p>
          <p>Status: {m.status}</p>
          <p>Temperature: {m.temperature}</p>
        </div>
      ))}
    </div>
  );
}
