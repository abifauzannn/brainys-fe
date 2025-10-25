import ExportButtonGroup from "@/components/ExportButtonGroup";
import React from "react";

interface InformasiUmum {
  [key: string]: string;
}

interface InformasiGamifikasi {
  tema: string;
  konsep_utama: string;
  skema_game: string;
}

interface ElemenGamifikasi {
  judul: string;
  deskripsi: string;
}

interface MisiDanTantangan {
  jenis: string;
  deskripsi: string;
  poin?: number;
}

interface LangkahImplementasi {
  langkah: number;
  judul: string;
  deskripsi: string[];
}

interface GamifikasiData {
  informasi_umum?: InformasiUmum;
  informasi_gamifikasi?: InformasiGamifikasi;
  elemen_gamifikasi?: ElemenGamifikasi[];
  misi_dan_tantangan?: MisiDanTantangan[];
  langkah_implementasi?: LangkahImplementasi[];
}

interface GamifikasiOutputProps {
  data: string;
  generateId?: string;
}

const GamifikasiOutput: React.FC<GamifikasiOutputProps> = ({
  data,
  generateId,
}) => {
  if (!data) {
    return (
      <div className="w-full text-gray-700 text-sm font-normal leading-snug rounded-lg py-4 min-h-[150px]">
        Belum ada hasil. Silakan isi form di samping dan klik Generate.
      </div>
    );
  }

  let parsedData: GamifikasiData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    return (
      <div className="w-full text-gray-700 text-sm rounded-lg p-4 bg-gray-50">
        {data}
      </div>
    );
  }

  // Helper function to format key to label
  const formatLabel = (key: string): string => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-full space-y-5">
      {/* Informasi Umum */}
      {parsedData.informasi_umum &&
        Object.keys(parsedData.informasi_umum).length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                    colSpan={2}
                  >
                    Informasi Umum
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(parsedData.informasi_umum).map(
                  ([key, value]) => (
                    <tr key={key}>
                      <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                        {formatLabel(key)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {value}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

      {/* Informasi Gamifikasi */}
      {parsedData.informasi_gamifikasi && (
        <div className="overflow-x-auto mt-5">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                  colSpan={2}
                >
                  Informasi Gamifikasi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                  Tema
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {parsedData.informasi_gamifikasi.tema}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                  Konsep Utama
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {parsedData.informasi_gamifikasi.konsep_utama}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                  Skema Game
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {parsedData.informasi_gamifikasi.skema_game}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Elemen Gamifikasi */}
      {parsedData.elemen_gamifikasi &&
        parsedData.elemen_gamifikasi.length > 0 && (
          <div className="overflow-x-auto mt-5">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                    colSpan={2}
                  >
                    Elemen Gamifikasi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {parsedData.elemen_gamifikasi.map((element, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                      {element.judul}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {element.deskripsi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* Misi dan Tantangan */}
      {parsedData.misi_dan_tantangan &&
        parsedData.misi_dan_tantangan.length > 0 && (
          <div className="overflow-x-auto mt-5">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                    colSpan={3}
                  >
                    Misi dan Tantangan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {parsedData.misi_dan_tantangan.map((mission, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                      {mission.jenis}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {mission.deskripsi}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {mission.poin ?? 100} poin
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* Langkah Implementasi */}
      {parsedData.langkah_implementasi &&
        parsedData.langkah_implementasi.length > 0 && (
          <div className="overflow-x-auto mt-5">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                    colSpan={3}
                  >
                    Langkah Implementasi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {parsedData.langkah_implementasi.map((step, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                      Langkah {step.langkah}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {step.judul}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <ul className="list-disc pl-5">
                        {step.deskripsi.map((desc, descIndex) => (
                          <li key={descIndex}>{desc}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* Export Buttons */}
      {generateId && (
        <div className="flex flex-row gap-3">
          <ExportButtonGroup
            generateId={generateId || ""}
            moduleType="gamification"
            availableFormats={["word", "ppt"]}
            showGenerateId={true}
          />
        </div>
      )}
    </div>
  );
};

export default GamifikasiOutput;
