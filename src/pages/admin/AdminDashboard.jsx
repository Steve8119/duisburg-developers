
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  FileText,
  MessageSquare,
  Globe,
  Users,
  Star,
  Settings,
  LogOut,
  RefreshCw,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

import "./AdminDashboard.css";

function AdminDashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    blogs: 0,
    enquiries: 0,
    diaspora: 0,
    team: 0,
    testimonials: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);

    const tables = [
      { key: "projects", table: "projects" },
      { key: "services", table: "services" },
      { key: "blogs", table: "blog_posts" },
      { key: "enquiries", table: "enquiries" },
      { key: "diaspora", table: "diaspora_enquiries" },
      { key: "team", table: "team_members" },
      { key: "testimonials", table: "testimonials" },
    ];

    const results = await Promise.all(
      tables.map(async ({ key, table }) => {
        const { count, error } = await supabase
          .from(table)
          .select("*", { count: "exact", head: true });

        return {
          key,
          count: error ? 0 : count || 0,
        };
      })
    );

    const updatedStats = {};

    results.forEach(({ key, count }) => {
      updatedStats[key] = count;
    });

    setStats(updatedStats);
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      alert(error.message);
    }
  };

  const cards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: <FolderKanban size={22} />,
      path: "/admin/projects",
    },
    {
      title: "Services",
      value: stats.services,
      icon: <Wrench size={22} />,
      path: "/admin/services",
    },
    {
      title: "Blog Posts",
      value: stats.blogs,
      icon: <FileText size={22} />,
      path: "/admin/blogs",
    },
    {
      title: "General Enquiries",
      value: stats.enquiries,
      icon: <MessageSquare size={22} />,
      path: "/admin/enquiries",
    },
    {
      title: "Diaspora Enquiries",
      value: stats.diaspora,
      icon: <Globe size={22} />,
      path: "/admin/diaspora-enquiries",
    },
    {
      title: "Team Members",
      value: stats.team,
      icon: <Users size={22} />,
      path: "/admin/team-members",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: <Star size={22} />,
      path: "/admin/testimonials",
    },
  ];

  const menuGroups = [
    {
      heading: "Main Menu",
      items: [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/admin/dashboard",
        },
        {
          label: "Projects",
          icon: <FolderKanban size={18} />,
          path: "/admin/projects",
        },
        {
          label: "Services",
          icon: <Wrench size={18} />,
          path: "/admin/services",
        },
        {
          label: "Blog Posts",
          icon: <FileText size={18} />,
          path: "/admin/blogs",
        },
      ],
    },
    {
      heading: "Management",
      items: [
        {
          label: "Enquiries",
          icon: <MessageSquare size={18} />,
          path: "/admin/enquiries",
        },
        {
          label: "Diaspora Enquiries",
          icon: <Globe size={18} />,
          path: "/admin/diaspora-enquiries",
        },
        {
          label: "Team Members",
          icon: <Users size={18} />,
          path: "/admin/team-members",
        },
        {
          label: "Testimonials",
          icon: <Star size={18} />,
          path: "/admin/testimonials",
        },
      ],
    },
    {
      heading: "Configuration",
      items: [
        {
          label: "Settings",
          icon: <Settings size={18} />,
          path: null,
        },
      ],
    },
  ];

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>DUISBURG</h2>
          <p>DEVELOPERS ADMIN</p>
        </div>

        <nav className="admin-nav">
          {menuGroups.map((group) => (
            <div key={group.heading}>
              <p className="admin-nav-label">
                {group.heading}
              </p>

              {group.items.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <div
                    key={item.label}
                    onClick={() => {
                      if (item.path) {
                        navigate(item.path);
                      }
                    }}
                    className={`admin-nav-item ${
                      active ? "active" : item.path ? "" : "disabled"
                    }`}
                    title={
                      item.path
                        ? `Open ${item.label}`
                        : "Coming soon"
                    }
                    style={{
                      cursor: item.path ? "pointer" : "not-allowed",
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <h2>Admin Dashboard</h2>

          <div className="admin-actions">
            <span className="admin-user">
              {user?.email}
            </span>

            <button
              className="admin-logout"
              onClick={handleLogout}
            >
              <LogOut size={15} />
              {" "}Logout
            </button>
          </div>
        </header>

        <section className="admin-content">
          <div className="admin-welcome">
            <h1>
              Welcome, {profile?.full_name || "Administrator"}
            </h1>

            <p>
              Here is an overview of your website management system.
            </p>

            <p>
              Administrator role: <strong>{profile?.role}</strong>
            </p>
          </div>

          <div className="admin-actions" style={{ marginBottom: "20px" }}>
            <button
              className="admin-refresh"
              onClick={loadStats}
              disabled={loading}
            >
              <RefreshCw size={15} />
              {" "}{loading ? "Loading..." : "Refresh Statistics"}
            </button>
          </div>

          <div className="admin-stats">
            {cards.map((card) => (
              <div
                className="admin-stat-card"
                key={card.title}
                onClick={() => navigate(card.path)}
                style={{ cursor: "pointer" }}
                title={`Manage ${card.title}`}
              >
                <div className="admin-stat-top">
                  <span>{card.title}</span>

                  <div className="admin-stat-icon">
                    {card.icon}
                  </div>
                </div>

                <h2>
                  {loading ? "..." : card.value}
                </h2>

                <p>Records in database</p>
              </div>
            ))}
          </div>

          <div className="admin-section">
            <h3>Website Management</h3>

            <p>
              Your administrator dashboard is connected to Supabase.
              You can manage projects, services, blog posts, enquiries,
              diaspora enquiries, team members and testimonials.
            </p>

            <p>
              Select any management section from the sidebar or click
              a statistics card to open its module.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
