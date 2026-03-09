"use client";

import { useState, useRef, useEffect } from "react";
import {
  ColumnsIcon, FilterIcon, SearchIcon, ClearIcon, PlusIcon, CopyIcon, DownloadIcon,
} from "../../components/Icons";
import { COL_META, type ColKey } from "../../lib/treeUtils";

interface ToolbarProps {
  visibleCols: Set<ColKey>;
  toggleCol: (key: ColKey) => void;
  filterActive: boolean;
  activeFilterCount: number;
  minCustomers: string;
  setMinCustomers: (v: string) => void;
  minFeedbacks: string;
  setMinFeedbacks: (v: string) => void;
  minARR: string;
  setMinARR: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

export function Toolbar({
  visibleCols, toggleCol,
  filterActive, activeFilterCount,
  minCustomers, setMinCustomers,
  minFeedbacks, setMinFeedbacks,
  minARR, setMinARR,
  searchQuery, setSearchQuery,
}: ToolbarProps) {
  const [colsOpen, setColsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const colsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (colsRef.current && !colsRef.current.contains(e.target as Node)) setColsOpen(false);
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) setFiltersOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-5 py-2 mt-1">
      <div className="flex items-center gap-1.5">

        {/* Columns dropdown */}
        <div className="relative" ref={colsRef}>
          <button
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border bg-white text-xs cursor-pointer transition-colors ${colsOpen ? "border-brand text-brand" : "border-line text-t2 hover:bg-hover"}`}
            onClick={() => setColsOpen((v) => !v)}
          >
            <ColumnsIcon />
            Columns
          </button>
          {colsOpen && (
            <div className="absolute left-0 top-full mt-1 w-44 bg-white border border-line rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-50 py-1.5 overflow-hidden">
              {COL_META.map((col) => (
                <label key={col.key} className="flex items-center gap-2.5 px-3 py-1.5 cursor-pointer hover:bg-grey-bg transition-colors">
                  <input
                    type="checkbox"
                    checked={visibleCols.has(col.key)}
                    onChange={() => toggleCol(col.key)}
                    className="w-3.5 h-3.5 accent-brand cursor-pointer"
                  />
                  <span className="text-sm text-t1">{col.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filters dropdown */}
        <div className="relative" ref={filtersRef}>
          <button
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border bg-white text-xs cursor-pointer transition-colors ${filtersOpen || filterActive ? "border-brand text-brand" : "border-line text-t2 hover:bg-hover"}`}
            onClick={() => setFiltersOpen((v) => !v)}
          >
            <FilterIcon />
            Filters
            {filterActive && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand text-white text-[10px] font-bold leading-none">
                {activeFilterCount}
              </span>
            )}
          </button>
          {filtersOpen && (
            <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-line rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-50 p-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-t3 font-medium">Min customers</label>
                <input type="number" min="0" placeholder="Any" value={minCustomers} onChange={(e) => setMinCustomers(e.target.value)} className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-t1 outline-none focus:border-brand transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-t3 font-medium">Min feedbacks</label>
                <input type="number" min="0" placeholder="Any" value={minFeedbacks} onChange={(e) => setMinFeedbacks(e.target.value)} className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-t1 outline-none focus:border-brand transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-t3 font-medium">Min ARR ($K)</label>
                <input type="number" min="0" step="0.1" placeholder="Any" value={minARR} onChange={(e) => setMinARR(e.target.value)} className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-t1 outline-none focus:border-brand transition-colors" />
              </div>
              {filterActive && (
                <button className="text-xs text-t3 hover:text-t1 text-left transition-colors" onClick={() => { setMinCustomers(""); setMinFeedbacks(""); setMinARR(""); }}>
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-line bg-white text-xs text-t2 font-semibold cursor-pointer hover:bg-hover transition-colors">
          Save
        </button>
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-white w-40 transition-colors ${searchQuery ? "border-brand" : "border-line"}`}>
          <SearchIcon className="flex-shrink-0 text-t3" />
          <input
            type="text"
            placeholder="Search features…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-xs text-t1 placeholder-t3 outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="flex-shrink-0 text-t3 hover:text-t1 transition-colors leading-none">
              <ClearIcon />
            </button>
          )}
        </div>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-line bg-white text-xs text-t2 font-semibold cursor-pointer hover:bg-hover transition-colors">
          <PlusIcon />
          Add column
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded border border-line bg-white text-t3 cursor-pointer hover:bg-hover transition-colors">
          <CopyIcon />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded border border-line bg-white text-t3 cursor-pointer hover:bg-hover transition-colors">
          <DownloadIcon />
        </button>
      </div>
    </div>
  );
}
