import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api("users/get-all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="p-6">
      <h2 className="page-title">DAFTAR USER</h2>

      <div className="add-user-row">
        <button
          className="btn btn-add"
          onClick={() => navigate("users/add")}
        >
          + Add User
        </button>
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No data
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={u.id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className="action-cell">
                    <button
                      className="btn btn-edit"
                      onClick={() => navigate(`users/edit/${u.id}`)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
