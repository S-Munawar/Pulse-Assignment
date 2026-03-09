"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  PulseLogoIcon,
  SidebarToggleIcon,
  NavOverviewIcon,
  NavCopilotIcon,
  NavInsightsIcon,
  NavFeaturesIcon,
  NavCustomersIcon,
  NavTrendsIcon,
  NavHotspotsIcon,
  OrgChevronIcon,
  HelpIcon,
  HistoryArrowIcon
} from "./Icons";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => pathname === path;

  const linkBase = "flex items-center rounded text-sm text-t1 no-underline transition-colors hover:bg-hover";
  const linkExpanded = "gap-0.5 px-2 py-1";
  const linkCollapsed = "justify-center p-2";

  return (
    <aside
      className={`flex flex-col max-h-screen bg-grey-bg h-screen sticky top-0 overflow-y-auto overflow-x-hidden transition-[width] duration-200 ease-in-out shrink-0 ${
        collapsed ? "w-14 min-w-14" : "w-44 min-w-44"
      }`}
    >
      <div className="flex flex-col flex-1 my-5">
        {/* Header */}
        <div className={`flex items-center pt-3 pb-2 ${collapsed ? "flex-col gap-2 px-2" : "justify-between px-3"}`}>
          <div className={`flex items-center gap-1.5 ${collapsed ? "justify-center" : ""}`}>
            <PulseLogoIcon />
            {!collapsed && <span className="text-sm font-semibold text-t1 whitespace-nowrap">Pulse</span>}
          </div>

          {/* Toggle button */}
          <button
            className="bg-transparent border-none cursor-pointer p-0.5 flex items-center justify-center rounded text-t2 hover:bg-hover flex-shrink-0"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <SidebarToggleIcon className={`transition-transform duration-200 ${collapsed ? "scale-x-[-1]" : ""}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-5 p-2 flex-1">
          {/* Top-level items */}
          <div className="flex flex-col gap-0.5">
            <Link href="/" title="Overview" className={`${linkBase} ${collapsed ? linkCollapsed : linkExpanded} ${isActive("/") ? "bg-sel" : ""}`}>
              <NavOverviewIcon active={isActive("/")} />
              {!collapsed && <span>Overview</span>}
            </Link>

            <Link href="/copilot" title="Copilot" className={`${linkBase} ${collapsed ? linkCollapsed : linkExpanded} ${isActive("/copilot") ? "bg-sel" : ""}`}>
              <NavCopilotIcon active={isActive("/copilot")} />
              {!collapsed && <span>Copilot</span>}
            </Link>
          </div>

          {/* Workflows section */}
          <div className="flex flex-col gap-0.5">
            {collapsed
              ? <div className="h-px bg-line mx-1 my-1" />
              : <span className="text-sm text-t3 px-2 py-1 h-6 flex items-center">Workflows</span>
            }

            <Link href="/insights" title="Insights" className={`${linkBase} ${collapsed ? linkCollapsed : linkExpanded} ${isActive("/insights") ? "bg-sel" : ""}`}>
              <NavInsightsIcon active={isActive("/insights")} />
              {!collapsed && <span>Insights</span>}
            </Link>

            <Link href="/features" title="Features" className={`${linkBase} ${collapsed ? linkCollapsed : linkExpanded} ${isActive("/features") ? "bg-sel" : ""}`}>
              <NavFeaturesIcon active={isActive("/features")} />
              {!collapsed && <span>Features</span>}
            </Link>
          </div>

          {/* Voice of customers section */}
          <div className="flex flex-col gap-0.5">
            {collapsed
              ? <div className="h-px bg-line mx-1 my-1" />
              : <span className="text-sm text-t3 px-2 py-1 h-6 flex items-center">Voice of customers</span>
            }

            <Link href="/customers" title="Customers" className={`${linkBase} ${collapsed ? linkCollapsed : linkExpanded} ${isActive("/customers") ? "bg-sel" : ""}`}>
              <NavCustomersIcon active={isActive("/customers")} />
              {!collapsed && <span>Customers</span>}
            </Link>

            <Link href="/trends" title="Trends" className={`${linkBase} ${collapsed ? linkCollapsed : linkExpanded} ${isActive("/trends") ? "bg-sel" : ""}`}>
              <NavTrendsIcon active={isActive("/trends")} />
              {!collapsed && <span>Trends</span>}
            </Link>

            <Link href="/hotspots" title="Hotspots" className={`${linkBase} ${collapsed ? linkCollapsed : linkExpanded} ${isActive("/hotspots") ? "bg-sel" : ""}`}>
              <NavHotspotsIcon active={isActive("/hotspots")} />
              {!collapsed && <span>Hotspots</span>}
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className={`flex flex-col item-center pb-6 gap-2`}>
          <div className={`flex items-center gap-1 text-black px-3 ${collapsed ? "hidden" : "flex"}`}>
            <button className="flex items-center justify-center w-7 h-7 rounded-full border border-black/10 bg-grey-bg cursor-pointer p-1 hover:bg-hover" aria-label="Help" title="Help">
              <HistoryArrowIcon />
            </button>
            Pulse check
          </div>
          <div className={`flex items-center ${collapsed ? "flex-col gap-2 px-2" : "justify-between px-3"}`}>
            <button
              title="Pulse"
              className={`flex items-center gap-1 border border-black/10 rounded-full bg-transparent cursor-pointer text-t1 hover:bg-hover ${
                collapsed ? "p-1" : "px-1.5 py-1"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-green-300 text-t1 text-xs font-semibold flex items-center justify-center flex-shrink-0">P</div>
              {!collapsed && (
                <>
                  <span className="text-sm text-t1 whitespace-nowrap">Pulse</span>
                  <OrgChevronIcon />
                </>
              )}
            </button>
            <button className="flex items-center justify-center w-7 h-7 rounded-full border border-black/10 bg-grey-bg cursor-pointer p-1 hover:bg-hover" aria-label="Help" title="Help">
              <HelpIcon />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
