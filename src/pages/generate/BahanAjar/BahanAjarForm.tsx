import { useEffect, useState, type FormEvent, useMemo } from "react";
import Select from "react-select";
import api from "@/services/api";
import { IoSearchCircle, IoSparklesOutline } from "react-icons/io5";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";

interface Option {
  value: string;
  label: string;
}

interface BahanAjarFormProps {
  onResult?: (text: string) => void;
  onLoadingChange?: (loading: boolean) => void;
  onGenerateId?: (id: string) => void;
}

const BahanAjarForm: React.FC<BahanAjarFormProps> = ({
  onResult,
  onLoadingChange,
  onGenerateId,
}) => {
  const { refreshUserLimit, user } = useUser();
  const [name, setName] = useState("");
  const [mapel, setMapel] = useState("");
  const [notes, setNotes] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedKelas, setSelectedKelas] = useState<Option | null>(null);

  const [credit, setCredit] = useState<number | null>(null);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://be.brainys.oasys.id/api";

  const sessionLevel = user?.school_level?.toLowerCase() || "";

  // Generate kelas options berdasarkan school level
  const kelasOptions: Option[] = useMemo(() => {
    const options: Option[] = [];
    const schoolLevel = sessionLevel;

    if (schoolLevel === "sd" || schoolLevel === "paketa") {
      for (let i = 1; i <= 6; i++) {
        options.push({ value: String(i), label: `${i} SD` });
      }
    } else if (schoolLevel === "smp" || schoolLevel === "paketb") {
      for (let i = 7; i <= 9; i++) {
        options.push({ value: String(i), label: `${i} SMP` });
      }
    } else if (schoolLevel === "sma" || schoolLevel === "paketc") {
      for (let i = 10; i <= 12; i++) {
        options.push({ value: String(i), label: `${i} SMA` });
      }
    } else {
      // Default: tampilkan semua kelas
      for (let i = 1; i <= 12; i++) {
        if (i <= 6) {
          options.push({ value: String(i), label: `${i} SD` });
        } else if (i <= 9) {
          options.push({ value: String(i), label: `${i} SMP` });
        } else {
          options.push({ value: String(i), label: `${i} SMA` });
        }
      }
    }

    return options;
  }, [sessionLevel]);

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

  // Ambil credit saat load
  useEffect(() => {
    const fetchCredit = async () => {
      try {
        const res = await api.get("/module-credit-charges/silabus");
        const creditCharge = res.data.data.credit_charged_generate;
        setCredit(creditCharge);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCredit();
  }, []);

  // Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onLoadingChange?.(true);

    try {
      const payload = {
        name,
        grade: selectedKelas?.value || "",
        subject: mapel,
        notes,
      };

      const res = await api.post(`${API_URL}/bahan-ajar/generate`, payload);
      const { status, message, data } = res.data;
      if (status == "success") {
        await refreshUserLimit();

        if (onResult && res.data) {
          onResult(JSON.stringify(res.data.data, null, 2));
        }

        toast.success(message, {
          duration: 5000,
        });

        if (onGenerateId && data.id) {
          const generateId = data.id;
          if (generateId) {
            onGenerateId(String(generateId));
          }
        }
      }
    } catch (error: any) {
      console.error("❌ Gagal generate modul:", error);

      if (error.response) {
        const status = error.response.status;
        toast.error(`Error ${status}`);
      }

      if (onResult) {
        onResult("");
      }
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  const handleClear = () => {
    setName("");
    setMapel("");
    setNotes("");
    setSelectedKelas(null);
    setCharCount(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full"
      id="syllabusForm"
    >
      {/* Input Nama Bahan Ajar */}
      <div className="flex flex-col">
        <label className="block mb-2 text-sm font-medium text-gray-900  ">
          Nama Bahan Ajar
        </label>
        <input
          type="text"
          placeholder="Masukkan nama bahan ajar"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             placeholder:text-gray-300"
          required
        />
      </div>

      {/* Select Kelas */}
      <div className="flex flex-col">
        <label className="block mb-2 text-sm font-medium text-gray-900  ">
          Kelas
        </label>
        <Select
          value={selectedKelas}
          onChange={(option) => setSelectedKelas(option)}
          options={kelasOptions}
          styles={customSelectStyles}
          placeholder="Pilih Kelas"
          isSearchable
          noOptionsMessage={() => "Tidak ada data"}
          className="text-sm"
          required
        />
      </div>

      {/* Input Mata Pelajaran */}
      <div className="flex flex-col">
        <label className="block mb-2 text-sm font-medium text-gray-900  ">
          Mata Pelajaran
        </label>
        <input
          type="text"
          placeholder="Masukkan nama mata pelajaran"
          value={mapel}
          onChange={(e) => setMapel(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             placeholder:text-gray-300"
          required
        />
      </div>

      {/* Textarea Deskripsi */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="notes"
          className="block mb-2 text-sm font-medium text-gray-900  "
        >
          Deskripsi Bahan Ajar
        </label>
        <textarea
          required
          id="notes"
          placeholder="Masukan deskripsi bahan ajar"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setCharCount(e.target.value.length);
          }}
          maxLength={250}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5             placeholder:text-gray-300"
        ></textarea>
        <div className="text-right text-sm text-gray-500">{charCount}/250</div>
      </div>

      {/* Tombol */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={handleClear}
          className="h-12 px-6 bg-white border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition"
        >
          Hapus
        </button>

        {loading ? (
          <button
            disabled
            type="button"
            className="h-12 px-6 bg-blue-600 text-white rounded-lg flex items-center gap-2"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Sedang Proses
          </button>
        ) : (
          <button
            type="submit"
            className="h-12 px-6 rounded-lg flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <IoSearchCircle size={30} />
            Buat Bahan Ajar
          </button>
        )}
      </div>

      {/* Credit Info */}
      <div className="flex flex-row items-center bg-gray-300 mt-5 px-2 gap-1 rounded-md">
        <IoSparklesOutline size={15} className="ml-3" />
        <p className="font-normal text-[13px] py-2 pl-1">
          Credit yang dibutuhkan untuk modul ini{" "}
          <b>
            {credit === null
              ? "Loading..."
              : credit === -1
              ? "Gagal mengambil data"
              : `${credit} Credit`}
          </b>
        </p>
      </div>
    </form>
  );
};

export default BahanAjarForm;
