import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import onboarding from "@/assets/newonboarding.png";
import logo from "@/assets/newlogo.png";
import google from "@/assets/google.svg";
import toast from "react-hot-toast";
import api from "@/services/api";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const { setUser, refreshUserLimit } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    document.title = "Login | Brainys"; // ✅ ubah title tab browser
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("email", email);

    try {
      const response = await api.post("/login", { email, password });
      const { status, data, message } = response.data;

      if (status === "success") {
        // ✅ Login sukses
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("email");

        setUser(data.user);
        await refreshUserLimit();

        toast.success(message || "Login berhasil");
        navigate("/dashboard");
      }
    } catch (error: any) {
      const res = error.response?.data;
      toast.error(res.message);
      console.log(res);
      localStorage.removeItem("email");

      // 🟡 Jika belum verifikasi OTP
      if (res?.message && res.message.includes("verifikasi OTP")) {
        localStorage.setItem("email", email);

        try {
          // 🔁 Kirim permintaan resend OTP ke backend Laravel
          await api.post("/resend-otp", { email });

          toast.success("Kode OTP telah dikirim ke email Anda.");
        } catch (resendError: any) {
          toast.error("Gagal mengirim OTP. Silakan coba lagi.");
        }

        // 🔀 Arahkan ke halaman verifikasi OTP
        navigate("/verify-otp");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-inter max-w-7xl mx-auto">
      {/* Bagian kiri (gambar) */}
      <div className="hidden md:flex items-center justify-center w-1/2">
        <img
          src={onboarding}
          alt="Onboarding"
          className="w-[500px] h-[515px] object-cover"
        />
      </div>

      {/* Bagian kanan (form) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 md:px-8">
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
