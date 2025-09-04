"use client"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import {
  CodeBracketIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Squares2X2Icon,
  ClockIcon,
} from "@heroicons/react/24/outline"

const Navbar = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: isDark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div
            style={{
              background: "linear-gradient(135deg,#2563eb,#9333ea)",
              padding: "8px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CodeBracketIcon style={{ width: "22px", height: "22px", color: "white" }} />
          </div>
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              background: "linear-gradient(135deg,#2563eb,#9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ComponentAI
          </span>
        </Link>

        {/* Navigation Links */}
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              to="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: isActive("/dashboard") ? 600 : 500,
                textDecoration: "none",
                color: isActive("/dashboard")
                  ? isDark
                    ? "#93c5fd"
                    : "#2563eb"
                  : isDark
                  ? "#cbd5e1"
                  : "#475569",
                background: isActive("/dashboard")
                  ? "linear-gradient(135deg,rgba(37,99,235,0.15),rgba(147,51,234,0.15))"
                  : "transparent",
              }}
            >
              <Squares2X2Icon style={{ width: "18px", height: "18px" }} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/sessions"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: isActive("/sessions") ? 600 : 500,
                textDecoration: "none",
                color: isActive("/sessions")
                  ? isDark
                    ? "#93c5fd"
                    : "#2563eb"
                  : isDark
                  ? "#cbd5e1"
                  : "#475569",
                background: isActive("/sessions")
                  ? "linear-gradient(135deg,rgba(37,99,235,0.15),rgba(147,51,234,0.15))"
                  : "transparent",
              }}
            >
              <ClockIcon style={{ width: "18px", height: "18px" }} />
              <span>Sessions</span>
            </Link>
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: isDark ? "#1e293b" : "#f1f5f9",
              border: "none",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isDark ? (
              <SunIcon style={{ width: "18px", height: "18px", color: "#facc15" }} />
            ) : (
              <MoonIcon style={{ width: "18px", height: "18px", color: "#334155" }} />
            )}
          </button>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: isDark ? "rgba(30,41,59,0.7)" : "rgba(241,245,249,0.7)",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: isDark ? "#cbd5e1" : "#334155",
                }}
              >
                <UserCircleIcon style={{ width: "18px", height: "18px" }} />
                <span>{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: isDark ? "#cbd5e1" : "#475569",
                }}
              >
                <ArrowRightOnRectangleIcon style={{ width: "18px", height: "18px" }} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link
                to="/login"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: isDark ? "#cbd5e1" : "#8e4585",
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  background: "linear-gradient(135deg,#2563eb,#9333ea)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
