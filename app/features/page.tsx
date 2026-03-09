"use client";

import { useState } from "react";
import FeatureDetailPanel from "./_components/FeatureDetailPanel";
import { treeData } from "../lib/mockData";
import type { Feature } from "../lib/mockData";
import { COL_META, type ColKey, flattenTree, matchesSearch, aggregate } from "../lib/treeUtils";
import { PageHeader } from "./_components/PageHeader";
import { Toolbar } from "./_components/Toolbar";
import { FeaturesTable } from "./_components/FeaturesTable";

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["folder-1"]));
  const [visibleCols, setVisibleCols] = useState<Set<ColKey>>(new Set(COL_META.map((c) => c.key)));
  const [minCustomers, setMinCustomers] = useState("");
  const [minFeedbacks, setMinFeedbacks] = useState("");
  const [minARR, setMinARR] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
  const effectiveCols = new Set(visibleCols);
  if (selectedFeature) {
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
        <div className="mx-5 my-5 bg-white rounded-xl shadow-[0_2px_12px_0_rgba(0,0,0,0.04)] overflow-hidden flex flex-col flex-1">
          <PageHeader />
          <Toolbar
            visibleCols={visibleCols}
            toggleCol={toggleCol}
            filterActive={filterActive}
            activeFilterCount={activeFilterCount}
            minCustomers={minCustomers}
            setMinCustomers={setMinCustomers}
            minFeedbacks={minFeedbacks}
            setMinFeedbacks={setMinFeedbacks}
            minARR={minARR}
            setMinARR={setMinARR}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <FeaturesTable
            flatRows={flatRows}
            effectiveCols={effectiveCols}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
            onSelect={setSelectedFeature}
          />
        </div>
      </main>

      {selectedFeature && (
        <FeatureDetailPanel feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      )}
    </>
  );
}
