import { NavLink, Outlet } from "react-router-dom";
import "../components/Dashboard.css";

export default function AppLayout() {
  return (
    <>
      <header className="app-header">
        <h1>Smart Manufacturing</h1>
        <span className="user-info">Operator Panel</span>
      </header>

      <div className="layout">
        <nav className="sidebar">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Monitoring
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/production"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Laporan Produksi
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/machines"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Manajemen Mesin
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
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
