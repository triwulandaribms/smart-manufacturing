import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AppLayout.css";

export default function AppLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <header className="app-header">
        <h1>Smart Manufacturing</h1>

        <span className="user-info">
          {user ? `${user.role}` : "Guest"}
        </span>
      </header>

      <div className="layout">
        <nav className="sidebar">
          <ul>
            <li>
              <NavLink to="/monitoring" className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
                Monitoring
              </NavLink>
            </li>

            <li>
              <NavLink to="/production" className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
                Laporan Produksi
              </NavLink>
            </li>

            <li>
              <NavLink to="/machines" className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
                Manajemen Mesin
              </NavLink>
            </li>

            <li>
              <NavLink to="/users" className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
                Manajemen User
              </NavLink>
            </li>
          </ul>
        </nav>

        <main className="content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
