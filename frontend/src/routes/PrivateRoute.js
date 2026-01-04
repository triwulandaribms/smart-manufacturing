import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          message: "Anda harus login terlebih dahulu",
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}
