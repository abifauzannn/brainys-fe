import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import ModulAjar from "@/pages/generate/ModulAjar/ModulAjar";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { UserProvider } from "@/context/UserContext"; // ✅
import Syllabus from "./pages/generate/Syllabus/Syllabus";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-modul-ajar"
            element={
              <ProtectedRoute>
                <ModulAjar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-syllabus"
            element={
              <ProtectedRoute>
                <Syllabus />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
