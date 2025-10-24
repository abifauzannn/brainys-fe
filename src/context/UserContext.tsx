import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "@/services/api";

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

interface UserContextType {
  user: User | null;
  userLimit: UserLimit;
  setUser: (user: User | null) => void;
  refreshUserLimit: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLimit, setUserLimit] = useState<UserLimit>({
    limit: 0,
    used: 0,
    credit: 0,
    package_name: "Tidak ada paket aktif",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      refreshUserLimit();
    }
  }, []);

  const refreshUserLimit = async () => {
    console.log("refreshUserLimit called");
    try {
      const res = await api.get("/user-profile");
      console.log("API response:", res.data);

      const data = res.data?.data ?? {};
      const credits = data.credits ?? {};
      const packageData = data.package?.[0]; // ambil paket pertama

      setUserLimit({
        limit: credits.limit ?? 0,
        used: credits.used ?? 0,
        credit: credits.credit ?? 0,
        package_name: packageData?.package_name ?? "Tidak ada paket aktif",
      });
    } catch (err) {
      console.error("Gagal fetch user profile:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, userLimit, setUser, refreshUserLimit }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser harus digunakan dalam UserProvider");
  return context;
};
