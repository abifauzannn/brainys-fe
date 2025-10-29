import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import api from "@/services/api";
import { Link } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { useUser } from "@/context/UserContext";
import PageTitle from "@/components/PageTitle";
import { FaCheckCircle } from "react-icons/fa";
import Label from "@/components/Label";

interface Option {
  value: string;
  label: string;
}

interface ProfileData {
  name: string;
  school_level: string;
  school_name: string;
  profession: string;
}

const Profile: React.FC = () => {
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    school_level: "",
    school_name: "",
    profession: "",
  });

  const [loading, setLoading] = useState(false);
  const [selectedJenjang, setSelectedJenjang] = useState<Option | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const jenjangOptions: Option[] = [
    { value: "sd", label: "SD/MI Sederajat" },
    { value: "smp", label: "SMP/MTs Sederajat" },
    { value: "sma", label: "SMA/SMK/MA Sederajat" },
    { value: "paketa", label: "Pendidikan Kesetaraan Paket A" },
    { value: "paketb", label: "Pendidikan Kesetaraan Paket B" },
    { value: "paketc", label: "Pendidikan Kesetaraan Paket C" },
  ];

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
      minHeight: "42px",
      borderRadius: "0.5rem",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#d1d5db",
      fontSize: "0.875rem",
    }),
    input: (base: any) => ({
      ...base,
      fontSize: "0.875rem",
    }),
    singleValue: (base: any) => ({
      ...base,
      fontSize: "0.875rem",
    }),
    menu: (base: any) => ({
      ...base,
      fontSize: "0.875rem",
    }),
  };

  // Sinkronisasi user -> formData
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        school_level: user.school_level || "",
        school_name: user.school_name || "",
        profession: user.profession || "",
      });

      if (user.school_level) {
        const found = jenjangOptions.find(
          (opt) => opt.value === user.school_level
        );
        setSelectedJenjang(found || null);
      }
    }
  }, [user]);

  const getInitials = (name: string): string => {
    const names = name.trim().split(" ");
    return names
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase() || "")
      .join("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (option: Option | null) => {
    setSelectedJenjang(option);
    setFormData((prev) => ({ ...prev, school_level: option?.value || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/profile", formData);
      const { status, data, message } = response.data;

      if (status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        toast.success(message || "Profil berhasil diperbarui!");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat menyimpan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageTitle title="Profil Pengguna" description="" urlBack="/dashboard" />

      <div className="flex flex-col items-center justify-center mt-[30px] mb-6">
        <div className="w-20 h-20 text-white flex items-center justify-center text-4xl font-bold rounded-full bg-[#b6e3f4]">
          {getInitials(formData.name || "U")}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto space-y-6"
      >
        {/* Nama Lengkap */}
        <div className="flex flex-col mb-6">
          <Label title="Nama Lengkap" htmlFor="name" />
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Contoh: Budiman"
            required
          />
        </div>

        {/* Profesi */}
        <div className="flex flex-col mb-6">
          <Label title="Profesi" htmlFor="profession" />
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Contoh: Guru, Mahasiswa, Dosen"
          />
        </div>

        {/* Asal Sekolah */}
        <div className="flex flex-col mb-6">
          <Label title="Asal Sekolah" htmlFor="school_name" />
          <input
            type="text"
            id="school_name"
            name="school_name"
            value={formData.school_name}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Contoh: SDN 1 Jakarta"
          />
        </div>

        {/* Jenjang */}
        <div>
          <Label title="Jenjang" htmlFor="" />
          <Select
            value={selectedJenjang}
            onChange={handleSelectChange}
            options={jenjangOptions}
            styles={customSelectStyles}
            placeholder="Pilih Jenjang"
          />
        </div>

        <Link to="/profile" className="text-right mb-6">
          <span className="block text-[14px] text-blue-600">
            Ganti Password
          </span>
        </Link>

        {/* Tombol Submit */}
        <div className="flex justify-center mt-6">
          {!loading ? (
            <button
              type="submit"
              className="w-full h-12 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FaCheckCircle size={15} className="text-white" />
              <span className="text-white text-base font-medium">
                Simpan Profil
              </span>
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full h-12 px-6 bg-blue-600 rounded-lg flex items-center justify-center gap-2"
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
              <span className="text-white text-base ml-2">Menyimpan...</span>
            </button>
          )}
        </div>
      </form>
    </Layout>
  );
};

export default Profile;
