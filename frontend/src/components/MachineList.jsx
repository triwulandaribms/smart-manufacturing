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

  const handleAddMachine = () => {
    alert("Tambah Machine clicked!");
  };

  return (
    <div className="machine-container">
      <div className="machine-header">
        <h2>DAFTAR MACHINE</h2>
      </div>

      <div className="add-user-row">
        <button className="add-btn" onClick={handleAddMachine}>
          + Add Machine
        </button>
      </div>


      <div className="table-wrapper">
        <table className="machine-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Type</th>
              <th>Temperature</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m, idx) => (
              <tr key={m.id}>
                <td>{idx + 1}</td>
                <td>{m.name}</td>
                <td>{m.type}</td>
                <td>{m.temperature}°C</td>
                <td><StatusBadge status={m.status} /></td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
