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
import Soal from "./pages/generate/Soal/Soal";
import NotFound from "./pages/NotFound";
import Atp from "./pages/generate/BahanAjar/BahanAjar";
import Gamifikasi from "./pages/generate/Gamifikasi/Gamifikasi";
import Kisi from "./pages/Kisi/Kisi";

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
          <Route
            path="/generate-soal"
            element={
              <ProtectedRoute>
                <Soal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-bahan-ajar"
            element={
              <ProtectedRoute>
                <Atp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-gamifikasi"
            element={
              <ProtectedRoute>
                <Gamifikasi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate-kisi-kisi"
            element={
              <ProtectedRoute>
                <Kisi />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
