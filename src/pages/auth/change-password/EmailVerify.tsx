import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { useUser } from "@/context/UserContext";
import PageTitle from "@/components/PageTitle";
import { FaCheckCircle } from "react-icons/fa";
import Label from "@/components/Label";

interface EmailVerify {
  email: string;
}

const EmailVerify: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState<EmailVerify>({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Sinkronisasi user -> formData
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi verifikasi 3 detik
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (formData.email !== user?.email) {
      toast.error("Email tidak sesuai dengan pengguna yang sedang login!");
      setLoading(false);
      return;
    }

    toast.success("Verifikasi berhasil! Silakan lanjut ubah password.");
    setLoading(false);
    navigate("/change-password");
  };

  return (
    <Layout>
      <PageTitle title="Change Password" description="" urlBack="/dashboard" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto space-y-6"
      >
        {/* Nama Lengkap */}
        <div className="flex flex-col mb-6">
          <Label title="Email" htmlFor="email" />
          <input
            ref={nameInputRef}
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Contoh: Budiman"
            required
          />
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-center mt-6">
          {!loading ? (
            <button
              type="submit"
              className="w-1/2 h-12 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FaCheckCircle size={15} className="text-white" />
              <span className="text-white text-base font-medium">
                Verifikasi Email
              </span>
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="1/2 h-12 px-6 bg-blue-600 rounded-lg flex items-center justify-center gap-2"
            >
              <svg
                className="animate-spin h-5 w-5 text-white"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-white text-base ml-2">
                Proses verifikasi...
              </span>
            </button>
          )}
        </div>
      </form>
    </Layout>
  );
};

export default EmailVerify;
