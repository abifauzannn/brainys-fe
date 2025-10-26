import ExportButtonGroup from "@/components/ExportButtonGroup";
import React from "react";

interface InformasiUmum {
  nama_kisi_kisi?: string;
  penyusun?: string;
  instansi?: string;
  kelas?: string;
  mata_pelajaran?: string;
  alokasi_waktu?: string;
  kompetensi_awal?: string;
  elemen_capaian?: string;
  capaian_pembelajaran_redaksi?: string;
  pokok_materi?: string;
  tahun_penyusunan?: string;
}

interface KisiKisiItem {
  nomor: number | string;
  indikator_soal: string;
  no_soal: number | string;
}

interface KisiKisiData {
  informasi_umum?: InformasiUmum;
  kisi_kisi?: KisiKisiItem[];
}

interface KisiKisiOutputProps {
  data: string;
  generateId?: string;
}

const KisiKisiOutput: React.FC<KisiKisiOutputProps> = ({
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

  let parsedData: KisiKisiData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    return (
      <div className="w-full text-gray-700 text-sm rounded-lg p-4 bg-gray-50">
        {data}
      </div>
    );
  }

  // Mapping labels sesuai urutan di Blade
  const informasiUmumOrder: { [key: string]: string } = {
    nama_kisi_kisi: "Nama Kisi-kisi",
    penyusun: "Nama Penyusun",
    instansi: "Satuan Pendidikan",
    kelas: "Fase/Kelas",
    mata_pelajaran: "Mata Pelajaran",
    alokasi_waktu: "Alokasi Waktu",
    kompetensi_awal: "Kompetensi Awal",
    elemen_capaian: "Elemen Capaian",
    capaian_pembelajaran_redaksi: "Capaian Pembelajaran",
    pokok_materi: "Pokok Materi",
    tahun_penyusunan: "Tahun Penyusunan",
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
                {Object.entries(informasiUmumOrder).map(([key, label]) => {
                  const value =
                    parsedData.informasi_umum?.[key as keyof InformasiUmum];
                  if (value) {
                    return (
                      <tr key={key}>
                        <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                          {label}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {Array.isArray(value) ? JSON.stringify(value) : value}
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        )}

      {/* Kisi-kisi Table */}
      {parsedData.kisi_kisi && parsedData.kisi_kisi.length > 0 && (
        <div className="overflow-x-auto py-5">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                  colSpan={3}
                >
                  Kisi-kisi
                </th>
              </tr>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  Nomor
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  Indikator Soal
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  No Soal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parsedData.kisi_kisi.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                    {item.nomor}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.indikator_soal}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.no_soal}
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
            moduleType="hint"
            availableFormats={["word", "excel"]}
            showGenerateId={true}
          />
        </div>
      )}
    </div>
  );
};

export default KisiKisiOutput;
