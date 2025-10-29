import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "@/services/api"; // pastikan api axios kamu sudah dikonfigurasi

export default function VerifyOtp() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [showResend, setShowResend] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // ambil email dari localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      navigate("/login");
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  // countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResend(true);
    }
  }, [countdown]);

  // format waktu: 2:00
  const formatCountdown = (): string => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // handle input change
  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return; // hanya angka
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("").slice(0, 6);
      setOtp(newOtp);
      inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
    }
  };

  // kirim OTP ke backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Mohon masukkan 6 digit OTP");
      return;
    }

    if (!email) {
      toast.error("Email tidak ditemukan. Silakan login ulang.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/verify-otp", {
        email,
        otp: otpValue,
      });

      const { status, message, data } = res.data;

      if (status === "success") {
        toast.success(message || "OTP berhasil diverifikasi!");
        localStorage.setItem("token", data.token);
        localStorage.removeItem("email");
        navigate("/complete-profile");
      } else {
        toast.error(message || "Verifikasi OTP gagal.");
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Verifikasi OTP gagal.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // resend OTP
  const handleResend = async () => {
    if (!email) return;
    try {
      await api.post("/resend-otp", { email });
      toast.success("Kode OTP telah dikirim ulang");
      setCountdown(120);
      setShowResend(false);
      setOtp(["", "", "", "", "", ""]);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gagal mengirim ulang OTP";
      toast.error(msg);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center flex-col mt-10">
      <div className="w-[380px] sm:w-[412px] min-h-[358px] flex items-center justify-center flex-col mt-20 sm:mt-[88px]">
        <div className="text-gray-900 text-4xl font-bold mb-4">OTP Email</div>

        <div className="text-center text-gray-900 text-base font-medium mb-12">
          Silakan cek kode OTP pada inbox email anda untuk{" "}
          <span className="font-bold">{email}</span>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-4 justify-between mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="font-bold w-11 h-12 rounded-md text-center bg-gray-50 text-sky-600 text-xl placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                placeholder="0"
              />
            ))}
          </div>

          {!loading ? (
            <button
              type="submit"
              className="w-full h-12 px-6 py-3 rounded-[50px] bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Konfirmasi
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="h-12 px-6 py-3 bg-blue-600 rounded-[50px] inline-flex items-center justify-center w-full"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                    5.291A7.962 7.962 0 014 12H0c0 
                    3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </button>
          )}
        </form>

        <div className="flex justify-center mt-8">
          <p className="text-black text-base font-normal mr-2">
            Kirim ulang kode OTP
          </p>
          {!showResend ? (
            <div className="text-blue-600 text-base">{formatCountdown()}</div>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-700 hover:underline"
            >
              Kirim Kode
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
