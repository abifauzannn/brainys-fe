import ExportButtonGroup from "@/components/ExportButtonGroup";
import React from "react";

interface InformasiUmum {
  [key: string]: string;
}

interface IntiSilabus {
  kompetensi_dasar: string[];
  materi_pembelajaran: string[];
  kegiatan_pembelajaran: string[];
}

interface SilabusPembelajaran {
  mata_pelajaran: string;
  tingkat_kelas: string;
  alokasi_waktu: string;
  kompetensi_inti: string[];
  definisi_kompetensi_inti: string;
  inti_silabus: IntiSilabus[];
}

interface SyllabusData {
  informasi_umum?: InformasiUmum;
  silabus_pembelajaran?: SilabusPembelajaran;
}

interface SyllabusOutputProps {
  data: string;
  generateId?: string;
}

const SyllabusOutput: React.FC<SyllabusOutputProps> = ({
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

  let parsedData: SyllabusData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    return (
      <div className="w-full text-gray-700 text-sm rounded-lg p-4 bg-gray-50">
        {data}
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* Informasi Umum */}
      {parsedData.informasi_umum && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-sm font-bold text-left text-gray-800 uppercase"
                  colSpan={2}
                >
                  Informasi Umum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(parsedData.informasi_umum).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50 w-1/3">
                    {key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Silabus Pembelajaran */}
      {parsedData.silabus_pembelajaran && (
        <>
          {/* Info Silabus */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    className="px-6 py-3 text-sm font-bold text-left text-gray-800 uppercase"
                    colSpan={2}
                  >
                    Silabus Pembelajaran
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50 w-1/3">
                    Mata Pelajaran
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {parsedData.silabus_pembelajaran.mata_pelajaran}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50">
                    Tingkat Kelas
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {parsedData.silabus_pembelajaran.tingkat_kelas}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50">
                    Alokasi Waktu
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {parsedData.silabus_pembelajaran.alokasi_waktu}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50">
                    Kompetensi Inti
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <ul className="list-disc list-inside space-y-1">
                      {parsedData.silabus_pembelajaran.kompetensi_inti.map(
                        (ki, index) => (
                          <li key={index}>{ki}</li>
                        )
                      )}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50">
                    Definisi Kompetensi Inti
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {parsedData.silabus_pembelajaran.definisi_kompetensi_inti}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Inti Silabus - Table Format */}
          {parsedData.silabus_pembelajaran.inti_silabus &&
            parsedData.silabus_pembelajaran.inti_silabus.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 py-4 text-sm font-semibold text-gray-800 text-left">
                        Kompetensi Dasar
                      </th>
                      <th className="px-3 py-4 text-sm font-semibold text-gray-800 text-left">
                        Materi Pembelajaran
                      </th>
                      <th className="px-3 py-4 text-sm font-semibold text-gray-800 text-left">
                        Kegiatan Pembelajaran
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {parsedData.silabus_pembelajaran.inti_silabus.map(
                      (silabus, index) => (
                        <tr key={index}>
                          {/* Kompetensi Dasar */}
                          <td className="px-3 py-4 text-sm text-gray-800 align-top">
                            <ul className="space-y-2">
                              {silabus.kompetensi_dasar.map((kd, kdIndex) => (
                                <li key={kdIndex}>
                                  {kdIndex + 1}. {kd}
                                </li>
                              ))}
                            </ul>
                          </td>

                          {/* Materi Pembelajaran */}
                          <td className="px-3 py-4 text-sm text-gray-800 align-top">
                            <ul className="space-y-2">
                              {silabus.materi_pembelajaran.map(
                                (materi, mIndex) => (
                                  <li key={mIndex}>
                                    {mIndex + 1}. {materi}
                                  </li>
                                )
                              )}
                            </ul>
                          </td>

                          {/* Kegiatan Pembelajaran */}
                          <td className="px-3 py-4 text-sm text-gray-800 align-top">
                            <ul className="space-y-2">
                              {silabus.kegiatan_pembelajaran.map(
                                (kegiatan, kIndex) => (
                                  <li key={kIndex}>
                                    {kIndex + 1}. {kegiatan}
                                  </li>
                                )
                              )}
                            </ul>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
        </>
      )}

      {/* Export Button Group */}
      {generateId && (
        <div className="flex flex-row gap-3 mt-5">
          <ExportButtonGroup
            generateId={generateId}
            moduleType="syllabus"
            availableFormats={["word"]}
            showGenerateId={true}
          />
        </div>
      )}
    </div>
  );
};

export default SyllabusOutput;
