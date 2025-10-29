import Layout from "@/layouts/Layout";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import api from "@/services/api";
import toast from "react-hot-toast";
import ModulAjar from "@/assets/modulajar.png";
import Syllabus from "@/assets/syllabus.png";
import Soal from "@/assets/soal.png";
import BahanAjar from "@/assets/bahanajar.png";
import Gamifikasi from "@/assets/gamifikasi.png";
import Kisi from "@/assets/kisikisi.png";
import Atp from "@/assets/atp.png";
import Rubrik from "@/assets/rubrik.png";
import Surat from "@/assets/surat.png";
import newBanner from "@/assets/newbanner.png";
import WhatsappLogo from "@/assets/whatsapp.png";

type DashboardItem = {
  url: string;
  icon: string;
  title: string;
  description: string;
  status: "baru" | "old" | "cs";
};

const dashboardItems: DashboardItem[] = [
  {
    url: "/generate-modul-ajar",
    icon: ModulAjar,
    title: "Templat Modul Ajar",
    description: "Gunakan templat modul ajar kurikulum merdeka",
    status: "old",
  },
  {
    url: "/generate-syllabus",
    icon: Syllabus,
    title: "Templat Silabus",
    description: "Gunakan templat silabus merdeka belajar",
    status: "old",
  },
  {
    url: "/generate-soal",
    icon: Soal,
    title: "Templat Soal",
    description: "Gunakan templat soal untuk sekolah",
    status: "old",
  },
  {
    url: "/generate-bahan-ajar",
    icon: BahanAjar,
    title: "Templat Bahan Ajar",
    description: "Gunakan templat bahan materi pembelajaran",
    status: "baru",
  },
  {
    url: "/generate-gamifikasi",
    icon: Gamifikasi,
    title: "Templat Materi Gamifikasi",
    description: "Gunakan templat materi berbasis gamifikasi",
    status: "baru",
  },
  {
    url: "/generate-kisi-kisi",
    icon: Kisi,
    title: "Templat Kisi Kisi Soal",
    description: "Gunakan templat kisi-kisi soal dari capaian pembelajaran",
    status: "baru",
  },
  {
    url: "/generate-atp",
    icon: Atp,
    title: "Templat Alur Tujuan Pembelajaran (ATP)",
    description: "Gunakan templat ATP kurikulum merdeka mengajar",
    status: "baru",
  },
  {
    url: "",
    icon: Rubrik,
    title: "Templat Rubrik Nilai",
    description: "Gunakan templat rubrik penilaian siswa",
    status: "cs",
  },
  {
    url: "",
    icon: Surat,
    title: "Templat Persuratan",
    description: "Gunakan templat persuratan sekolah dan administrasi",
    status: "cs",
  },
];

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is not active
  useEffect(() => {
    if (user && user.is_active === 0) {
      setShowPopup(true);
      // Prevent body scroll when popup is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scroll when popup is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [user]);

  // Handle invite code submit
  const handleSubmitInviteCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteCode || inviteCode.length !== 8) {
      toast.error("Kode undangan harus 8 karakter");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/user-invitations/redeem", {
        invite_code: inviteCode,
      });

      const { status, message } = response.data;

      if (status === "success") {
        toast.success(message || "Kode undangan berhasil digunakan!");

        // Update user data di localStorage
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        currentUser.is_active = 1;
        localStorage.setItem("user", JSON.stringify(currentUser));

        // Re-enable body scroll
        document.body.style.overflow = "unset";

        // Close popup
        setShowPopup(false);

        // Reload page to refresh user context
        window.location.reload();
      }
    } catch (error: any) {
      const res = error.response?.data;
      toast.error(res?.message || "Kode undangan tidak valid");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Re-enable body scroll
    document.body.style.overflow = "unset";

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Layout title="Dashboard">
      {/* Welcome Popup for Inactive Users */}
      {showPopup && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-50 backdrop-blur-sm overflow-hidden">
          <div className="bg-white w-[300px] sm:w-[500px] p-5 sm:p-8 rounded-lg shadow-md text-center flex flex-col items-center max-h-[90vh] overflow-y-auto">
            <p className="mb-2 text-xs leading-normal text-gray-600 sm:text-base">
              Sebelum anda mulai, masukkan kode undangan dulu yuk!
            </p>

            <form onSubmit={handleSubmitInviteCode} className="w-full">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="w-full py-3 text-center border border-gray-300 rounded-md placeholder:text-xs focus:border-blue-600 focus:border-2 focus:outline-none"
                placeholder="masukkan 8 karakter kode undangan di sini"
                maxLength={8}
                required
              />

              <p className="mt-2 text-xs leading-normal text-gray-600">
                Silakan periksa kode undangan di inbox (Kotak Masuk) email Anda!
                Jika tidak ada, silahkan cek dibagian spam
              </p>

              <div className="flex justify-center w-full gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 mt-4 font-semibold text-blue-600 bg-white rounded shadow-md focus:outline-none hover:bg-gray-50"
                >
                  Keluar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>

              <div className="flex items-center justify-center pt-10">
                <img
                  src={WhatsappLogo}
                  alt="WhatsApp Logo"
                  className="object-cover w-5 h-5 mr-2"
                />
                <a
                  href="https://wa.link/z2edgq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col text-base font-medium leading-normal text-center hover:font-bold"
                >
                  Butuh Bantuan?
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        className={`w-full h-auto mb-3 sm:mb-0 md:mb-3 ${
          showPopup ? "pointer-events-none" : ""
        }`}
      >
        {/* Banner untuk layar lg */}
        <img
          src={newBanner}
          alt="Banner"
          className="w-full h-[134px] object-cover hidden lg:block p-2"
          loading="lazy"
        />

        {/* Banner untuk layar kecil (mobile/tablet) */}
        <div className="bg-gray-900 py-4 px-4 md:py-7 md:px-[51px] gap-3 rounded-2xl lg:hidden">
          <div className="text-white text-2xl md:text-[32px] font-bold leading-[49.99px]">
            Selamat datang
          </div>
          <div className="text-sm font-normal leading-tight text-white sm:text-xs">
            Brainys merupakan aplikasi AI Text Generation untuk kebutuhan
            administrasi dan akademik
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${
          showPopup ? "pointer-events-none" : ""
        }`}
      >
        {dashboardItems.map((item) => {
          const isDisabled = [
            "Templat Rubrik Nilai",
            "Templat Persuratan",
          ].includes(item.title);
          const badge =
            item.status === "baru"
              ? "BARU"
              : item.status === "cs"
              ? "SEGERA"
              : null;

          if (!isDisabled) {
            return (
              <Link
                key={item.title}
                to={item.url}
                className="p-4 rounded-lg border border-gray-300 flex flex-col items-start shadow-md hover:bg-slate-50 transition duration-300"
              >
                <div className="flex items-center justify-between w-full">
                  <img src={item.icon} alt={item.title} className="w-10 h-10" />
                  {badge && (
                    <span className="bg-[#88F2C8] text-black text-xs font-bold px-2 py-1 rounded-full -mt-5">
                      {badge}
                    </span>
                  )}
                </div>
                <div className="w-full py-2 text-left font-bold text-gray-900">
                  {item.title}
                </div>
                <div className="text-xs text-black w-full break-words">
                  {item.description}
                </div>
              </Link>
            );
          }

          return (
            <div
              key={item.title}
              className="p-4 rounded-lg border border-gray-300 flex flex-col items-start shadow-md opacity-50 cursor-not-allowed"
            >
              <div className="flex items-center justify-between w-full">
                <img src={item.icon} alt={item.title} className="w-10 h-10" />
                {badge && (
                  <span className="bg-[#88F2C8] text-black text-xs font-bold px-2 py-1 rounded-full -mt-5">
                    {badge}
                  </span>
                )}
              </div>
              <div className="w-full py-2 text-left font-bold text-gray-900">
                {item.title}
              </div>
              <div className="text-xs text-black w-full break-words">
                {item.description}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`flex items-center justify-center pt-8 ${
          showPopup ? "pointer-events-none" : ""
        }`}
      >
        <a
          href="https://wa.link/z2edgq"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full max-w-[224px] h-12 px-6 rounded-md flex justify-center items-center gap-2.5 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
        >
          <img
            src={WhatsappLogo}
            alt="WhatsApp Logo"
            className="object-cover w-5 h-5"
            loading="lazy"
          />
          <span className="flex flex-col text-base font-medium leading-normal text-center group-hover:font-bold">
            Butuh Bantuan?
          </span>
        </a>
      </div>
    </Layout>
  );
}
