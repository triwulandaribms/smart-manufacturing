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
    <div className="production-container">
      <div className="production-header">
        <h2>PRODUCTION REPORT</h2>
      </div>

      <div className="table-wrapper">
        <table className="production-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Machine</th>
              <th>Shift</th>
              <th>Quantity</th>
              <th>Operator</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l, idx) => (
              <tr key={l.id}>
                <td>{idx + 1}</td>
                <td>{l.machine.name}</td>
                <td>{l.shift}</td>
                <td>{l.quantity}</td>
                <td>{l.operator.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
