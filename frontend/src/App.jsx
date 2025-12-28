import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import MachineList from "./components/MachineList";
import UserList from "./components/UserList";
import ProductionList from "./components/ProductionList";
import PrivateRoute from "./routes/PrivateRoute";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/machines" element={<MachineList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/production" element={<ProductionList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
