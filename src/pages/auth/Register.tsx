import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/newlogo.png";
import google from "@/assets/google.svg";
import toast from "react-hot-toast";
import api from "@/services/api";

export default function Register() {
  // const { setUser, refreshUserLimit } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmationError, setConfirmationError] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toogleConfirmationPassword = () =>
    setShowConfirmationPassword(!showConfirmationPassword);

  useEffect(() => {
    document.title = "Login | Brainys"; // ✅ ubah title tab browser
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    if (password !== confirmationPassword) {
      setConfirmationError(true);
    } else {
      setConfirmationError(false);
    }
  }, [password, confirmationPassword]);

  useEffect(() => {
    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/register", {
        email,
        password,
        password_confirmation: confirmationPassword,
      });

      const { status, message } = response.data;

      if (status === "success") {
        localStorage.setItem("email", email);
        toast.success("Registrasi berhasil! Silakan verifikasi OTP.");
        navigate("/verify-otp");
      } else {
        toast.error(message || "Registrasi gagal.");
      }
    } catch (error: any) {
      const res = error.response?.data;
      const errorEmail = res?.data?.email?.[0];

      if (errorEmail === "validation.unique") {
        toast.error("Email sudah digunakan, silakan gunakan email lain.");
      } else if (res?.message) {
        console.log("⚠️", res.message);
        toast.error(res.message);
      } else {
        console.log("⚠️ Terjadi kesalahan server.");
        toast.error("Terjadi kesalahan server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-inter max-w-7xl mx-auto">
      {/* Bagian kiri (gambar) */}

      {/* Bagian kanan (form) */}
      <div className="flex flex-col mx-auto justify-center items-center w-full md:w-1/2 md:px-8">
        {/* Logo */}
        <img src={logo} alt="Logo" className="mb-6 w-36" />

        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-sm p-6 space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-300"
              required
            />
            <p className="block mt-2 text-xs font-medium text-gray-500 dark:text-white">
              Direkomendasikan menggunakan email{" "}
              <span className="font-bold">belajar.id</span>
            </p>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-300"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            <span
              className={`block mt-2 text-xs font-medium transition-colors duration-300 ${
                password === ""
                  ? "text-gray-400" // 🩶 belum diketik → abu-abu
                  : passwordError
                  ? "text-red-500" // ❌ error
                  : "text-green-600" // ✅ valid
              }`}
            >
              {password === ""
                ? "Minimal password 8 karakter"
                : passwordError
                ? "❌ Minimal password 8 karakter"
                : "✅ Minimal password 8 karakter"}
            </span>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password
            </label>
            <input
              type={showConfirmationPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-300"
              required
            />
            <button
              type="button"
              onClick={toogleConfirmationPassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirmationPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
            <span
              className={`text-sm mt-1 block ${
                confirmationError ? "text-red-500" : "text-green-600"
              }`}
            >
              {confirmationError ? "Password tidak sama ❌" : ""}
            </span>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Masuk"
            )}
          </button>

          {/* Lupa password */}
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Lupa Password?
            </Link>
          </div>

          {/* Atau login dengan */}
          <div className="text-center text-gray-500">atau</div>

          {/* Login dengan Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
          >
            <img src={google} alt="Google" className="w-5 h-5" />
            <span>Masuk dengan Google</span>
          </button>

          {/* Daftar akun */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Daftar di sini
            </Link>
          </p>
        </form>

        {/* Bantuan */}
        <div className="text-sm text-gray-600 text-center mt-4">
          Butuh bantuan?{" "}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            className="text-green-600 font-medium hover:underline"
          >
            Hubungi Admin
          </a>
        </div>
      </div>
    </div>
  );
}
