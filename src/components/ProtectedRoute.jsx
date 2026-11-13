
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}>
        Checking administrator access...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!profile || !["super_admin", "content_manager", "enquiry_manager"].includes(profile.role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
