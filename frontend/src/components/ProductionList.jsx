import { useEffect, useState } from "react";
import { api } from "../api/api";
import "./ProductionList.css";

export default function ProductionList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api("production/get-all")
      .then((res) => setLogs(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Production Report</h2>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Machine</th>
            <th>Shift</th>
            <th>Quantity</th>
            <th>Operator</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td>{l.machine.name}</td>
              <td>{l.shift}</td>
              <td>{l.quantity}</td>
              <td>{l.operator.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
