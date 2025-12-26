import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import MachineList from "./components/MachineList";
import UserList from "./components/UserList";
import ProductionList from "./components/ProductionList";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/machines" element={<PrivateRoute><MachineList /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
        <Route path="/production" element={<PrivateRoute><ProductionList /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
