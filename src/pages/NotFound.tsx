import Layout from "@/layouts/Layout";
import { FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Layout>
      <div className="my-auto h-[550px] flex flex-col items-center justify-center  text-gray-800">
        <FaTools className="text-6xl text-yellow-500 mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold mb-2 text-center">
          Halaman Dalam Pengembangan
        </h1>
        <p className="text-gray-600 mb-6  text-center">
          Fitur ini sedang dalam tahap pengembangan. Silakan cek kembali nanti.
        </p>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </Layout>
  );
}
