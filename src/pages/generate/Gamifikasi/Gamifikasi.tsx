import Layout from "@/layouts/Layout";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import GamifikasiForm from "./GamifikasiForm";
import GamifikasiOutput from "./GamifikasiOutput";

export default function Gamifikasi() {
  const [hasilGenerate, setHasilGenerate] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateId, setGenerateId] = useState<string>(""); // ✅ State untuk ID

  return (
    <Layout title="Templat Materi Gamifikasi">
      <PageTitle
        title="Templat Materi Gamifikasi"
        description="Gunakan template materi berbasis gamifikasi"
        urlBack="/dashboard"
      />

      <div className="w-full flex justify-between container mx-auto flex-col lg:flex-row ">
        {/* ✅ FORM */}
        <GamifikasiForm
          onResult={setHasilGenerate}
          onLoadingChange={setIsGenerating}
          onGenerateId={setGenerateId}
        />
        {/* ✅ HASIL OUTPUT */}
        <div className="flex-col justify-start items-start lg:ml-[72px] mt-3 lg:mt-0 flex-1">
          <div className="text-gray-900 text-2xl font-semibold font-['Inter'] leading-[30px] mb-3">
            Hasil
          </div>

          <div className="w-full lg:w-[788px]  font-normal font-['Inter'] leading-snug  min-h-[150px] whitespace-pre-line">
            {isGenerating ? (
              <div className="w-full text-center  text-gray-700 text-sm  rounded-lg ">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                Sedang menggenerate gamifikasi...
              </div>
            ) : (
              <GamifikasiOutput data={hasilGenerate} generateId={generateId} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
