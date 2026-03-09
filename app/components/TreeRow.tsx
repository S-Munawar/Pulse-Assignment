"use client";
import { type Feature, formatARR, type TreeFeature, features } from "../lib/mockData";
import { FlatRow, aggregate, computeFolderStatus, AvatarStack } from "../features/page";
import { FolderIcon, FeatureDocIcon, StatusIcon, ChevronRightIcon, OpenIcon, DotsVerticalIcon } from "./Icons";

// ─── Tree Row ─────────────────────────────────────────────────────────────────
export function TreeRow({
  row, expanded, onToggle, onSelect, visibleCols,
}: {
  row: FlatRow;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (f: Feature) => void;
  visibleCols: Set<string>;
}) {
  const { node, depth } = row;
  const agg = aggregate(node);
  const indent = 8 + depth * 16;

  if (node.type === "folder") {
    const isExpanded = expanded.has(node.id);
    return (
      <tr className="divide-x divide-line bg-white hover:bg-hover cursor-pointer transition-colors" onClick={() => onToggle(node.id)}>
        <td className="py-2.5 px-2">
          <div style={{ paddingLeft: indent }} className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            <ChevronRightIcon className={isExpanded ? "rotate-90" : ""} />
            <StatusIcon status={computeFolderStatus(node)} />
            <FolderIcon />
            <span className="text-sm text-t1 font-medium truncate">{node.title}</span>
          </div>
        </td>
        {visibleCols.has("assignees") && <td className="py-2.5 px-2"><AvatarStack assignees={agg.assignees} /></td>}
        {visibleCols.has("createdAt") && <td className="py-2.5 px-2 text-xs text-t3">{agg.createdAt}</td>}
        {visibleCols.has("customers") && <td className="py-2.5 px-2 text-xs text-t2">{agg.numCustomers}</td>}
        {visibleCols.has("feedbacks") && <td className="py-2.5 px-2 text-xs text-t2">{agg.numFeedbacks}</td>}
        {visibleCols.has("arr") && <td className="py-2.5 px-2 text-xs text-t2 font-medium">{formatARR(agg.arr)}</td>}
      </tr>
    );
  }

  // Feature row
  const feature = node as TreeFeature;
  const detailFeature = feature.detailId != null ? features.find((f) => f.id === feature.detailId) ?? null : null;

  return (
    <tr
      className={`group divide-x divide-line hover:bg-hover transition-colors ${detailFeature ? "cursor-pointer" : ""}`}
    >
      <td className="py-2.5 px-2 bg-grey-bg">
        <div style={{ paddingLeft: indent }} className="flex items-center gap-1.5 min-w-0 overflow-hidden">
          <StatusIcon status={feature.status} />
          <FeatureDocIcon />
          <span className="text-sm text-t1 truncate">{feature.title}</span>
          <div className="flex items-center ml-auto mr-2 gap-1.5 text-t2 text-xs font-medium opacity-0 group-hover:opacity-100">
            <div
              className="flex gap-1 px-1 py-1 bg-white border border-gray-200 rounded-lg hover:bg-hover shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              onClick={(e) => { e.stopPropagation(); detailFeature && onSelect({ ...detailFeature, title: feature.title }); }}
            >
              <OpenIcon />
              open
            </div>
            <DotsVerticalIcon />
          </div>
        </div>
      </td>
      {visibleCols.has("assignees") && <td className="py-2.5 px-2"><AvatarStack assignees={feature.assignees} /></td>}
      {visibleCols.has("createdAt") && <td className="py-2.5 px-2 text-xs text-t3">{feature.createdAt}</td>}
      {visibleCols.has("customers") && <td className="py-2.5 px-2 text-xs text-t2">{feature.numCustomers}</td>}
      {visibleCols.has("feedbacks") && <td className="py-2.5 px-2 text-xs text-t2">{feature.numFeedbacks}</td>}
      {visibleCols.has("arr") && (
        <td className="py-2.5 px-2 text-xs text-t2 font-medium">
          {feature.arr > 0 ? formatARR(feature.arr) : <span className="text-t3">—</span>}
        </td>
      )}
    </tr>
  );
}
