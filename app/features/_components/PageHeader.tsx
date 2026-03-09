"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "../../components/Icons";

export function PageHeader() {
  const [viewOpen, setViewOpen] = useState(false);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (viewRef.current && !viewRef.current.contains(e.target as Node)) setViewOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-5 py-2 border-b border-line">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-semibold text-t1 m-0">Features</h1>
      </div>
      <div className="relative" ref={viewRef}>
        <button
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-line bg-white text-xs text-t1 font-medium cursor-pointer hover:bg-hover transition-colors"
          onClick={() => setViewOpen((v) => !v)}
        >
          View
          <ChevronDownIcon className={`transition-transform duration-150 ${viewOpen ? "rotate-180" : ""}`} />
        </button>
        {viewOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-line rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-50 py-1 overflow-hidden">
            {["Group by folder", "Group by status", "Flat list"].map((opt) => (
              <button
                key={opt}
                className="w-full text-left px-3 py-2 text-sm text-t1 bg-transparent border-none cursor-pointer hover:bg-grey-bg transition-colors"
                onClick={() => setViewOpen(false)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
