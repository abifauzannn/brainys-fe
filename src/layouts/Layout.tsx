import React from "react";
import Navbar from "@/components/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container w-full mx-auto px-4 py-6 justify-center font-['Inter']">
        {children}
      </main>
    </div>
  );
}
