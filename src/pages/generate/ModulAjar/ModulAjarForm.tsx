import { useEffect, useState, type FormEvent } from "react";
import api from "@/services/api";
import { IoSearchCircle, IoSparklesOutline } from "react-icons/io5";

interface Option {
  value: string;
  label: string;
}

interface FaseResponseItem {
  fase: string;
}

interface MataPelajaranResponseItem {
  mata_pelajaran: string;
}

interface ElementResponseItem {
  element: string;
}

interface ModulAjarFormProps {
  onResult?: (text: string) => void;
  schoolLevel?: string; // dari session user (untuk enable/disable tombol)
  onLoadingChange?: (loading: boolean) => void; // ✅ Tambahkan ini
}

const ModulAjarForm: React.FC<ModulAjarFormProps> = ({
  onResult,
  schoolLevel,
  onLoadingChange, // ✅ Tambahkan ini
}) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [faseOptions, setFaseOptions] = useState<Option[]>([]);
  const [mapelOptions, setMapelOptions] = useState<Option[]>([]);
  const [elementOptions, setElementOptions] = useState<Option[]>([]);

  const [selectedFase, setSelectedFase] = useState("");
  const [selectedMapel, setSelectedMapel] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedPekan, setSelectedPekan] = useState("");

  const [credit, setCredit] = useState<number | null>(null);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://be.brainys.oasys.id/api";

  // Ambil credit saat load
  useEffect(() => {
    const fetchCredit = async () => {
      try {
        const res = await api.get("/module-credit-charges/modul-ajar");
        const creditCharge = res.data.data.credit_charged_generate; // log data yang dikirim dari server
        setCredit(creditCharge);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCredit();
  }, []);

  // Ambil Fase
  useEffect(() => {
    const fetchFase = async () => {
      try {
        // gunakan POST sesuai backend
        const res = await api.post("/capaian-pembelajaran/fase", {});

        const options = res.data.data.map((item: FaseResponseItem) => ({
          value: item.fase,
          label: item.fase,
        }));

        setFaseOptions(options);
      } catch (error) {
        console.error("Gagal mengambil data fase:", error);
      }
    };

    fetchFase();
  }, []);

  // Ambil Mapel berdasar fase
  useEffect(() => {
    if (!selectedFase) return;

    const fetchMapel = async () => {
      try {
        // 🔹 sesuai backend: POST ke /capaian-pembelajaran/mata-pelajaran
        const res = await api.post("/capaian-pembelajaran/mata-pelajaran", {
          fase: selectedFase,
        });

        if (res.data.status === "success") {
          const options = res.data.data.map(
            (item: MataPelajaranResponseItem) => ({
              value: item.mata_pelajaran,
              label: item.mata_pelajaran,
            })
          );
          setMapelOptions(options);
        } else {
          console.warn("Respon tidak success:", res.data);
          setMapelOptions([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data mata pelajaran:", error);
        setMapelOptions([]);
      }
    };

    fetchMapel();
  }, [selectedFase]);

  // Ambil Element berdasar Mapel & Fase
  useEffect(() => {
    if (!selectedMapel || !selectedFase) return;

    const fetchElement = async () => {
      try {
        // 🔹 sesuai backend: POST ke /capaian-pembelajaran/element
        const res = await api.post("/capaian-pembelajaran/element", {
          fase: selectedFase,
          mata_pelajaran: selectedMapel,
        });

        if (res.data.status === "success") {
          const options = res.data.data.map((item: ElementResponseItem) => ({
            value: item.element,
            label: item.element,
          }));
          setElementOptions(options);
        } else {
          console.warn("Respon tidak success:", res.data);
          setElementOptions([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data elemen:", error);
        setElementOptions([]);
      }
    };

    fetchElement();
  }, [selectedMapel, selectedFase]);

  // 🔹 Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onLoadingChange?.(true);

    try {
      const payload = {
        name,
        notes,
        phase: selectedFase,
        subject: selectedMapel,
        element: selectedElement,
      };

      const res = await api.post(`${API_URL}/modul-ajar/generate`, payload);
      console.log("✅ Modul berhasil dibuat:", res.data);

      // ✅ Kirim seluruh data object ke parent
      if (onResult && res.data) {
        // Kirim sebagai JSON string atau object
        onResult(JSON.stringify(res.data.data, null, 2));
      }
    } catch (error) {
      console.error("❌ Gagal generate modul:", error);

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
    setNotes("");
    setSelectedFase("");
    setSelectedMapel("");
    setSelectedElement("");
    setSelectedPekan("");
    setCharCount(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full"
      id="modulAjarForm"
    >
      {/* Input Nama Modul Ajar */}
      <div className="flex flex-col">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nama Modul Ajar
        </label>
        <input
          type="text"
          placeholder="Masukkan nama modul ajar"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-gray-300"
          required
        />
      </div>

      {/* Chain Select */}
      <div className="flex flex-col gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Fase
          </label>
          <select
            style={{
              backgroundImage: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
            value={selectedFase}
            onChange={(e) => setSelectedFase(e.target.value)}
            className="select w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-300 placeholder:text-sm"
          >
            <option value="" className="text-sm">
              Pilih Fase
            </option>
            {faseOptions.map((opt) => (
              <option className="text-sm" key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mata Pelajaran
          </label>
          <select
            style={{
              backgroundImage: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
            value={selectedMapel}
            onChange={(e) => setSelectedMapel(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            disabled={!selectedFase}
          >
            <option value="">Pilih Mata Pelajaran</option>
            {mapelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Elemen Capaian
          </label>
          <select
            style={{
              backgroundImage: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
            value={selectedElement}
            onChange={(e) => setSelectedElement(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            disabled={!selectedMapel}
          >
            <option className="text-sm" value="">
              Pilih Elemen
            </option>
            {elementOptions.map((opt) => (
              <option className="text-sm" key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Textarea Deskripsi */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="notes"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Deskripsi Modul Ajar
        </label>
        <textarea
          id="notes"
          placeholder="Masukan deskripsi point modul ajar"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setCharCount(e.target.value.length);
          }}
          maxLength={250}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-gray-300"
        ></textarea>
        <div className="text-right text-sm text-gray-500">{charCount}/250</div>
        <p className="text-xs text-gray-500">
          Contoh: Buatkan modul ajar untuk rangkaian listrik
        </p>
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
            Buat Modul Ajar
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

export default ModulAjarForm;
