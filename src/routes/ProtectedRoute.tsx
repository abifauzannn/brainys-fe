import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode; // ✅ ganti dari JSX.Element ke React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    // 🔒 kalau belum login, redirect ke /login
    return <Navigate to="/login" replace />;
  }

  // ✅ kalau sudah login, tampilkan halaman anaknya
  return <>{children}</>;
}
