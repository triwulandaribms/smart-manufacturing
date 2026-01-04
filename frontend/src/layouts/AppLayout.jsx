import { NavLink, Outlet, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AppLayout.css";

export default function AppLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUserMenuClick = (e) => {
    if (user?.role !== "admin") {
      e.preventDefault();
      alert("Hanya admin yang bisa mengakses menu ini");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", {
      replace: true,
      state: { message: "Berhasil logout" },
    });
  };

  return (
    <>
      <header className="app-header">
        <div className="brand">
          <img
            src="https://www.google.com/s2/favicons?sz=64&domain=smartmanufacturing.co.id"
            alt="Smart Manufacturing"
            className="brand-logo"
          />
          <div className="brand-text">
            <span>Smart</span>
            <span>Manufacturing</span>
          </div>
        </div>


        <div className="header-right">
          <span className="user-info">
            {user ? user.role : "Guest"}
          </span>

          {user && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

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
            <NavLink
                to="/users"
                onClick={handleUserMenuClick}
                className={user?.role !== "admin" ? "nav-link disabled" : "nav-link"}
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