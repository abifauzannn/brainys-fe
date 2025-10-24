import React from "react";

interface ExportPPTButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ExportPPTButton: React.FC<ExportPPTButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
      Export PPT
    </button>
  );
};

export default ExportPPTButton;
