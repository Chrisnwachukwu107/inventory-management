"use client";

import { BarChart3 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center fade-in">
      {/* White overlay + blur */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />

      {/* Centered logo */}
      <div className="relative">
        <BarChart3 className="w-14 h-14 text-purple-600 animate-scale" />
      </div>
    </div>
  );
}
