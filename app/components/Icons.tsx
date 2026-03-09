"use client";

// ─── Status ───────────────────────────────────────────────────────────────────

export function StatusIcon({ status }: { status: string }) {
  if (status === "done")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
        <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" stroke="#F97316" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#F97316" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  if (status === "in-progress")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="#796FEC" />
        <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-10 6a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" fill="#796FEC" />
      </svg>
    );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="#D1D5DB" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-10 6a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" fill="#D1D5DB" />
    </svg>
  );
}

// ─── Tree ─────────────────────────────────────────────────────────────────────

export function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
      <path d="M10 2L17 6L10 10L3 6Z" fill="#9CA3AF" fillOpacity="0.18" stroke="#9CA3AF" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M3 6L3 14L10 18L10 10Z" fill="#9CA3AF" fillOpacity="0.10" stroke="#9CA3AF" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M17 6L17 14L10 18L10 10Z" fill="#9CA3AF" fillOpacity="0.06" stroke="#9CA3AF" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function FeatureDocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
      <rect x="3" y="1.5" width="14" height="17" rx="2" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M7 7H13M7 10.5H13M7 14H10.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      className={`flex-shrink-0 text-t3 transition-transform duration-150 ${className ?? ""}`}
    >
      <path d="M7 5L13 10L7 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ColumnsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="8" y="4" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14" y="4" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M3 5H17M6 10H14M9 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ClearIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <rect x="7" y="7" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 7V4.5A1.5 1.5 0 0 0 11.5 3H3.5A1.5 1.5 0 0 0 2 4.5V13A1.5 1.5 0 0 0 3.5 14.5H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M10 3V13M10 13L6.5 9.5M10 13L13.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function OpenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect 
    x="3" 
    y="4" 
    width="14" 
    height="12" 
    rx="3" 
    stroke="#666666" 
    stroke-width="1.5"
  />
  <rect 
    x="5.5" 
    y="6" 
    width="9" 
    height="4" 
    rx="1" 
    fill="#666666"
  />
</svg>
  );
}

// ─── General actions ──────────────────────────────────────────────────────────

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DotsVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="5" r="1.2" fill="currentColor" />
      <circle cx="10" cy="10" r="1.2" fill="currentColor" />
      <circle cx="10" cy="15" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M18 10L2 3L6 10L2 17L18 10Z" fill="currentColor" />
    </svg>
  );
}

export function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 10C4 6.686 6.686 4 10 4C12.21 4 14.14 5.177 15.197 6.94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 10C16 13.314 13.314 16 10 16C7.79 16 5.86 14.823 4.803 13.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 6L15.2 6.9L14.3 4.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14L4.8 13.1L5.7 15.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Feature actions ──────────────────────────────────────────────────────────

export function DocumentFillIcon({ width = 15, height = 15 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path d="M14.5 2H5.5C4.67 2 4 2.67 4 3.5V16.5C4 17.33 4.67 18 5.5 18H14.5C15.33 18 16 17.33 16 16.5V3.5C16 2.67 15.33 2 14.5 2ZM13 12H7V10.5H13V12ZM13 9H7V7.5H13V9Z" fill="currentColor" />
    </svg>
  );
}

export function DocumentOutlineIcon({ width = 14, height = 14 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path d="M14.5 2H5.5C4.67 2 4 2.67 4 3.5V16.5C4 17.33 4.67 18 5.5 18H14.5C15.33 18 16 17.33 16 16.5V3.5C16 2.67 15.33 2 14.5 2Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 7H12M8 10H11M8 13H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function FlaskIcon({ width = 15, height = 15 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path d="M8 2V7L4 12V18H16V12L12 7V2H8ZM10 1H10.5V2H9.5V1H10ZM6 13H14V16H6V13Z" fill="currentColor" />
    </svg>
  );
}

export function ChatFillIcon({ width = 15, height = 15 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path d="M16 2H4C2.9 2 2 2.9 2 4V18L6 14H16C17.1 14 18 13.1 18 12V4C18 2.9 17.1 2 16 2ZM16 12H6L4 14V4H16V12Z" fill="currentColor" />
    </svg>
  );
}

export function ChatOutlineIcon({ width = 15, height = 15, stroke = "currentColor", strokeWidth = "1.2" }: { width?: number; height?: number; stroke?: string; strokeWidth?: string }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path d="M16 2H4C2.9 2 2 2.9 2 4V18L6 14H16C17.1 14 18 13.1 18 12V4C18 2.9 17.1 2 16 2Z" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}

export function ShareStarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
      <path d="M10 1L12.5 6.5L18 7.5L14 11.5L15 17.5L10 14.5L5 17.5L6 11.5L2 7.5L7.5 6.5L10 1Z" fill="currentColor" />
    </svg>
  );
}

export function ArrMetricIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M9.5 3C6 3 3 6 3 9.5S6 16 9.5 16 16 13 16 9.5 13 3 9.5 3Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── AI / Copilot ─────────────────────────────────────────────────────────────

export function StarIcon({ fill = "currentColor", width = 14, height = 14 }: { fill?: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path d="M10 2L12.09 7.26L17.85 8.27L13.92 12.14L14.91 18.01L10 15.27L5.09 18.01L6.08 12.14L2.15 8.27L7.91 7.26L10 2Z" fill={fill} />
    </svg>
  );
}

export function AIStarGradientIcon({ gradientId, width = 16, height = 16 }: { gradientId: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path d="M10 2L12.09 7.26L17.85 8.27L13.92 12.14L14.91 18.01L10 15.27L5.09 18.01L6.08 12.14L2.15 8.27L7.91 7.26L10 2Z" fill={`url(#${gradientId})`} />
      <defs>
        <linearGradient id={gradientId} x1="2" y1="2" x2="18" y2="18">
          <stop stopColor="#2170F4" />
          <stop offset="1" stopColor="#796FEC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Notification ─────────────────────────────────────────────────────────────

export function NotifStatusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="#2170F4" strokeWidth="1.5" />
      <path d="M7 10L9 12L13 8" stroke="#2170F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NotifCommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M16 2H4C2.9 2 2 2.9 2 4V14C2 15.1 2.9 16 4 16H14L18 20V4C18 2.9 17.1 2 16 2Z" stroke="#4CAF50" strokeWidth="1.2" />
    </svg>
  );
}

export function NotifInsightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M10 3C10 3 14 6 14 11C14 13.21 12.21 15 10 15C7.79 15 6 13.21 6 11C6 6 10 3 10 3Z" stroke="#796FEC" strokeWidth="1.2" />
    </svg>
  );
}

export function NotifAssignmentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="8" r="3.5" stroke="#C59937" strokeWidth="1.2" />
      <path d="M4 17C4 14.24 6.69 12 10 12C13.31 12 16 14.24 16 17" stroke="#C59937" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function NotifMentionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3" stroke="#DD5263" strokeWidth="1.2" />
      <path d="M17 10C17 13.87 13.87 17 10 17C6.13 17 3 13.87 3 10C3 6.13 6.13 3 10 3C13.87 3 17 6.13 17 10V11.5C17 12.33 16.33 13 15.5 13C14.67 13 14 12.33 14 11.5V7" stroke="#DD5263" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function NotifExperimentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M8 2V8L3 14V17H17V14L12 8V2" stroke="#136C63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
