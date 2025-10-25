import ExportButtonGroup from "@/components/ExportButtonGroup";
import React from "react";

interface InformasiUmum {
  nama_latihan?: string;
  penyusun?: string;
  instansi?: string;
  fase_kelas?: string;
  mata_pelajaran?: string;
  kompetensi_awal?: string;
  element?: string;
  capaian_pembelajaran?: string;
  topik?: string;
}

interface SoalEssay {
  question: string;
  instructions: string;
}

interface SoalPilihanGanda {
  question: string;
  options: {
    [key: string]: string;
  };
}

interface ExerciseData {
  informasi_umum?: InformasiUmum;
  soal_essay?: SoalEssay[];
  soal_pilihan_ganda?: SoalPilihanGanda[];
}

interface SoalOutputProps {
  data: string;
  generateId?: string;
}

const SoalOutput: React.FC<SoalOutputProps> = ({ data, generateId }) => {
  if (!data) {
    return (
      <div className="w-full text-gray-700 text-sm font-normal leading-snug rounded-lg py-4 min-h-[150px]">
        Belum ada hasil. Silakan isi form di samping dan klik Generate.
      </div>
    );
  }

  let parsedData: ExerciseData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    return (
      <div className="w-full text-gray-700 text-sm rounded-lg p-4 bg-gray-50">
        {data}
      </div>
    );
  }

  const informasiUmumLabels: { [key: string]: string } = {
    nama_latihan: "Nama Soal Latihan",
    penyusun: "Nama Penyusun",
    instansi: "Satuan Pendidikan",
    fase_kelas: "Fase/Kelas",
    mata_pelajaran: "Mata Pelajaran",
    kompetensi_awal: "Kompetensi Awal",
    element: "Elemen Capaian",
    capaian_pembelajaran: "Capaian Pembelajaran",
    topik: "Topik",
  };

  return (
    <div className="w-full space-y-4">
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
                {Object.entries(informasiUmumLabels).map(([key, label]) => {
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

      {/* Soal Essay */}
      {parsedData.soal_essay && parsedData.soal_essay.length > 0 && (
        <div className="overflow-x-auto my-4">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  Pertanyaan
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  Instruksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parsedData.soal_essay.map((soal, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {soal.question}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {soal.instructions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Soal Pilihan Ganda */}
      {parsedData.soal_pilihan_ganda &&
        parsedData.soal_pilihan_ganda.length > 0 && (
          <div className="w-full overflow-x-auto my-4">
            {parsedData.soal_pilihan_ganda.map((question, index) => (
              <div key={index} className="mt-4 px-6 py-4 bg-slate-50">
                <p className="text-gray-800">
                  <strong>{index + 1}.</strong> {question.question}
                </p>
                <ul>
                  {Object.entries(question.options).map(([key, option]) => (
                    <li key={key} className="text-gray-800 ml-4 py-1">
                      {key} {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      {/* Export Button - Placeholder */}
      {generateId && (
        <div className="flex flex-row gap-3 mt-5">
          <ExportButtonGroup
            generateId={generateId}
            moduleType="exercise-v2"
            availableFormats={["word"]}
            showGenerateId={true}
          />
        </div>
      )}
    </div>
  );
};

export default SoalOutput;
