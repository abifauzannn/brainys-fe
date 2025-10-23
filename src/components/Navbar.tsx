import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import logo from "@/assets/newlogo.png";

interface User {
  name: string;
  profession?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
              <div className="absolute right-8 mt-[31px] border bg-white rounded-lg shadow p-3 transform translate-x-1/4 w-48 z-10">
                <ul>
                  <li
                    className="flex items-center hover:bg-gray-100 hover:rounded-lg px-1 cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    <img
                      src="/images/user-circle.png"
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                    <span className="block pl-3 py-2 text-[14px] text-slate-500">
                      Profile Pengguna
                    </span>
                  </li>

                  <li
                    className="flex items-center hover:bg-gray-100 hover:rounded-lg px-1 cursor-pointer"
                    onClick={() => navigate("/history")}
                  >
                    <img
                      src="/images/Union.png"
                      alt=""
                      className="w-[18px] h-[20px]"
                    />
                    <span className="block pl-3.5 py-2 text-[14px] text-slate-500">
                      Riwayat
                    </span>
                  </li>

                  <li
                    className="flex items-center hover:bg-gray-100 hover:rounded-lg px-1 cursor-pointer"
                    onClick={() => navigate("/langganan")}
                  >
                    <img
                      src="/images/credit-card.png"
                      alt=""
                      className="w-[18px] h-[20px]"
                    />
                    <span className="block pl-3.5 py-2 text-[14px] text-slate-500">
                      Langganan
                    </span>
                  </li>

                  <li
                    className="flex items-center hover:bg-gray-100 hover:rounded-lg px-1 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <img
                      src="/images/sign-out.svg"
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                    <span className="block pl-3 py-2 text-[14px] text-slate-500">
                      Logout
                    </span>
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
