import type { TreeNode } from "./mockData";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AggregatedData {
  numCustomers: number;
  numFeedbacks: number;
  arr: number;
  assignees: { initials: string; color: string }[];
  createdAt: string;
}

export interface FlatRow {
  node: TreeNode;
  depth: number;
}

export const COL_META = [
  { key: "assignees", label: "Assignees", width: "130px" },
  { key: "createdAt", label: "Created at", width: "120px" },
  { key: "customers", label: "Customers", width: "110px" },
  { key: "feedbacks", label: "Feedbacks", width: "110px" },
  { key: "arr", label: "ARR", width: "80px" },
] as const;

export type ColKey = (typeof COL_META)[number]["key"];

// ─── Tree helpers ─────────────────────────────────────────────────────────────

export function parseAgeDays(s: string): number {
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

export function flattenTree(nodes: TreeNode[], expanded: Set<string>, depth = 0): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const node of nodes) {
    rows.push({ node, depth });
    if (node.type === "folder" && expanded.has(node.id)) {
      rows.push(...flattenTree(node.children, expanded, depth + 1));
    }
  }
  return rows;
}

export function matchesSearch(node: TreeNode, q: string): boolean {
  if (node.title.toLowerCase().includes(q)) return true;
  if (node.type === "folder") return node.children.some((c) => matchesSearch(c, q));
  return false;
}
