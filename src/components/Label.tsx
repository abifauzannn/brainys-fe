import React from "react";

interface PageTitleProps {
  title: string;
  htmlFor: string;
}

const Label: React.FC<PageTitleProps> = ({ title, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor ?? ""}
      className="block mb-2 text-sm font-medium text-gray-900  "
    >
      {title}
    </label>
  );
};

export default Label;
