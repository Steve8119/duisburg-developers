
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import "./AdminLogin.css";

import { useAuth } from "../../context/AuthContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await signIn(email.trim(), password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await resetPassword(email.trim());
      setMessage("Password reset instructions have been sent to your email.");
    } catch (err) {
      setError(err.message || "Unable to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>

      <div className="login-container">

        <div className="login-brand">
          <div className="login-logo">
            <Building2 size={34} />
          </div>

          <div>
            <h1>DUISBURG</h1>
            <span>DEVELOPERS</span>
          </div>
        </div>

        <div className="login-card">

          <div className="login-card-heading">
            <div className="login-shield">
              <ShieldCheck size={27} />
            </div>

            <p className="login-eyebrow">ADMINISTRATOR PORTAL</p>

            <h2>Welcome Back</h2>

            <p className="login-description">
              Sign in to manage your website,
              projects and enquiries.
            </p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="login-input-group">
              <label htmlFor="email">Email Address</label>

              <div className="login-input-wrapper">
                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>

              <div className="login-input-wrapper">
                <LockKeyhole size={19} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {message && (
              <div className="login-success">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={19} className="login-spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={19} />
                </>
              )}
            </button>

          </form>

          <button
            type="button"
            className="forgot-password"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Forgot your password?
          </button>

          <div className="login-security">
            <LockKeyhole size={15} />
            Secure administrator access
          </div>

        </div>

        <div className="login-footer">
          <Link to="/">Back to Website</Link>

          <p>
            © {new Date().getFullYear()} Duisburg Developers.
            All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;
