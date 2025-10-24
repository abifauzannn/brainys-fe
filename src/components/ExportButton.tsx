import React from "react";

type ExportType = "word" | "excel" | "ppt";

interface ExportButtonProps {
  type: ExportType;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  type,
  onClick,
  disabled = false,
  className = "",
  loading = false,
}) => {
  const configs = {
    word: {
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
      label: "Export Word",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      ),
    },
    excel: {
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
      label: "Export Excel",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    ppt: {
      bg: "bg-orange-600",
      hover: "hover:bg-orange-700",
      label: "Export PPT",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const config = configs[type];

  return (
    <button
      className={`px-4 py-2 ${config.bg} text-white rounded-lg ${config.hover} transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      ) : (
        config.icon
      )}
      {loading ? "Loading..." : config.label}
    </button>
  );
};

export default ExportButton;
