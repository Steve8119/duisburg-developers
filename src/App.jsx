
import { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollReveal from "./components/ScrollReveal";

import Home from "./pages/Home";

// PUBLIC WEBSITE PAGES
import PublicServices from "./pages/Services";
import PublicProjects from "./pages/Projects";
import Diaspora from "./pages/Diaspora";

// ADMIN PAGES
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Projects from "./pages/admin/Projects";
import AdminServices from "./pages/admin/Services";
import Blogs from "./pages/admin/Blogs";
import Enquiries from "./pages/admin/Enquiries";
import Testimonials from "./pages/admin/Testimonials";
import TeamMembers from "./pages/admin/TeamMembers";
import DiasporaEnquiries from "./pages/admin/DiasporaEnquiries";

/* =========================================
   GLOBAL PAGE AND SECTION SCROLLING
========================================= */

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    const scrollToTarget = () => {
      if (location.hash) {
        const sectionId = decodeURIComponent(
          location.hash.substring(1)
        );

        const element = document.getElementById(sectionId);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    };

    // Allow the destination page to render before scrolling.
    const timeout = setTimeout(scrollToTarget, 300);

    return () => clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  return null;
}

/* =========================================
   MAIN APP
========================================= */

function App() {
  return (
    <BrowserRouter>
      {/* HANDLE NAVIGATION SCROLLING */}
      <ScrollToSection />

      <AuthProvider>
        {/* GLOBAL SCROLL ANIMATIONS */}
        <ScrollReveal />

        <Routes>
          {/* PUBLIC WEBSITE */}
          <Route path="/" element={<Home />} />

          <Route
            path="/services"
            element={<PublicServices />}
          />

          <Route
            path="/projects"
            element={<PublicProjects />}
          />

          {/* DIASPORA PAGE */}
          <Route
            path="/diaspora"
            element={<Diaspora />}
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

            <Route
              path="/admin/services"
              element={<AdminServices />}
            />

            <Route
              path="/admin/blogs"
              element={<Blogs />}
            />

            <Route
              path="/admin/enquiries"
              element={<Enquiries />}
            />

            <Route
              path="/admin/testimonials"
              element={<Testimonials />}
            />

            <Route
              path="/admin/team-members"
              element={<TeamMembers />}
            />

            <Route
              path="/admin/diaspora-enquiries"
              element={<DiasporaEnquiries />}
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
