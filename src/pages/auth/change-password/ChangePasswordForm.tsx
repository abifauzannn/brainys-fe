import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/services/api";
import Layout from "@/layouts/Layout";
import PageTitle from "@/components/PageTitle";
import Label from "@/components/Label";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);

  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [confirmationError, setConfirmationError] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const toggleOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmationPassword = () =>
    setShowConfirmationPassword(!showConfirmationPassword);

  // Update page title
  useEffect(() => {
    document.title = "Change Password | Brainys";
  }, []);

  // Validate new password length
  useEffect(() => {
    if (newPassword.length > 0 && newPassword.length < 8) {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
  }, [newPassword]);

  // Validate password confirmation match
  useEffect(() => {
    if (
      confirmationPassword.length > 0 &&
      newPassword !== confirmationPassword
    ) {
      setConfirmationError(true);
    } else {
      setConfirmationError(false);
    }
  }, [newPassword, confirmationPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (newPassword.length < 8) {
      toast.error("Password baru minimal 8 karakter");
      return;
    }

    if (newPassword !== confirmationPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/change-password", {
        current_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmationPassword,
      });

      const { status, message } = response.data;

      if (status === "success") {
        toast.success(message || "Password berhasil diubah!");

        // Clear form
        setOldPassword("");
        setNewPassword("");
        setConfirmationPassword("");

        // Redirect to profile or dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error: any) {
      const res = error.response?.data;

      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.error("Gagal mengubah password. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageTitle
        title="Ubah Password"
        description="Ubah password akun Anda untuk keamanan yang lebih baik"
        urlBack="/dashboard"
      />

      <div className="flex flex-col mx-auto justify-center items-center w-full md:w-1/2 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-sm p-6 space-y-4"
        >
          {/* Old Password */}
          <div className="relative">
            <Label title="Password Lama" htmlFor="oldPassword" />
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Masukkan password lama"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-300"
              required
            />
            <button
              type="button"
              onClick={toggleOldPassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Label title="Password Baru" htmlFor="newPassword" />
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Masukkan password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-300"
              required
            />
            <button
              type="button"
              onClick={toggleNewPassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            <span
              className={`block mt-2 text-xs font-medium transition-colors duration-300 ${
                newPassword === ""
                  ? "text-gray-400"
                  : newPasswordError
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {newPassword === ""
                ? "Minimal password 8 karakter"
                : newPasswordError
                ? "❌ Minimal password 8 karakter"
                : "✅ Minimal password 8 karakter"}
            </span>
          </div>

          {/* Confirmation Password */}
          <div className="relative">
            <Label
              title="Konfirmasi Password Baru"
              htmlFor="confirmationPassword"
            />
            <input
              type={showConfirmationPassword ? "text" : "password"}
              id="confirmationPassword"
              placeholder="Masukkan ulang password baru"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-300"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmationPassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirmationPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

            {confirmationPassword && (
              <span
                className={`block mt-2 text-xs font-medium ${
                  confirmationError ? "text-red-500" : "text-green-600"
                }`}
              >
                {confirmationError
                  ? "❌ Password tidak sama"
                  : "✅ Password cocok"}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || newPasswordError || confirmationError}
            className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Ubah Password"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
}
