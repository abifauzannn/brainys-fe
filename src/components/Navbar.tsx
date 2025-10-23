import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import logo from "@/assets/newlogo.png";
import api from "@/services/api"; // import axios instance
import { IoSparklesOutline } from "react-icons/io5";
import { PiCreditCard, PiSignOut } from "react-icons/pi";
import { AiOutlineHistory } from "react-icons/ai";
import { FiUser } from "react-icons/fi";

interface User {
  name: string;
  profession?: string;
}

interface UserLimit {
  limit: number;
  used: number;
  credit: number;
  package_name: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [userLimit, setUserLimit] = useState<UserLimit>({
    limit: 0,
    used: 0,
    credit: 0,
    package_name: "Tidak ada paket aktif",
  });

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));

      // pakai axios instance untuk ambil user limit
      api
        .get("/user-profile")
        .then((res) => {
          const data = res.data?.data ?? {};
          const credits = data.credits ?? {};
          const packageData = data.package?.[0] ?? {};
          setUserLimit({
            limit: credits.limit ?? 0,
            used: credits.used ?? 0,
            credit: credits.credit ?? 0,
            package_name: packageData.package_name ?? "Tidak ada paket aktif",
          });
        })
        .catch((err) => {
          console.error("Gagal mengambil user limit:", err);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  const getInitials = (name: string): string => {
    const names = name.split(" ");
    let initials = "";
    for (let i = 0; i < names.length; i++) {
      if (initials.length < 2) {
        initials += names[i][0].toUpperCase();
      }
    }
    return initials;
  };

  const handleLogout = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container w-full mx-auto px-4 py-3 justify-center bg-white border-b border-zinc-200 font-['Inter']">
      <div className="flex justify-between items-center">
        <div>
          <img
            src={logo}
            alt="Logo"
            className="w-[120px] md:w-[140px] object-cover cursor-pointer"
            onClick={() => navigate("/dashboard")}
            loading="lazy"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center gap-3 text-xs text-gray-700 mt-1 border border-gray-300 rounded-lg py-1 px-2">
            <IoSparklesOutline size={20} />
            <div className="flex flex-col">
              <span className="font-semibold">{userLimit.package_name}</span>
              Sisa credit: {userLimit.credit}
            </div>
          </div>
          <div className="flex-col items-start hidden md:block">
            <div className="text-gray-900 text-base font-medium font-inter leading-normal">
              {user.name}
            </div>
            <div className="text-gray-500 text-sm font-normal font-inter leading-snug">
              {user.profession || "Pengguna"}
            </div>
          </div>

          <div className="w-10 h-10 md:w-12 md:h-12 text-white flex items-center justify-center text-md md:text-lg font-['Inter'] font-bold rounded-full bg-[#b6e3f4]">
            {getInitials(user.name)}
          </div>

          <div className="relative">
            <IoIosArrowDown onClick={() => setDropdownOpen(!dropdownOpen)} />

            {dropdownOpen && (
              <div className="absolute right-8 mt-[31px] border border-gray-300 bg-white rounded-lg shadow p-3 transform translate-x-1/4 w-48 z-10">
                <ul>
                  <li className="flex items-center hover:bg-gray-100 hover:rounded-lg px-1 cursor-pointer">
                    <Link
                      to="/profile"
                      className="flex items-center w-full"
                      onClick={() => setDropdownOpen(false)} // optional: tutup dropdown setelah klik
                    >
                      <FiUser size={20} />
                      <span className="block pl-3 py-2 text-[14px] text-slate-500">
                        Profile Pengguna
                      </span>
                    </Link>
                  </li>

                  <li className="flex items-center hover:bg-gray-100 hover:rounded-lg px-1 cursor-pointer">
                    <Link
                      to="/history"
                      className="flex items-center w-full"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <AiOutlineHistory size={20} />
                      <span className="block pl-3.5 py-2 text-[14px] text-slate-500">
                        Riwayat
                      </span>
                    </Link>
                  </li>

                  <li className="flex items-center hover:bg-gray-100 hover:rounded-lg px-1 cursor-pointer">
                    <Link
                      to="/langganan"
                      className="flex items-center w-full"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <PiCreditCard size={20} />
                      <span className="block pl-3.5 py-2 text-[14px] text-slate-500">
                        Langganan
                      </span>
                    </Link>
                  </li>

                  <li className="flex items-center hover:bg-gray-100 hover:rounded-lg px-1 cursor-pointer">
                    <button
                      className="flex items-center w-full"
                      onClick={handleLogout}
                    >
                      <PiSignOut size={20} />
                      <span className="block pl-3 py-2 text-[14px] text-slate-500">
                        Logout
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
