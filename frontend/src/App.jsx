import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monitoring from "./components/MonitoringProduksi";
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
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/machines" element={<MachineList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/production" element={<ProductionList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
