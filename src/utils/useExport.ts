import { useState } from "react";
import api from "@/services/api";
import { useUser } from "@/context/UserContext";

type ExportType = "word" | "excel" | "ppt";
type ModuleType =
  | "modul-ajar"
  | "syllabus"
  | "bahan-ajar"
  | "alur-tujuan-pembelajaran"
  | "asesmen"
  | "exercise-v2";

interface UseExportProps {
  generateId: string;
  moduleType: ModuleType;
}

export const useExport = ({ generateId, moduleType }: UseExportProps) => {
  const [loading, setLoading] = useState<{
    word: boolean;
    excel: boolean;
    ppt: boolean;
  }>({
    word: false,
    excel: false,
    ppt: false,
  });

   const { refreshUserLimit } = useUser(); // ✅ tambahkan ini

  const exportFile = async (type: ExportType) => {
    if (!generateId) {
      alert("Generate ID tidak ditemukan!");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, [type]: true }));

      // Endpoint sesuai dengan module dan type
      const endpoint = `/${moduleType}/export-${type}`;

      console.log(`Exporting to ${type} via ${endpoint}...`);

      const response = await api.post(endpoint, {
        id: generateId,
      });

      if (response.data.status === "success") {
      const downloadUrl = response.data.data.download_url;

        console.log(`Download URL: ${downloadUrl}`);

        // ✅ Update user limit di background (tidak perlu await)
        // Ini tidak block download process
        refreshUserLimit().catch(err => {
          console.error("Failed to refresh user limit:", err);
        });

        // ✅ Open download di tab baru
        window.location.href = downloadUrl;
      } else {
        throw new Error("Export failed");
      }
    } catch (error: any) {
      console.error(`Error exporting ${type}:`, error);
      alert(
        error.response?.data?.message ||
          `Gagal export ${type}. Silakan coba lagi.`
      );
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  return {
    exportFile,
    loading,
  };
};