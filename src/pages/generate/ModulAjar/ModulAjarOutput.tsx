import React from "react";

interface ModulAjarData {
  informasi_umum?: Record<string, any>;
  sarana_dan_prasarana?: Record<string, string>;
  tujuan_kegiatan_pembelajaran?: Record<string, any>;
  pemahaman_bermakna?: Record<string, string>;
  pertanyaan_pemantik?: string[];
  kompetensi_dasar?: Array<{
    nama_kompetensi_dasar: string;
    materi_pembelajaran: Array<{
      materi: string;
      tujuan_pembelajaran_materi: string;
      indikator: string;
      nilai_karakter: string;
      kegiatan_pembelajaran: string;
      alokasi_waktu: string;
      penilaian?: Array<{ jenis: string; bobot: number }>;
    }>;
  }>;
  langkah_pembelajaran?: Record<string, string[]>;
  lampiran?: {
    glosarium_materi?: string[];
    daftar_pustaka?: string[];
  };
}

interface ModulAjarOutputProps {
  data: string;
}

const ModulAjarOutput: React.FC<ModulAjarOutputProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="w-full text-gray-700 text-sm font-normal leading-snug  rounded-lg py-4  min-h-[150px]">
        Belum ada hasil. Silakan isi form di samping dan klik Generate.
      </div>
    );
  }

  let parsedData: ModulAjarData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    return (
      <div className="w-full text-gray-700 text-sm  rounded-lg p-4 bg-gray-50">
        {data}
      </div>
    );
  }

  const informasiUmumLabels: Record<string, string> = {
    nama_modul_ajar: "Nama Modul Ajar",
    penyusun: "Nama Penyusun",
    jenjang_sekolah: "Satuan Pendidikan",
    fase_kelas: "Fase/Kelas",
    mata_pelajaran: "Mata Pelajaran",
    alokasi_waktu: "Alokasi Waktu",
    kompetensi_awal: "Kompetensi Awal",
    profil_pelajar_pancasila: "Profil Pelajar Pancasila",
    target_peserta_didik: "Target Peserta Didik",
    model_pembelajaran: "Model Pembelajaran",
    element: "Elemen",
    capaian_pembelajaran: "Capaian Pembelajaran",
  };

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
              {Object.entries(informasiUmumLabels).map(([key, label]) => {
                const value = parsedData.informasi_umum?.[key];
                if (!value) return null;
                return (
                  <tr key={key}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50 w-1/3">
                      {label}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {Array.isArray(value) ? value.join(", ") : String(value)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Sarana dan Prasarana */}
      {parsedData.sarana_dan_prasarana && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white  rounded-lg">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-sm font-bold text-left text-gray-800 uppercase"
                  colSpan={2}
                >
                  Sarana dan Prasarana
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(parsedData.sarana_dan_prasarana).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50 w-1/3">
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tujuan Kegiatan Pembelajaran */}
      {parsedData.tujuan_kegiatan_pembelajaran && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white  rounded-lg">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-sm font-bold text-left text-gray-800 uppercase"
                  colSpan={2}
                >
                  Tujuan Kegiatan Pembelajaran
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(parsedData.tujuan_kegiatan_pembelajaran).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50 w-1/3">
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {Array.isArray(value) ? (
                        <ol className="list-decimal list-inside">
                          {value.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ol>
                      ) : (
                        String(value)
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pemahaman Bermakna */}
      {parsedData.pemahaman_bermakna && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white  rounded-lg">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-sm font-bold text-left text-gray-800 uppercase"
                  colSpan={2}
                >
                  Pemahaman Bermakna
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(parsedData.pemahaman_bermakna).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 bg-slate-50 w-1/3">
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pertanyaan Pemantik */}
      {parsedData.pertanyaan_pemantik &&
        parsedData.pertanyaan_pemantik.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white  rounded-lg">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-bold text-left text-gray-800 uppercase">
                    Pertanyaan Pemantik
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {parsedData.pertanyaan_pemantik.map((pertanyaan, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {index + 1}. {pertanyaan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* Kegiatan Pembelajaran */}
      {parsedData.kompetensi_dasar &&
        parsedData.kompetensi_dasar.length > 0 && (
          <div className="overflow-x-auto">
            {parsedData.kompetensi_dasar.map((kompetensi, idx) => (
              <div key={idx} className="mt-5  rounded-lg bg-white">
                <div className="px-6 py-3 text-sm font-bold text-gray-800 uppercase bg-slate-50 rounded-t-lg">
                  Kegiatan Pembelajaran
                </div>
                <div className="px-6 py-3">
                  <div className="text-sm font-bold text-gray-800 uppercase mb-3">
                    {idx + 1}. {kompetensi.nama_kompetensi_dasar}
                  </div>
                  <div className="space-y-4">
                    {kompetensi.materi_pembelajaran.map((materi, mIdx) => (
                      <div
                        key={mIdx}
                        className="pl-4 border-l-2 border-gray-200"
                      >
                        <div className="text-sm text-gray-800 mb-2">
                          <span className="font-bold">Materi:</span>{" "}
                          {materi.materi}
                        </div>
                        <ul className="pl-6 space-y-2">
                          <li className="text-sm text-gray-800">
                            <span className="font-bold">
                              Tujuan Pembelajaran Materi:
                            </span>{" "}
                            {materi.tujuan_pembelajaran_materi}
                          </li>
                          <li className="text-sm text-gray-800">
                            <span className="font-bold">Indikator:</span>{" "}
                            {materi.indikator}
                          </li>
                          <li className="text-sm text-gray-800">
                            <span className="font-bold">Nilai Karakter:</span>{" "}
                            {materi.nilai_karakter}
                          </li>
                          <li className="text-sm text-gray-800">
                            <span className="font-bold">
                              Kegiatan Pembelajaran:
                            </span>{" "}
                            {materi.kegiatan_pembelajaran}
                          </li>
                          <li className="text-sm text-gray-800">
                            <span className="font-bold">Alokasi Waktu:</span>{" "}
                            {materi.alokasi_waktu}
                          </li>
                          {materi.penilaian && materi.penilaian.length > 0 && (
                            <li className="text-sm text-gray-800">
                              <span className="font-bold">Penilaian:</span>
                              <ul className="pl-5">
                                {materi.penilaian.map((p, pIdx) => (
                                  <li key={pIdx}>
                                    {p.jenis}: {p.bobot}%
                                  </li>
                                ))}
                              </ul>
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Langkah Pembelajaran */}
      {parsedData.langkah_pembelajaran && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-3 text-sm font-bold text-left text-gray-800 uppercase"
                  colSpan={2}
                >
                  Langkah Pembelajaran
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(parsedData.langkah_pembelajaran).map(
                ([kategori, langkahs]) => (
                  <React.Fragment key={kategori}>
                    <tr>
                      <td
                        colSpan={2}
                        className="px-6 py-4 text-sm font-semibold text-gray-800 capitalize"
                      >
                        {kategori.replace(/_/g, " ")}
                      </td>
                    </tr>
                    {langkahs.map((langkah, index) => (
                      <tr key={index}>
                        <td
                          className="px-6 py-4 text-sm text-gray-800"
                          style={{ width: "5%" }}
                        >
                          {index + 1}.
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {langkah}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Lampiran */}
      {parsedData.lampiran && (
        <>
          {parsedData.lampiran.glosarium_materi &&
            parsedData.lampiran.glosarium_materi.length > 0 && (
              <div className="mt-5">
                <div className="pt-3 mb-2 text-sm font-bold text-gray-800 uppercase">
                  Glosarium
                </div>
                <ol className="pl-6 list-decimal">
                  {parsedData.lampiran.glosarium_materi.map((item, index) => (
                    <li key={index} className="mb-2 text-sm text-gray-800">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          {parsedData.lampiran.daftar_pustaka &&
            parsedData.lampiran.daftar_pustaka.length > 0 && (
              <div className="mt-5">
                <div className="pt-3 mb-2 text-sm font-bold text-gray-800 uppercase">
                  Daftar Pustaka
                </div>
                <ol className="pl-6 list-decimal">
                  {parsedData.lampiran.daftar_pustaka.map((item, index) => (
                    <li key={index} className="mb-2 text-sm text-gray-800">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default ModulAjarOutput;
