
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Projects from "./pages/admin/Projects";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* PUBLIC WEBSITE */}
          <Route
            path="/"
            element={
              <div style={{ padding: "40px", fontFamily: "Arial" }}>
                <h1>Duisburg Developers</h1>
                <p>Building Excellence. Delivering Quality.</p>
              </div>
            }
          />

          {/* ADMIN LOGIN */}
          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* PROTECTED ADMIN ROUTES */}
          <Route element={<ProtectedRoute />}>

            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/projects"
              element={<Projects />}
            />

          </Route>

          {/* UNKNOWN ROUTES */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
