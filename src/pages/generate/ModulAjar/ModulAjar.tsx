import Layout from "@/layouts/Layout";
import PageTitle from "@/components/PageTitle";
import ModulAjarForm from "@/pages/generate/ModulAjar/ModulAjarForm";
import { useState } from "react";

export default function ModulAjar() {
  const [hasilGenerate, setHasilGenerate] = useState<string>("");

  return (
    <Layout>
      <PageTitle
        title="Templat Modul Ajar"
        description="Gunakan template modul ajar kurikulum merdeka"
        urlBack="/dashboard"
      />

      <div className="w-full flex justify-between container mx-auto flex-col lg:flex-row ">
        {/* ✅ FORM */}
        <ModulAjarForm onResult={setHasilGenerate} />

        {/* ✅ HASIL OUTPUT */}
        <div className="flex-col justify-start items-start lg:ml-[72px] mt-3 lg:mt-0 flex-1">
          <div className="text-gray-900 text-2xl font-semibold font-['Inter'] leading-[30px] mb-3">
            Hasil
          </div>

          <div className="w-full lg:w-[788px] text-gray-700 text-sm font-normal font-['Inter'] leading-snug border rounded-lg p-4 bg-gray-50 min-h-[150px] whitespace-pre-line">
            {hasilGenerate
              ? hasilGenerate
              : "Belum ada hasil. Silakan isi form di samping dan klik Generate."}
          </div>
        </div>
      </div>
    </Layout>
  );
}
