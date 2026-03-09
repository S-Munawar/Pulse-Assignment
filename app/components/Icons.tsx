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
      <rect x="3" y="4" width="14" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5.5" y="6" width="9" height="4" rx="1" fill="currentColor" />
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

// ─── Sidebar / Navigation ─────────────────────────────────────────────────────

export function PulseLogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.67962 2.67938C1.42407 3.93665 1.42407 5.9572 1.42407 9.99999C1.42407 14.0428 1.42407 16.0642 2.67962 17.3197C3.93689 18.5762 5.95743 18.5762 10.0002 18.5762C14.0431 18.5762 16.0645 18.5762 17.32 17.3197C18.5764 16.0651 18.5764 14.0428 18.5764 9.99999C18.5764 5.9572 18.5764 3.93579 17.32 2.67938C16.0653 1.42383 14.0431 1.42383 10.0002 1.42383C5.95743 1.42383 3.93603 1.42383 2.67962 2.67938ZM12.658 10.0806C12.5002 9.8216 12.345 9.5686 12.194 9.38852C12.0337 9.19642 11.7524 8.93227 11.3218 8.94942C10.8913 8.96657 10.6323 9.25216 10.4874 9.45627C10.351 9.64922 10.2172 9.91251 10.08 10.1835L8.37506 13.5454C8.31074 13.6723 8.25756 13.7778 8.20954 13.8687C8.1406 13.769 8.07256 13.6686 8.00542 13.5677L7.85448 13.3395C7.70518 13.1075 7.54579 12.8819 7.37679 12.6637C7.21843 12.4569 7.01937 12.2847 6.7919 12.1578C6.55985 12.039 6.30593 11.9689 6.04577 11.9519C5.8125 11.9296 5.53377 11.9296 5.21902 11.9296H3.99692C3.82633 11.9296 3.66273 11.9974 3.5421 12.118C3.42148 12.2386 3.35371 12.4023 3.35371 12.5728C3.35371 12.7434 3.42148 12.9071 3.5421 13.0276C3.66273 13.1483 3.82633 13.2161 3.99692 13.2161H5.19244C5.54149 13.2161 5.75932 13.2161 5.92656 13.2323C6.08093 13.2469 6.14439 13.2701 6.1847 13.2924C6.22501 13.3138 6.2799 13.3524 6.37767 13.4733C6.48315 13.6037 6.60493 13.7847 6.7979 14.0754L6.95827 14.3147C7.1195 14.5574 7.27816 14.7949 7.43254 14.9656C7.5972 15.1483 7.88021 15.3918 8.29873 15.367C8.71553 15.3421 8.96767 15.0668 9.11089 14.8661C9.24297 14.6783 9.37247 14.4227 9.50454 14.1629L11.2086 10.8027C11.2764 10.6698 11.3321 10.5592 11.3827 10.464C11.4402 10.5549 11.5054 10.6612 11.5825 10.7873L12.1434 11.7032C12.315 11.9837 12.4676 12.2315 12.6151 12.427C12.7746 12.6389 12.9573 12.8293 13.2086 12.9699C13.4599 13.1106 13.7172 13.1672 13.9813 13.1929C14.2249 13.2161 14.5156 13.2161 14.8441 13.2161H16.0036C16.1741 13.2161 16.3378 13.1483 16.4584 13.0276C16.579 12.9071 16.6468 12.7434 16.6468 12.5728C16.6468 12.4023 16.579 12.2386 16.4584 12.118C16.3378 11.9974 16.1741 11.9296 16.0036 11.9296H14.8715C14.5079 11.9296 14.2798 11.9296 14.1048 11.9125C13.9436 11.8962 13.8784 11.8704 13.8372 11.8473C13.7952 11.8241 13.7395 11.7821 13.6425 11.6526C13.5362 11.5128 13.417 11.3181 13.2266 11.0077L12.658 10.0806Z" fill="url(#pulse-gradient)" />
      <defs>
        <linearGradient id="pulse-gradient" x1="7.27415" y1="5.7391" x2="14.4742" y2="16.3141" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2170F4" />
          <stop offset="1" stopColor="#796FEC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SidebarToggleIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M7.49998 3.33334V16.6667M3.33331 5.00001C3.33331 4.55798 3.50891 4.13406 3.82147 3.8215C4.13403 3.50894 4.55795 3.33334 4.99998 3.33334H15C15.442 3.33334 15.8659 3.50894 16.1785 3.8215C16.4911 4.13406 16.6666 4.55798 16.6666 5.00001V15C16.6666 15.442 16.4911 15.866 16.1785 16.1785C15.8659 16.4911 15.442 16.6667 15 16.6667H4.99998C4.55795 16.6667 4.13403 16.4911 3.82147 16.1785C3.50891 15.866 3.33331 15.442 3.33331 15V5.00001Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 8.33334L10.8333 10L12.5 11.6667" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NavOverviewIcon({ active }: { active?: boolean }) {
  const c = active ? "#333333" : "#666666";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M4.16632 9.82083C4.16632 8.68917 4.16632 8.12333 4.39465 7.62583C4.62382 7.12833 5.05299 6.76083 5.91215 6.02417L6.74549 5.31C8.29965 3.97917 9.07465 3.3125 9.99965 3.3125C10.9247 3.3125 11.7005 3.97833 13.2538 5.30917L14.0872 6.02333C14.9455 6.76 15.3755 7.1275 15.6038 7.625C15.833 8.1225 15.833 8.68833 15.833 9.82V13.3542C15.833 14.9258 15.833 15.7108 15.3447 16.1992C14.8563 16.6875 14.0713 16.6875 12.4997 16.6875H7.49965C5.92799 16.6875 5.14299 16.6875 4.65465 16.1992C4.16632 15.7108 4.16632 14.9258 4.16632 13.3542V9.82083Z" stroke={c} strokeWidth="1.5" />
      <path d="M12.083 16.6875V12.5208C12.083 12.2998 11.9952 12.0879 11.8389 11.9316C11.6826 11.7753 11.4707 11.6875 11.2497 11.6875H8.74965C8.52864 11.6875 8.31668 11.7753 8.1604 11.9316C8.00412 12.0879 7.91632 12.2998 7.91632 12.5208V16.6875" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NavCopilotIcon({ active }: { active?: boolean }) {
  const c = active ? "#333333" : "#666666";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M5.83594 11.5586H10.7998C11.4202 11.5586 12.0151 11.8042 12.4531 12.2402C12.8909 12.6761 13.1367 13.2674 13.1367 13.8828V15.2939C13.1367 15.3477 13.1149 15.3997 13.0762 15.4385C13.0372 15.4772 12.9838 15.4999 12.9277 15.5C12.8715 15.5 12.8174 15.4773 12.7783 15.4385C12.7396 15.3997 12.7178 15.3476 12.7178 15.2939V13.8828C12.7178 13.375 12.5153 12.8876 12.1553 12.5293C11.7954 12.1712 11.3076 11.9707 10.7998 11.9707H5.83594C5.32811 11.9708 4.84027 12.1712 4.48047 12.5293C4.12049 12.8876 3.91797 13.375 3.91797 13.8828V15.2939C3.91797 15.3478 3.89635 15.3997 3.85742 15.4385C3.81838 15.4773 3.76517 15.5 3.70898 15.5C3.65284 15.5 3.59956 15.4773 3.56055 15.4385C3.52168 15.3997 3.5 15.3477 3.5 15.2939V13.8828C3.5 13.2673 3.74569 12.6762 4.18359 12.2402C4.62147 11.8043 5.21573 11.5587 5.83594 11.5586ZM15.0547 11.5586C15.4869 11.5586 15.9011 11.7297 16.2061 12.0332C16.511 12.3367 16.6816 12.7485 16.6816 13.1768V14.5879C16.6816 14.6418 16.6601 14.6946 16.6211 14.7334C16.5821 14.7721 16.5287 14.7939 16.4727 14.7939C16.4166 14.7939 16.3632 14.7721 16.3242 14.7334C16.2853 14.6946 16.2637 14.6418 16.2637 14.5879V13.1768C16.2637 12.8564 16.1359 12.5492 15.9092 12.3232C15.6823 12.0974 15.3746 11.9707 15.0547 11.9707H14.3604C14.2831 11.8281 14.198 11.6904 14.1045 11.5586H15.0547ZM8.31836 4.5C9.0327 4.50005 9.71725 4.78301 10.2217 5.28516C10.726 5.78725 11.0088 6.46773 11.0088 7.17676C11.0087 7.88576 10.726 8.56631 10.2217 9.06836C9.71726 9.57044 9.03265 9.85249 8.31836 9.85254C7.60409 9.85254 6.91948 9.57037 6.41504 9.06836C5.91071 8.56631 5.62703 7.88576 5.62695 7.17676C5.62695 6.46765 5.91065 5.78727 6.41504 5.28516C6.91951 4.78297 7.60396 4.5 8.31836 4.5ZM14.3457 6.61719C14.7779 6.61725 15.1921 6.78833 15.4971 7.0918C15.802 7.39534 15.9727 7.80706 15.9727 8.23535C15.9726 8.66349 15.8018 9.07443 15.4971 9.37793C15.1921 9.68149 14.7779 9.85247 14.3457 9.85254C13.9134 9.85254 13.4993 9.68155 13.1943 9.37793C12.8894 9.0744 12.7178 8.66361 12.7178 8.23535C12.7178 7.80706 12.8894 7.39534 13.1943 7.0918C13.4993 6.78842 13.9136 6.61719 14.3457 6.61719ZM8.31836 4.91211C7.71634 4.91211 7.1383 5.14977 6.71191 5.57422C6.28545 5.99876 6.0459 6.57539 6.0459 7.17676C6.04597 7.77794 6.28562 8.35387 6.71191 8.77832C7.13831 9.20278 7.71632 9.44141 8.31836 9.44141C8.92033 9.44136 9.49845 9.20274 9.9248 8.77832C10.351 8.35388 10.5907 7.77786 10.5908 7.17676C10.5908 6.57546 10.3512 5.99874 9.9248 5.57422C9.49846 5.1498 8.92033 4.91216 8.31836 4.91211ZM14.3457 7.0293C14.0258 7.0293 13.7181 7.15594 13.4912 7.38184C13.2643 7.6078 13.1367 7.91483 13.1367 8.23535C13.1367 8.55588 13.2642 8.86291 13.4912 9.08887C13.7181 9.31476 14.0258 9.44141 14.3457 9.44141C14.6654 9.44134 14.9724 9.31455 15.1992 9.08887C15.4262 8.86291 15.5547 8.55588 15.5547 8.23535C15.5547 7.9148 15.4262 7.60781 15.1992 7.38184C14.9724 7.15611 14.6655 7.02936 14.3457 7.0293Z" stroke={c} />
    </svg>
  );
}

export function NavInsightsIcon({ active }: { active?: boolean }) {
  const c = active ? "#333333" : "#666666";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M7.99901 13.9999V13.8929C7.99901 13.0979 7.50301 12.4049 6.88201 11.9089C6.07147 11.2625 5.48191 10.3802 5.19491 9.38395C4.90792 8.38773 4.93769 7.32694 5.28011 6.34839C5.62252 5.36984 6.26065 4.52193 7.10617 3.922C7.95169 3.32208 8.96278 2.99982 9.99951 2.99982C11.0362 2.99982 12.0473 3.32208 12.8929 3.922C13.7384 4.52193 14.3765 5.36984 14.7189 6.34839C15.0613 7.32694 15.0911 8.38773 14.8041 9.38395C14.5171 10.3802 13.9276 11.2625 13.117 11.9089C12.495 12.4059 11.999 13.0979 11.999 13.8929V13.9999M7.99901 13.9999V15.9999C7.99901 16.2652 8.10437 16.5195 8.29191 16.707C8.47944 16.8946 8.7338 16.9999 8.99901 16.9999H10.999C11.2642 16.9999 11.5186 16.8946 11.7061 16.707C11.8937 16.5195 11.999 16.2652 11.999 15.9999V13.9999M7.99901 13.9999H11.999M9.99901 10.9999V8.99993" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NavFeaturesIcon({ active }: { active?: boolean }) {
  const c = active ? "#333333" : "#666666";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <rect x="3.78235" y="3.29248" width="12.4352" height="13.415" rx="2.25" stroke={c} strokeWidth="1.5" />
      <path d="M6.74631 7.31982H13.2542" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.74622 10.2261H9.992" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function NavCustomersIcon({ active }: { active?: boolean }) {
  const c = active ? "#333333" : "#666666";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M13.9592 13.1271C13.9592 11.6687 12.1866 10.4874 9.99961 10.4874M9.99961 10.4874C7.81261 10.4874 6.04004 11.6687 6.04004 13.1271M9.99961 10.4874C9.29951 10.4874 8.62856 10.2093 8.13351 9.71428C7.63847 9.21924 7.36036 8.54782 7.36036 7.84772C7.36036 7.14763 7.63847 6.4762 8.13351 5.98116C8.62856 5.48612 9.29998 5.20801 10.0001 5.20801C10.7002 5.20801 11.3716 5.48612 11.8666 5.98116C12.3617 6.4762 12.6398 7.14763 12.6398 7.84772C12.6398 8.54782 12.3617 9.21924 11.8666 9.71428C11.3716 10.2093 10.6997 10.4874 9.99961 10.4874Z" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.93945 6.92727V5.97314C2.93945 4.31629 4.2826 2.97314 5.93945 2.97314H7.19305" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.89357 17.0811H5.93945C4.2826 17.0811 2.93945 15.7379 2.93945 14.0811L2.93945 12.8275" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17.0146 13.1269V14.0811C17.0146 15.7379 15.6715 17.0811 14.0146 17.0811H12.7611" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.0605 2.89014L14.0147 2.89014C15.6715 2.89014 17.0146 4.23328 17.0146 5.89014V7.14373" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function NavTrendsIcon({ active }: { active?: boolean }) {
  const c = active ? "#333333" : "#666666";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M11.5525 8.76424L10.7866 8.41018C10.7235 8.38144 10.67 8.33516 10.6325 8.27687C10.595 8.21857 10.5751 8.15072 10.5751 8.0814C10.5751 8.01209 10.595 7.94424 10.6325 7.88594C10.67 7.82765 10.7235 7.78137 10.7866 7.75263L11.5525 7.39857L11.9066 6.63986C11.9353 6.57678 11.9816 6.5233 12.0399 6.4858C12.0982 6.4483 12.166 6.42836 12.2354 6.42836C12.3047 6.42836 12.3725 6.4483 12.4308 6.4858C12.4891 6.5233 12.5354 6.57678 12.5641 6.63986L12.9182 7.40579L13.6769 7.75986C13.74 7.7886 13.7935 7.83487 13.831 7.89317C13.8685 7.95146 13.8884 8.01931 13.8884 8.08863C13.8884 8.15795 13.8685 8.2258 13.831 8.28409C13.7935 8.34239 13.74 8.38867 13.6769 8.4174L12.911 8.77147L12.5569 9.53018C12.5282 9.59326 12.4819 9.64673 12.4236 9.68423C12.3653 9.72173 12.2975 9.74167 12.2281 9.74167C12.1588 9.74167 12.091 9.72173 12.0327 9.68423C11.9744 9.64673 11.9281 9.59326 11.8994 9.53018L11.5525 8.76424ZM4.60853 10.9753L4.96259 10.2094L5.72853 9.85534C5.7916 9.8266 5.84508 9.78032 5.88258 9.72203C5.92008 9.66373 5.94002 9.59588 5.94002 9.52657C5.94002 9.45725 5.92008 9.3894 5.88258 9.3311C5.84508 9.27281 5.7916 9.22653 5.72853 9.19779L4.96259 8.84373L4.60853 8.08502C4.58068 8.02201 4.53512 7.96845 4.47739 7.93085C4.41966 7.89325 4.35226 7.87323 4.28337 7.87323C4.21448 7.87323 4.14707 7.89325 4.08934 7.93085C4.03162 7.96845 3.98606 8.02201 3.9582 8.08502L3.60414 8.85095L2.83821 9.20502C2.77513 9.23376 2.72165 9.28003 2.68415 9.33833C2.64665 9.39662 2.62671 9.46448 2.62671 9.53379C2.62671 9.60311 2.64665 9.67096 2.68415 9.72925C2.72165 9.78755 2.77513 9.83383 2.83821 9.86257L3.60414 10.2166L3.9582 10.9753C4.08104 11.2571 4.48569 11.2571 4.60853 10.9753ZM7.86737 7.35521L8.32259 6.3436L9.3342 5.88837C9.39728 5.85963 9.45076 5.81336 9.48826 5.75506C9.52576 5.69677 9.5457 5.62891 9.5457 5.5596C9.5457 5.49028 9.52576 5.42243 9.48826 5.36414C9.45076 5.30584 9.39728 5.25956 9.3342 5.23082L8.32259 4.7756L7.86737 3.76399C7.83863 3.70091 7.79235 3.64743 7.73405 3.60993C7.67576 3.57243 7.60791 3.55249 7.53859 3.55249C7.46928 3.55249 7.40142 3.57243 7.34313 3.60993C7.28483 3.64743 7.23856 3.70091 7.20982 3.76399L6.75459 4.7756L5.74298 5.23082C5.6799 5.25956 5.62642 5.30584 5.58892 5.36414C5.55142 5.42243 5.53148 5.49028 5.53148 5.5596C5.53148 5.62891 5.55142 5.69677 5.58892 5.75506C5.62642 5.81336 5.6799 5.85963 5.74298 5.88837L6.75459 6.3436L7.20982 7.35521C7.33266 7.63702 7.7373 7.63702 7.86737 7.35521Z" fill={c} />
      <path d="M4.0293 15.9211L8.72852 11.092L11.7736 14.0939L16.6271 8.81201" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NavHotspotsIcon({ active }: { active?: boolean }) {
  const c = active ? "#333333" : "#666666";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M15.1017 14.7041C14.5544 15.5755 13.7922 16.2915 12.8883 16.7833C11.989 17.2713 10.978 17.5163 9.955 17.4941C9.00028 17.5374 8.05075 17.3312 7.2 16.8958C6.34429 16.4581 5.61542 15.8079 5.08333 15.0075C2.85667 11.1991 5.3225 7.63581 5.8225 6.95081C6.26656 6.47556 6.5778 5.89186 6.725 5.25831C6.87266 4.62229 6.85169 3.95874 6.66417 3.33331C7.73417 4.13748 12.0225 6.04831 11.2683 12.1925C12.515 11.2458 13.5183 9.65415 13.64 7.01248C14.8317 7.89665 16.9608 11.5641 15.1017 14.7041Z" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HistoryArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="w-5 h-5 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 10L8.5 12.5M6 10L8.5 7.5M6 10H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrgChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.66803 8.33325L10.0014 11.6666L13.3347 8.33325" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.771 6.71734C6.771 6.71734 6.81943 5.60738 7.89913 4.71739C8.54021 4.18898 9.31013 4.03594 9.99999 4.02652C10.63 4.01878 11.193 4.12541 11.5297 4.28955C12.1052 4.57141 13.229 5.25757 13.229 6.71734C13.229 8.25347 12.2475 8.94972 11.1318 9.71694C10.0161 10.4842 9.73091 11.2366 9.73091 12.099" stroke="#666666" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M9.99991 15.9738C10.5944 15.9738 11.0762 15.4919 11.0762 14.8975C11.0762 14.3031 10.5944 13.8212 9.99991 13.8212C9.40547 13.8212 8.92358 14.3031 8.92358 14.8975C8.92358 15.4919 9.40547 15.9738 9.99991 15.9738Z" fill="#666666" />
    </svg>
  );
}
