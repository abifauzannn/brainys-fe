import React from "react";

interface ExportExcelButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ExportExcelButton: React.FC<ExportExcelButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      Export Excel
    </button>
  );
};

export default ExportExcelButton;
