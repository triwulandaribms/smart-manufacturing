import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api("/users/get-all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u.id} className="card">
            <p><strong>Name:</strong> {u.name}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Role:</strong> {u.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
