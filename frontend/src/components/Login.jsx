import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api/api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/monitoring";

  useEffect(() => {
    if (location.state?.message) {
      setAlertMessage(location.state.message);

      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 3000);

      navigate(location.pathname, { replace: true });

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api("auth/login", "POST", { email, password });

      const user = {
        id: res.user.id,
        name: res.user.name,
        role: res.user.role,
      };

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(from, { replace: true });
    } catch (err) {
      alert(err.message || "Login gagal");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {alertMessage && (
          <div className="login-alert fade-out">
            {alertMessage}
          </div>
        )}

        <div className="login-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="User Icon"
          />
        </div>

        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
