"use client";

import type { Feature } from "../../lib/mockData";
import { TreeRow } from "./TreeRow";
import { PlusIcon } from "../../components/Icons";
import { type FlatRow, COL_META } from "../../lib/treeUtils";

interface FeaturesTableProps {
  flatRows: FlatRow[];
  effectiveCols: Set<string>;
  expandedFolders: Set<string>;
  toggleFolder: (id: string) => void;
  onSelect: (f: Feature) => void;
}

export function FeaturesTable({ flatRows, effectiveCols, expandedFolders, toggleFolder, onSelect }: FeaturesTableProps) {
  return (
    <div className="px-5 py-2 flex-1 overflow-auto">
      <div className="bg-white rounded-xl border border-line overflow-hidden min-w-max">
        <table className="w-full border-collapse">
          <colgroup>
            <col />
            {effectiveCols.has("assignees") && <col style={{ width: COL_META.find(c => c.key === "assignees")!.width }} />}
            {effectiveCols.has("createdAt") && <col style={{ width: COL_META.find(c => c.key === "createdAt")!.width }} />}
            {effectiveCols.has("customers") && <col style={{ width: COL_META.find(c => c.key === "customers")!.width }} />}
            {effectiveCols.has("feedbacks") && <col style={{ width: COL_META.find(c => c.key === "feedbacks")!.width }} />}
            {effectiveCols.has("arr") && <col style={{ width: COL_META.find(c => c.key === "arr")!.width }} />}
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
                onSelect={onSelect}
                visibleCols={effectiveCols}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
