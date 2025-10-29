import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import api from "@/services/api";

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

interface CompleteProfileProps {
  onSubmit?: (data: ProfileData) => Promise<void>;
}

const CompleteProfile: React.FC<CompleteProfileProps> = ({}) => {
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    school_level: "",
    school_name: "",
    profession: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedJenjang, setSelectedJenjang] = useState<Option | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Jenjang options
  const jenjangOptions: Option[] = [
    { value: "sd", label: "SD/MI Sederajat" },
    { value: "smp", label: "SMP/MTs Sederajat" },
    { value: "sma", label: "SMA/SMK/MA Sederajat" },
    { value: "paketa", label: "Pendidikan Kesetaraan Paket A" },
    { value: "paketb", label: "Pendidikan Kesetaraan Paket B" },
    { value: "paketc", label: "Pendidikan Kesetaraan Paket C" },
  ];

  // Custom styles untuk react-select
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

  // Auto focus on name input
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select change
  const handleSelectChange = (option: Option | null) => {
    setSelectedJenjang(option);
    setFormData((prev) => ({
      ...prev,
      school_level: option?.value || "",
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.post("/profile", {
        name: formData.name,
        school_level: formData.school_level,
        school_name: formData.school_name,
        profession: formData.profession,
      });

      const { status, data, message } = response.data;

      if (status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(message || "Profile berhasil dilengkapi!");

        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      const res = error.response?.data;
      toast.error(res?.message || "Gagal menyimpan profile");
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center mx-auto mt-10">
      {/* Main Content */}
      <div className="w-full p-3 min-h-[420px] flex items-center justify-center flex-col ">
        {/* Title */}
        <div className="text-gray-900 text-4xl font-bold font-['Inter'] leading-[48px] mt-4 mb-4">
          Lengkapi Profile
        </div>

        {/* Description */}
        <div className="text-center text-gray-900 text-base font-medium font-['Inter'] leading-normal mb-8">
          Silakan lengkapi profile anda terlebih dahulu
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* Nama Lengkap */}
          <div className="flex flex-col mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              Nama Lengkap
            </label>
            <input
              ref={nameInputRef}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             placeholder:text-gray-300"
              placeholder="Contoh: Budiman"
              required
            />
          </div>

          {/* Jenjang */}
          <div className="flex flex-col mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900  ">
              Jenjang
            </label>
            <Select
              value={selectedJenjang}
              onChange={handleSelectChange}
              options={jenjangOptions}
              styles={customSelectStyles}
              placeholder="Pilih Jenjang"
              isSearchable
              noOptionsMessage={() => "Tidak ada data"}
              className="text-sm"
            />
          </div>

          {/* Sekolah */}
          <div className="flex flex-col mb-6">
            <label
              htmlFor="school_name"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              Sekolah
            </label>
            <input
              type="text"
              id="school_name"
              name="school_name"
              value={formData.school_name}
              onChange={handleChange}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             placeholder:text-gray-300"
              placeholder="Contoh: SMP 1 Bandung"
              required
            />
          </div>

          {/* Profesi */}
          <div className="flex flex-col mb-6">
            <label
              htmlFor="profession"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              Profesi
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             placeholder:text-gray-300"
              placeholder="Contoh: Guru Biologi"
              required
            />
          </div>

          {/* Submit Button */}
          {!loading ? (
            <button
              type="submit"
              className="w-full h-12 px-6 my-5 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2.5 transition-colors"
            >
              <img
                src="/images/arrow.svg"
                alt="Arrow"
                className="w-[20px] h-[20px]"
              />
              <div className="text-center text-white text-base font-medium font-['Inter'] leading-normal">
                Konfirmasi
              </div>
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full h-12 px-6 my-5 bg-blue-600 rounded-lg flex items-center justify-center gap-2"
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
              <span className="text-white text-base ml-2">Sedang Proses</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
