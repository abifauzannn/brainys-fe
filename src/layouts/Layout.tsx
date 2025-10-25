import React from "react";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ title, children }: Props) {
  useEffect(() => {
    document.title = title ? `${title} | Brainys` : "Brainys";
  }, [title]);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container w-full mx-auto px-4 py-6 justify-center font-['Inter']">
        {children}
      </main>
    </div>
  );
}
