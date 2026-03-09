"use client";

import { useState, useRef, useEffect } from "react";
import FeatureDetailPanel from "../components/FeatureDetailPanel";
import { treeData } from "../lib/mockData";
import type { Feature, TreeNode } from "../lib/mockData";
import { TreeRow } from "../components/TreeRow";
import {
  FolderIcon,
  FeatureDocIcon,
  StatusIcon,
  ChevronDownIcon,
  ColumnsIcon,
  FilterIcon,
  SearchIcon,
  ClearIcon,
  PlusIcon,
  CopyIcon,
  DownloadIcon,
} from "../components/Icons";

// ─── Tree helpers ─────────────────────────────────────────────────────────────

function parseAgeDays(s: string): number {
  const n = () => {
    const m = s.match(/^(\d+)/);
    return m ? Number(m[1]) : (s.startsWith("a ") || s.startsWith("an ") ? 1 : 0);
  };
  if (/year/i.test(s)) return n() * 365;
  if (/month/i.test(s)) return (s.startsWith("a ") ? 1 : Number(s.match(/^(\d+)/)?.[1] ?? 1)) * 30;
  if (/week/i.test(s)) return (s.startsWith("a ") ? 1 : Number(s.match(/^(\d+)/)?.[1] ?? 1)) * 7;
  if (/day/i.test(s)) return s.startsWith("a ") ? 1 : Number(s.match(/^(\d+)/)?.[1] ?? 1);
  return 0;
}

interface AggregatedData {
  numCustomers: number;
  numFeedbacks: number;
  arr: number;
  assignees: { initials: string; color: string }[];
  createdAt: string;
}

export function aggregate(node: TreeNode): AggregatedData {
  if (node.type === "feature") {
    return {
      numCustomers: node.numCustomers,
      numFeedbacks: node.numFeedbacks,
      arr: node.arr,
      assignees: node.assignees,
      createdAt: node.createdAt,
    };
  }
  const childData = node.children.map(aggregate);
  const seen = new Set<string>();
  const allAssignees: { initials: string; color: string }[] = [];
  for (const d of childData) {
    for (const a of d.assignees) {
      if (!seen.has(a.initials)) {
        seen.add(a.initials);
        allAssignees.push(a);
      }
    }
  }
  const oldest = childData.reduce((best, d) =>
    parseAgeDays(d.createdAt) > parseAgeDays(best.createdAt) ? d : best
  );
  return {
    numCustomers: childData.reduce((s, d) => s + d.numCustomers, 0),
    numFeedbacks: childData.reduce((s, d) => s + d.numFeedbacks, 0),
    arr: childData.reduce((s, d) => s + d.arr, 0),
    assignees: allAssignees,
    createdAt: oldest.createdAt,
  };
}

export function computeFolderStatus(node: TreeNode): string {
  const statuses: string[] = [];
  function collect(n: TreeNode) {
    if (n.type === "feature") statuses.push(n.status);
    else n.children.forEach(collect);
  }
  collect(node);
  if (statuses.length === 0) return "backlog";
  if (statuses.some((s) => s === "in-progress")) return "in-progress";
  if (statuses.every((s) => s === "done")) return "done";
  return "backlog";
}

export interface FlatRow {
  node: TreeNode;
  depth: number;
}

function flattenTree(nodes: TreeNode[], expanded: Set<string>, depth = 0): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const node of nodes) {
    rows.push({ node, depth });
    if (node.type === "folder" && expanded.has(node.id)) {
      rows.push(...flattenTree(node.children, expanded, depth + 1));
    }
  }
  return rows;
}

// ─── Avatar stack ─────────────────────────────────────────────────────────────

export function AvatarStack({ assignees }: { assignees: { initials: string; color: string }[] }) {
  const shown = assignees.slice(0, 3);
  const overflow = assignees.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((a, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
          style={{ background: a.color, marginLeft: i === 0 ? 0 : -6, zIndex: shown.length - i }}
          title={a.initials}
        >
          {a.initials}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="w-6 h-6 rounded-full border-2 border-white bg-hover flex items-center justify-center text-xs font-semibold text-t2 flex-shrink-0"
          style={{ marginLeft: -6 }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

// ─── Column metadata ──────────────────────────────────────────────────────────

function matchesSearch(node: TreeNode, q: string): boolean {
  if (node.title.toLowerCase().includes(q)) return true;
  if (node.type === "folder") return node.children.some((c) => matchesSearch(c, q));
  return false;
}

const COL_META = [
  { key: "assignees", label: "Assignees", width: "130px" },
  { key: "createdAt", label: "Created at", width: "120px" },
  { key: "customers", label: "Customers", width: "110px" },
  { key: "feedbacks", label: "Feedbacks", width: "110px" },
  { key: "arr", label: "ARR", width: "80px" },
] as const;

type ColKey = (typeof COL_META)[number]["key"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["folder-1"]));
  const [viewOpen, setViewOpen] = useState(false);
  const [colsOpen, setColsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCols, setVisibleCols] = useState<Set<ColKey>>(new Set(COL_META.map((c) => c.key)));
  const [minCustomers, setMinCustomers] = useState("");
  const [minFeedbacks, setMinFeedbacks] = useState("");
  const [minARR, setMinARR] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const viewRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (viewRef.current && !viewRef.current.contains(e.target as Node)) setViewOpen(false);
      if (colsRef.current && !colsRef.current.contains(e.target as Node)) setColsOpen(false);
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) setFiltersOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => setSelectedFeature(null);

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCol = (key: ColKey) => {
    setVisibleCols((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // When detail panel is open, suppress customers & feedbacks columns
  const compact = !!selectedFeature;
  const effectiveCols = new Set(visibleCols);
  if (compact) {
    effectiveCols.delete("customers");
    effectiveCols.delete("feedbacks");
  }

  // Filtering
  const minCust = minCustomers !== "" ? Number(minCustomers) : null;
  const minFeed = minFeedbacks !== "" ? Number(minFeedbacks) : null;
  const minArrM = minARR !== "" ? Number(minARR) : null;
  const filterActive = minCust !== null || minFeed !== null || minArrM !== null;
  const activeFilterCount = [minCust, minFeed, minArrM].filter((v) => v !== null).length;

  const flatRows = flattenTree(treeData, expandedFolders).filter(({ node }) => {
    const q = searchQuery.trim().toLowerCase();
    if (q && !matchesSearch(node, q)) return false;
    if (!filterActive) return true;
    const agg = aggregate(node);
    if (minCust !== null && agg.numCustomers < minCust) return false;
    if (minFeed !== null && agg.numFeedbacks < minFeed) return false;
    if (minArrM !== null && agg.arr < minArrM * 1_000) return false;
    return true;
  });

  return (
    <>
      <main className="flex-1 flex flex-col overflow-hidden min-w-0 max-h-screen">

        {/* ── Table card ── */}
        <div className="mx-5 my-5 bg-white rounded-xl shadow-[0_2px_12px_0_rgba(0,0,0,0.04)] overflow-hidden flex flex-col flex-1">
          {/* ── Page header ── */}
          <div className="flex items-center justify-between px-5 py-2 border-b border-line">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-t1 m-0">Features</h1>
            </div>
            {/* View dropdown */}
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

          {/* ── Toolbar ── */}
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
                      <label
                        key={col.key}
                        className="flex items-center gap-2.5 px-3 py-1.5 cursor-pointer hover:bg-grey-bg transition-colors"
                      >
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
                      <input
                        type="number"
                        min="0"
                        placeholder="Any"
                        value={minCustomers}
                        onChange={(e) => setMinCustomers(e.target.value)}
                        className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-t1 outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-t3 font-medium">Min feedbacks</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="Any"
                        value={minFeedbacks}
                        onChange={(e) => setMinFeedbacks(e.target.value)}
                        className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-t1 outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-t3 font-medium">Min ARR ($K)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="Any"
                        value={minARR}
                        onChange={(e) => setMinARR(e.target.value)}
                        className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-t1 outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    {filterActive && (
                      <button
                        className="text-xs text-t3 hover:text-t1 text-left transition-colors"
                        onClick={() => { setMinCustomers(""); setMinFeedbacks(""); setMinARR(""); }}
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Search */}
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

          {/* ── Tree Table ── */}
          <div className="px-5 py-2 flex-1 overflow-auto">
            <div className="bg-white rounded-xl border border-line overflow-hidden">
              <table className="w-full border-collapse">
                <colgroup>
                  <col />
                  {effectiveCols.has("assignees") && <col style={{ width: "130px" }} />}
                  {effectiveCols.has("createdAt") && <col style={{ width: "120px" }} />}
                  {effectiveCols.has("customers") && <col style={{ width: "110px" }} />}
                  {effectiveCols.has("feedbacks") && <col style={{ width: "110px" }} />}
                  {effectiveCols.has("arr") && <col style={{ width: "80px" }} />}
                </colgroup>
                <thead>
                  <tr className="divide-x divide-line border-b border-line bg-grey">
                    <th className="py-2.5 px-2 text-left text-xs text-t3 font-semibold tracking-wide">
                      <div className="flex items-center justify-between">
                        Folders, sub-folders, features
                        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-white text-t3 cursor-pointer hover:bg-hover transition-colors shadow-[0_2px_12px_0_rgba(0,0,0,0.04)]">
                          <PlusIcon />
                        </div>
                      </div>
                    </th>
                    {effectiveCols.has("assignees") && <th className="py-2.5 px-2 text-left text-xs text-t3 font-semibold tracking-wide">Assignees</th>}
                    {effectiveCols.has("createdAt") && <th className="py-2.5 px-2 text-left text-xs text-t3 font-semibold tracking-wide">Created at</th>}
                    {effectiveCols.has("customers") && <th className="py-2.5 px-2 text-left text-xs text-t3 font-semibold tracking-wide">Customers</th>}
                    {effectiveCols.has("feedbacks") && <th className="py-2.5 px-2 text-left text-xs text-t3 font-semibold tracking-wide">Feedbacks</th>}
                    {effectiveCols.has("arr") && <th className="py-2.5 px-2 text-left text-xs text-t3 font-semibold tracking-wide">ARR</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {flatRows.map(({ node, depth }) => (
                    <TreeRow
                      key={node.id}
                      row={{ node, depth }}
                      expanded={expandedFolders}
                      onToggle={toggleFolder}
                      onSelect={setSelectedFeature}
                      visibleCols={effectiveCols}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Detail Panel */}
      {selectedFeature && (
        <FeatureDetailPanel feature={selectedFeature} onClose={handleClose} />
      )}
    </>
  );
}
