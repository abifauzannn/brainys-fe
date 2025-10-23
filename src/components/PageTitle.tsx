import React from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface PageTitleProps {
  title: string;
  description: string;
  urlBack?: string; // optional, jika ada tombol kembali
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  description,
  urlBack,
}) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto relative">
      {urlBack && (
        <button
          onClick={() => navigate(urlBack)}
          className="mb-6 flex items-center"
        >
          <MdOutlineArrowBack />
          <div className="text-black text-base font-semibold ml-2">Kembali</div>
        </button>
      )}

      <div className="w-full mb-6">
        <div className="text-gray-900 text-2xl font-semibold font-['Inter']">
          {title}
        </div>
        <div className="mt-2 text-gray-500 text-sm leading-snug">
          {description}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
