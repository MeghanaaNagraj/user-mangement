import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from './pages/Register'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route path="/add-user" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
