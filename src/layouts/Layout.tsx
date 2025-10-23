import React from "react";
import Navbar from "@/components/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-6">{children}</main>
    </div>
  );
}
