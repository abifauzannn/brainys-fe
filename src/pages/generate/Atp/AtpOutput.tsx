import ExportButtonGroup from "@/components/ExportButtonGroup";
import React from "react";

interface InformasiUmum {
  [key: string]: string | string[] | { [key: string]: string }[];
}

interface AlurItem {
  no: number | string;
  tujuan_pembelajaran: string;
  kata_frase_kunci: string[];
  profil_pelajar_pancasila: string[];
  glosarium: string;
}

interface AtpData {
  informasi_umum?: InformasiUmum;
  alur?: AlurItem[];
}

interface AtpOutputProps {
  data: string;
  generateId?: string;
}

const AtpOutput: React.FC<AtpOutputProps> = ({ data, generateId }) => {
  if (!data) {
    return (
      <div className="w-full text-gray-700 text-sm font-normal leading-snug rounded-lg py-4 min-h-[150px]">
        Belum ada hasil. Silakan isi form di samping dan klik Generate.
      </div>
    );
  }

  let parsedData: AtpData;
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

  // Render nested array items
  const renderArrayValue = (arr: any[]): React.JSX.Element => {
    return (
      <ul className="list-disc pl-5">
        {arr.map((item, idx) => {
          if (
            typeof item === "object" &&
            item !== null &&
            !Array.isArray(item)
          ) {
            return (
              <li key={idx}>
                {Object.entries(item).map(([k, v]) => (
                  <div key={k}>
                    <strong>{formatLabel(k)}:</strong> {String(v)}
                    <br />
                  </div>
                ))}
              </li>
            );
          } else {
            return <li key={idx}>{String(item)}</li>;
          }
        })}
      </ul>
    );
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
                        {Array.isArray(value)
                          ? renderArrayValue(value)
                          : String(value)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

      {/* Alur Tujuan Pembelajaran Table */}
      {parsedData.alur && parsedData.alur.length > 0 && (
        <div className="overflow-x-auto py-5">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  No
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  Tujuan Pembelajaran
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  Kata/Frase Kunci
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  Profil Pelajar Pancasila
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase">
                  Glosarium
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parsedData.alur.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold bg-slate-50">
                    {item.no}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.tujuan_pembelajaran || ""}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <ul className="list-disc pl-5">
                      {item.kata_frase_kunci &&
                        item.kata_frase_kunci.map((kata, kataIdx) => (
                          <li key={kataIdx}>{kata || ""}</li>
                        ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <ul className="list-disc pl-5">
                      {item.profil_pelajar_pancasila &&
                        item.profil_pelajar_pancasila.map(
                          (profil, profilIdx) => (
                            <li key={profilIdx}>{profil || ""}</li>
                          )
                        )}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.glosarium || ""}
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
            moduleType="atp"
            availableFormats={["word", "excel"]}
            showGenerateId={true}
          />
        </div>
      )}
    </div>
  );
};

export default AtpOutput;
