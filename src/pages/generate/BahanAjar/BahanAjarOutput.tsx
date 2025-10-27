import ExportButtonGroup from "@/components/ExportButtonGroup";
import React from "react";

interface InformasiUmum {
  [key: string]: string | string[];
}

interface Pendahuluan {
  [key: string]: string;
}

interface Konten {
  nama_konten: string;
  isi_konten: string;
}

interface StudiKasus {
  nama_studi_kasus: string;
  isi_studi_kasus: string;
}

interface Quiz {
  soal_quiz: string;
}

interface Evaluasi {
  isi_evaluasi: string;
}

interface Lampiran {
  sumber_referensi: string[];
}

interface BahanAjarData {
  informasi_umum?: InformasiUmum;
  pendahuluan?: Pendahuluan;
  konten?: Konten[];
  studi_kasus?: StudiKasus[];
  quiz?: Quiz;
  evaluasi?: Evaluasi;
  lampiran?: Lampiran;
}

interface BahanAjarOutputProps {
  data: string;
  generateId?: string;
}

const BahanAjarOutput: React.FC<BahanAjarOutputProps> = ({
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

  let parsedData: BahanAjarData;
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
                        {Array.isArray(value) ? (
                          <ul className="list-disc pl-5">
                            {value.map((item, idx) => (
                              <li key={idx}>
                                {typeof item === "string"
                                  ? item
                                  : JSON.stringify(item)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

      {/* Pendahuluan */}
      {parsedData.pendahuluan &&
        Object.keys(parsedData.pendahuluan).length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full mt-5">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                    colSpan={2}
                  >
                    Pendahuluan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(parsedData.pendahuluan).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                      {formatLabel(key)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* Konten/Materi */}
      {parsedData.konten && parsedData.konten.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full mt-5">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                  colSpan={2}
                >
                  Materi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parsedData.konten.map((content, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                    {content.nama_konten}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {content.isi_konten}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Studi Kasus */}
      {parsedData.studi_kasus && parsedData.studi_kasus.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full mt-5">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                  colSpan={2}
                >
                  Studi Kasus
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parsedData.studi_kasus.map((kasus, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                    {kasus.nama_studi_kasus}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {kasus.isi_studi_kasus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Quiz & Evaluasi */}
      {(parsedData.quiz || parsedData.evaluasi) && (
        <div className="overflow-x-auto mt-5">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase"
                  colSpan={2}
                >
                  Quiz & Evaluasi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parsedData.quiz && (
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                    Soal Quiz
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {parsedData.quiz.soal_quiz}
                  </td>
                </tr>
              )}
              {parsedData.evaluasi && (
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                    Evaluasi
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {parsedData.evaluasi.isi_evaluasi}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Referensi */}
      {parsedData.lampiran?.sumber_referensi &&
        parsedData.lampiran.sumber_referensi.length > 0 && (
          <div className="overflow-x-auto mt-5">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                    Referensi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {parsedData.lampiran.sumber_referensi.map(
                  (referensi, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-800 before:content-['•'] before:mr-2">
                        {referensi}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

      {/* Export Buttons */}
      {generateId && (
        <div className="flex flex-row gap-3">
          <ExportButtonGroup
            generateId={generateId || ""}
            moduleType="bahan-ajar"
            availableFormats={["word", "ppt"]}
            showGenerateId={true}
          />
        </div>
      )}
    </div>
  );
};

export default BahanAjarOutput;
