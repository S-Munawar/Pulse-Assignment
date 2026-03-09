"use client";

import { useState, useRef, useEffect } from "react";
import type {
  Feature,
  Insight,
  FeatureCustomer,
  Discussion,
  Experiment,
  ActivityItem,
  InsightType,
  SourceType,
} from "../../lib/mockData";
import {
  StatusIcon,
  AIStarGradientIcon,
  StarIcon,
  RefreshIcon,
  DocumentFillIcon,
  DocumentOutlineIcon,
  FlaskIcon,
  ChatFillIcon,
  ChatOutlineIcon,
  ShareStarIcon,
  DotsVerticalIcon,
  CloseIcon,
  SendIcon,
  ArrMetricIcon,
  NotifStatusIcon,
  NotifCommentIcon,
  NotifInsightIcon,
  NotifAssignmentIcon,
  NotifMentionIcon,
  NotifExperimentIcon,
} from "../../components/Icons";

// ─── Source Badge ─────────────────────────────────────────────────────────────

const SOURCE_CONFIG: Record<SourceType, { label: string; bg: string; color: string }> = {
  zendesk: { label: "Zendesk", bg: "rgba(3,118,193,0.12)", color: "#0376C1" },
  slack: { label: "Slack", bg: "rgba(74,21,75,0.12)", color: "#4A154B" },
  gong: { label: "Gong", bg: "rgba(94,51,176,0.12)", color: "#5E33B0" },
  freshdesk: { label: "Freshdesk", bg: "rgba(19,108,99,0.12)", color: "#136C63" },
  fireflies: { label: "Fireflies", bg: "rgba(102,16,242,0.12)", color: "#6610F2" },
  hubspot: { label: "HubSpot", bg: "rgba(255,122,0,0.12)", color: "#FF7A00" },
};

function SourceBadge({ source }: { source: SourceType }) {
  const cfg = SOURCE_CONFIG[source];
  return (
    <span style={{ background: cfg.bg, color: cfg.color }} className="inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium whitespace-nowrap">
      {cfg.label}
    </span>
  );
}

// ─── Insight Type Badge ───────────────────────────────────────────────────────

const INSIGHT_TYPE_CONFIG: Record<InsightType, { label: string; bg: string; color: string }> = {
  "feature-request": { label: "Feature Request", bg: "rgba(33,112,244,0.1)", color: "#1456C0" },
  bug: { label: "Bug", bg: "rgba(212,88,103,0.1)", color: "#8C2233" },
  "pain-point": { label: "Pain Point", bg: "rgba(212,126,95,0.1)", color: "#A0512A" },
  praise: { label: "Praise", bg: "rgba(76,175,80,0.1)", color: "#2E7D32" },
};

function InsightTypeBadge({ type }: { type: InsightType }) {
  const cfg = INSIGHT_TYPE_CONFIG[type];
  return (
    <span style={{ background: cfg.bg, color: cfg.color }} className="inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium whitespace-nowrap">
      {cfg.label}
    </span>
  );
}

// ─── Sentiment Dot ────────────────────────────────────────────────────────────

const SENTIMENT_BORDER: Record<string, string> = {
  positive: "#4CAF50",
  negative: "#D45867",
  neutral: "#DEDEDE",
};

// ─── Star Sentiment ───────────────────────────────────────────────────────────

function SentimentBar({ score }: { score: number }) {
  const pct = (score / 5) * 100;
  const color = score >= 4 ? "#4CAF50" : score >= 3 ? "#C59937" : "#D45867";
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-[5px] bg-hover rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[12px] font-semibold" style={{ color }}>{score.toFixed(1)}</span>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ initials, color, size = 28 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      style={{ width: size, height: size, background: color, borderRadius: "50%", color: "#fff", fontSize: size * 0.38, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
    >
      {initials}
    </div>
  );
}

// ─── TABS ──────────────────────────────────────────────────────────────────────

type TabId = "overview" | "insights" | "customers" | "discussion" | "experiments" | "canvas" | "notifications";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "insights", label: "Insights" },
  { id: "customers", label: "Customers" },
  { id: "discussion", label: "Discussion" },
  { id: "experiments", label: "Experiments" },
  { id: "canvas", label: "Canvas" },
  { id: "notifications", label: "Notifications" },
];

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ feature, onTabSwitch }: { feature: Feature; onTabSwitch: (tab: TabId) => void }) {
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => setRegenerating(false), 1800);
  };

  const topInsights = feature.insights.slice(0, 2);

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
      {/* AI Summary Card */}
      <div className="bg-[linear-gradient(135deg,rgba(33,112,244,0.04)_0%,rgba(121,111,236,0.06)_100%)] border border-[rgba(33,112,244,0.15)] rounded-[10px] p-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-brand">
            <AIStarGradientIcon gradientId="star-grad" />
            <span>AI Summary</span>
          </div>
          <button
            className={`flex items-center gap-[5px] text-[12px] text-t2 bg-transparent border border-line rounded px-2 py-[3px] cursor-pointer hover:bg-hover${regenerating ? " [&_svg]:animate-spin-icon" : ""}`}
            onClick={handleRegenerate}
          >
            <RefreshIcon />
            {regenerating ? "Regenerating…" : "Refresh"}
          </button>
        </div>
        <p className={`text-[13px] text-t1 leading-[1.65] m-0 mb-[6px]${summaryExpanded ? "" : " line-clamp-3"}`}>
          {regenerating ? (
            <span className="block bg-[linear-gradient(90deg,#eee_25%,#f5f5f5_50%,#eee_75%)] bg-[length:200%_100%] animate-shimmer rounded h-[72px] w-full" />
          ) : (
            feature.aiSummary
          )}
        </p>
        {!regenerating && (
          <button className="text-[12px] text-brand bg-transparent border-none p-0 cursor-pointer hover:underline" onClick={() => setSummaryExpanded((v) => !v)}>
            {summaryExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-4 gap-2.5">
        <div className="bg-white border border-line rounded-lg px-[14px] py-3 flex flex-col items-center gap-1 text-center">
          <span className="text-[20px] font-bold text-t1 leading-none">{feature.metrics.totalRequests}</span>
          <span className="text-[11px] text-t3 uppercase tracking-[0.04em]">Requests</span>
        </div>
        <div className="bg-white border border-line rounded-lg px-[14px] py-3 flex flex-col items-center gap-1 text-center">
          <span className="text-[20px] font-bold text-t1 leading-none">{feature.metrics.totalARR}</span>
          <span className="text-[11px] text-t3 uppercase tracking-[0.04em]">ARR Impact</span>
        </div>
        <div className="bg-white border border-line rounded-lg px-[14px] py-3 flex flex-col items-center gap-1 text-center">
          <span className="text-[20px] font-bold text-t1 leading-none" style={{ color: feature.metrics.avgSentiment >= 4 ? "#4CAF50" : feature.metrics.avgSentiment >= 3 ? "#C59937" : "#D45867" }}>
            {feature.metrics.avgSentiment.toFixed(1)}
          </span>
          <span className="text-[11px] text-t3 uppercase tracking-[0.04em]">Sentiment</span>
        </div>
        <div className="bg-white border border-line rounded-lg px-[14px] py-3 flex flex-col items-center gap-1 text-center">
          <SourceBadge source={feature.metrics.topSource} />
          <span className="text-[11px] text-t3 uppercase tracking-[0.04em]">Top Source</span>
        </div>
      </div>

      {/* Top Voices */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-t2 uppercase tracking-[0.05em]">Top Customer Voices</span>
          <button className="text-[12px] text-brand bg-transparent border-none cursor-pointer p-0 hover:underline" onClick={() => onTabSwitch("insights")}>See all insights →</button>
        </div>
        <div className="flex flex-col gap-2">
          {topInsights.map((ins) => (
            <div key={ins.id} className="bg-white border border-line border-l-[3px] rounded-lg px-[14px] py-3" style={{ borderLeftColor: SENTIMENT_BORDER[ins.sentiment] }}>
              <p className="text-[13px] text-t1 leading-[1.6] m-0 mb-2.5 italic line-clamp-2">"{ins.text}"</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Avatar initials={ins.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)} color="#888" size={20} />
                <span className="text-[12px] font-medium text-t2">{ins.customer} · {ins.company}</span>
                <SourceBadge source={ins.source} />
                <span className="text-[11px] text-t3 ml-auto">{ins.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-t2 uppercase tracking-[0.05em]">Quick Actions</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="flex items-center gap-[5px] px-3 py-1.5 border border-line rounded-md bg-white text-[13px] text-t1 cursor-pointer transition-colors hover:bg-hover hover:border-line-dk" onClick={() => onTabSwitch("canvas")}>
            <DocumentFillIcon />
            Generate PRD
          </button>
          <button className="flex items-center gap-[5px] px-3 py-1.5 border border-line rounded-md bg-white text-[13px] text-t1 cursor-pointer transition-colors hover:bg-hover hover:border-line-dk" onClick={() => onTabSwitch("experiments")}>
            <FlaskIcon />
            Create Survey
          </button>
          <button className="flex items-center gap-[5px] px-3 py-1.5 border border-line rounded-md bg-white text-[13px] text-t1 cursor-pointer transition-colors hover:bg-hover hover:border-line-dk" onClick={() => onTabSwitch("discussion")}>
            <ChatFillIcon />
            Start Discussion
          </button>
          <button className="flex items-center gap-[5px] px-3 py-1.5 border border-line rounded-md bg-white text-[13px] text-t1 cursor-pointer transition-colors hover:bg-hover hover:border-line-dk">
            <ShareStarIcon />
            Share Feature
          </button>
        </div>
      </div>

      {/* Tags */}
      {feature.tags.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-semibold text-t2 uppercase tracking-[0.05em]">Tags</span>
          <div className="flex flex-wrap gap-1.5">
            {feature.tags.map((tag) => (
              <span key={tag} className="text-[12px] text-t2 bg-hover border border-line rounded-full px-2.5 py-0.5">#{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Insights Tab ─────────────────────────────────────────────────────────────

const INSIGHT_FILTERS = [
  { value: "all", label: "All" },
  { value: "feature-request", label: "Feature Request" },
  { value: "pain-point", label: "Pain Point" },
  { value: "bug", label: "Bug" },
  { value: "praise", label: "Praise" },
];

function InsightsTab({ insights }: { insights: Insight[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const filtered = insights.filter((i) => {
    const typeMatch = filter === "all" || i.type === filter;
    const srcMatch = sourceFilter === "all" || i.source === sourceFilter;
    return typeMatch && srcMatch;
  });

  const sources = Array.from(new Set(insights.map((i) => i.source)));

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
      {/* Filters */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-1 flex-wrap">
          {INSIGHT_FILTERS.map((f) => (
            <button
              key={f.value}
              className={`flex items-center gap-1 px-2.5 py-1 border rounded-full text-[12px] cursor-pointer transition-colors ${filter === f.value ? "bg-[rgba(33,112,244,0.1)] border-[rgba(33,112,244,0.3)] text-brand" : "border-line text-t2 bg-white hover:bg-hover"}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
              {f.value !== "all" && (
                <span className="bg-sel rounded-[10px] px-[5px] text-[10px] leading-[15px] text-t2">
                  {insights.filter((i) => i.type === f.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <select className="text-[12px] px-2 py-1 border border-line rounded text-t2 bg-white cursor-pointer outline-none" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
          <option value="all">All Sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>{SOURCE_CONFIG[s].label}</option>
          ))}
        </select>
      </div>

      {/* Insight cards */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 && (
          <div className="text-center py-8 px-4 text-[13px] text-t3">No insights match the selected filters.</div>
        )}
        {filtered.map((ins) => (
          <div key={ins.id} className="bg-white border border-line border-l-[3px] rounded-lg px-[14px] py-3 transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.07)]" style={{ borderLeftColor: SENTIMENT_BORDER[ins.sentiment] }}>
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <SourceBadge source={ins.source} />
              <InsightTypeBadge type={ins.type} />
              <span className="text-[11px] text-t3 ml-auto">{ins.date}</span>
            </div>
            <p className="text-[13px] text-t1 leading-[1.6] m-0 mb-2.5 italic">"{ins.text}"</p>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-[12px] text-t2">
                <Avatar initials={ins.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)} color="#888" size={20} />
                <span>{ins.customer}</span>
                <span className="text-t3">· {ins.company}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {ins.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-[11px] text-t3 bg-hover rounded px-1.5 py-px">#{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Customers Tab ────────────────────────────────────────────────────────────

function CustomersTab({ customers }: { customers: FeatureCustomer[] }) {
  const priorityColor = { high: "#D45867", medium: "#C59937", low: "#447EDF" };
  const priorityBg = { high: "rgba(212,88,103,0.1)", medium: "rgba(197,153,55,0.1)", low: "rgba(68,126,223,0.1)" };

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2.5 bg-hover rounded-lg p-[14px]">
        <div className="flex flex-col items-center gap-[3px]">
          <span className="text-[22px] font-bold text-t1 leading-none">{customers.length}</span>
          <span className="text-[11px] text-t3 uppercase tracking-[0.04em]">Companies</span>
        </div>
        <div className="flex flex-col items-center gap-[3px]">
          <span className="text-[22px] font-bold text-t1 leading-none">{customers.reduce((s, c) => s + c.mentions, 0)}</span>
          <span className="text-[11px] text-t3 uppercase tracking-[0.04em]">Total Mentions</span>
        </div>
        <div className="flex flex-col items-center gap-[3px]">
          <span className="text-[22px] font-bold text-t1 leading-none">{customers.filter((c) => c.plan === "Enterprise").length}</span>
          <span className="text-[11px] text-t3 uppercase tracking-[0.04em]">Enterprise Accounts</span>
        </div>
      </div>

      <div className="bg-white border border-line rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1.3fr_72px_84px_68px_72px] px-3 border-b border-line [&>div]:py-[9px] [&>div]:px-1.5 [&>div]:text-[12px] [&>div]:text-t2">
          <div>Company</div>
          <div>Contact</div>
          <div>ARR</div>
          <div>Plan</div>
          <div>Mentions</div>
          <div>Priority</div>
        </div>
        {customers.map((c) => (
          <div key={c.id} className="grid grid-cols-[1.4fr_1.3fr_72px_84px_68px_72px] items-center px-3 border-b border-line last:border-b-0 transition-colors hover:bg-hover [&>div]:py-2.5 [&>div]:px-1.5">
            <div className="flex items-center gap-2 text-[13px] font-medium text-t1">
              <Avatar initials={c.initials} color={c.color} size={28} />
              <span>{c.company}</span>
            </div>
            <div className="flex flex-col gap-px">
              <span className="text-[13px] text-t1">{c.contact}</span>
              <span className="text-[11px] text-t3">{c.role}</span>
            </div>
            <div className="text-[13px] font-semibold text-t1">{c.arr}</div>
            <div>
              <span className={
                c.plan.toLowerCase() === "enterprise"
                  ? "inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium bg-[rgba(33,112,244,0.1)] text-[#1456C0]"
                  : c.plan.toLowerCase() === "growth"
                  ? "inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium bg-[rgba(76,175,80,0.1)] text-[#2E7D32]"
                  : "inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium bg-[rgba(197,153,55,0.1)] text-[#9A7318]"
              }>{c.plan}</span>
            </div>
            <div className="text-[13px] text-t1 font-semibold">{c.mentions}</div>
            <div>
              <span
                className="inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium"
                style={{ background: priorityBg[c.priority], color: priorityColor[c.priority] }}
              >
                {c.priority.charAt(0).toUpperCase() + c.priority.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Discussion Tab ───────────────────────────────────────────────────────────

function DiscussionTab({ discussions, featureTitle }: { discussions: Discussion[]; featureTitle: string }) {
  const [newMsg, setNewMsg] = useState("");
  const [localThreads, setLocalThreads] = useState<Discussion[]>(discussions);

  const handlePost = () => {
    if (!newMsg.trim()) return;
    const updated = localThreads.map((thread, i) => {
      if (i === 0) {
        return {
          ...thread,
          messages: [
            ...thread.messages,
            {
              user: "You",
              initials: "YO",
              color: "#2170F4",
              text: newMsg,
              timestamp: "Just now",
            },
          ],
        };
      }
      return thread;
    });
    setLocalThreads(updated);
    setNewMsg("");
  };

  if (localThreads.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="flex flex-col items-center text-center gap-2 py-8 px-4 text-t2 text-[13px]">
          <ChatOutlineIcon width={40} height={40} stroke="#CCC" />
          <p>No discussions yet for this feature.</p>
          <p className="text-[12px] text-t3 max-w-[280px]">Start a Slack thread or paste a Teams snippet to collaborate asynchronously.</p>
        </div>
        <div className="bg-white border border-line rounded-[10px] overflow-hidden">
          <textarea
            className="w-full px-[14px] py-3 border-none text-[13px] font-[inherit] text-t1 resize-none outline-none bg-transparent leading-[1.55] placeholder:text-t3"
            placeholder={`Share a thought about "${featureTitle}"…`}
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            rows={3}
          />
          <div className="flex items-center justify-between px-[14px] py-2 border-t border-line bg-hover">
            <span className="text-[11px] text-t3">This will post to #product-feedback in Slack</span>
            <button className="px-[14px] py-[5px] bg-brand text-white border-none rounded text-[13px] font-medium cursor-pointer hover:bg-[#1a5fd4] disabled:opacity-50 disabled:cursor-not-allowed" disabled={!newMsg.trim()} onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
      {localThreads.map((thread) => (
        <div key={thread.id} className="bg-white border border-line rounded-[10px] overflow-hidden">
          <div className="flex items-center gap-2 px-[14px] py-2.5 border-b border-line bg-hover">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${thread.platform === "slack" ? "bg-[rgba(74,21,75,0.1)] text-[#4A154B]" : "bg-hover text-t2"}`}>
              {thread.platform === "slack" ? "# Slack" : "⬡ Teams"}
            </span>
            <span className="text-[12px] text-t2 font-medium">{thread.channel}</span>
            <span className="text-[11px] text-t3 ml-auto">{thread.date}</span>
          </div>
          <div className="px-[14px] py-3 flex flex-col gap-[14px]">
            {thread.messages.map((msg, idx) => (
              <div key={idx} className="flex gap-2.5 items-start">
                <Avatar initials={msg.initials} color={msg.color} size={30} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-[3px]">
                    <span className="text-[13px] font-semibold text-t1">{msg.user}</span>
                    <span className="text-[11px] text-t3">{msg.timestamp}</span>
                  </div>
                  <p className="text-[13px] text-t1 leading-[1.55] m-0">{msg.text}</p>
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {msg.reactions.map((r, ri) => (
                        <span key={ri} className="inline-flex items-center gap-[3px] bg-hover border border-line rounded-full px-2 py-0.5 text-[12px] cursor-pointer hover:bg-sel">
                          {r.emoji} {r.count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Reply box */}
      <div className="bg-white border border-line rounded-[10px] overflow-hidden">
        <textarea
          className="w-full px-[14px] py-3 border-none text-[13px] font-[inherit] text-t1 resize-none outline-none bg-transparent leading-[1.55] placeholder:text-t3"
          placeholder="Reply or add a new thread…"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          rows={3}
        />
        <div className="flex items-center justify-between px-[14px] py-2 border-t border-line bg-hover">
          <span className="text-[11px] text-t3">Posts to #product-feedback in Slack</span>
          <button className="px-[14px] py-[5px] bg-brand text-white border-none rounded text-[13px] font-medium cursor-pointer hover:bg-[#1a5fd4] disabled:opacity-50 disabled:cursor-not-allowed" disabled={!newMsg.trim()} onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Experiments Tab ──────────────────────────────────────────────────────────

function ExperimentsTab({ experiments, featureTitle }: { experiments: Experiment[]; featureTitle: string }) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<Experiment | null>(null);
  const [localExperiments, setLocalExperiments] = useState<Experiment[]>(experiments);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const newExp: Experiment = {
        id: "gen-1",
        title: `AI-Generated: "${featureTitle.slice(0, 35)}…" Validation Survey`,
        type: "survey",
        status: "draft",
        target: "All active customers",
        responses: 0,
        completionRate: 0,
        createdAt: "Today",
        questions: [
          { id: "gq1", text: "How urgent is this capability for your team on a scale of 1–5?", type: "rating" },
          { id: "gq2", text: "Which team would benefit most from this feature?", type: "multiple-choice", options: ["IT / SaaS Ops", "Finance", "Security", "Engineering", "All teams"] },
          { id: "gq3", text: "How are you currently solving this problem without this feature?", type: "text" },
          { id: "gq4", text: "Would this feature influence your renewal decision?", type: "multiple-choice", options: ["Yes, it's a must-have", "Helpful but not critical", "No impact on renewal"] },
        ],
      };
      setGenerated(newExp);
      setLocalExperiments((prev) => [newExp, ...prev]);
      setGenerating(false);
    }, 2000);
  };

  const statusColor = { draft: "#888", active: "#2170F4", completed: "#4CAF50" };
  const statusBg = { draft: "#F4F4F4", active: "rgba(33,112,244,0.1)", completed: "rgba(76,175,80,0.1)" };

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
      {/* Generate button */}
      <div className="flex items-center justify-between gap-[14px] bg-[linear-gradient(135deg,rgba(33,112,244,0.06)_0%,rgba(121,111,236,0.08)_100%)] border border-[rgba(33,112,244,0.2)] rounded-[10px] px-4 py-[14px]">
        <div>
          <p className="text-[13px] font-semibold text-t1 m-0 mb-[3px]">Generate a validation survey with AI</p>
          <p className="text-[12px] text-t2 m-0">Pulse will auto-generate relevant questions based on feedback themes and customer context.</p>
        </div>
        <button className="flex items-center gap-1.5 px-[14px] py-[7px] bg-brand text-white border-none rounded-md text-[13px] font-medium cursor-pointer whitespace-nowrap flex-shrink-0 hover:bg-[#1a5fd4] disabled:opacity-60 disabled:cursor-not-allowed" disabled={generating} onClick={handleGenerate}>
          {generating ? (
            <><span className="flex gap-[3px] items-center">
              <span className="w-[5px] h-[5px] rounded-full bg-white/70 animate-dot-bounce" />
              <span className="w-[5px] h-[5px] rounded-full bg-white/70 animate-dot-bounce" style={{ animationDelay: "0.2s" }} />
              <span className="w-[5px] h-[5px] rounded-full bg-white/70 animate-dot-bounce" style={{ animationDelay: "0.4s" }} />
            </span>Generating…</>
          ) : (
            <>
              <StarIcon fill="currentColor" width={14} height={14} />
              Generate Survey
            </>
          )}
        </button>
      </div>

      {localExperiments.length === 0 && !generating && (
        <div className="text-center py-8 px-4 text-[13px] text-t3">No experiments yet. Click "Generate Survey" to create one.</div>
      )}

      {localExperiments.map((exp) => (
        <div key={exp.id} className={`bg-white border border-line rounded-[10px] px-4 py-[14px] flex flex-col gap-3${exp.id === generated?.id ? " border-[rgba(33,112,244,0.4)] animate-card-appear" : ""}`}>
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2 flex-1">
              <span className="text-[13px] font-semibold text-t1 leading-[1.4]">{exp.title}</span>
              <span className="text-[11px] text-t3 bg-hover border border-line rounded px-[7px] py-px whitespace-nowrap flex-shrink-0">{exp.type === "survey" ? "Survey" : "A/B Test"}</span>
            </div>
            <span
              className="text-[11px] font-medium px-[7px] py-0.5 rounded whitespace-nowrap"
              style={{ background: statusBg[exp.status], color: statusColor[exp.status] }}
            >
              {exp.status.charAt(0).toUpperCase() + exp.status.slice(1)}
            </span>
          </div>

          <div className="flex gap-3 flex-wrap text-[12px] text-t2">
            <span>Target: {exp.target}</span>
            <span>Created: {exp.createdAt}</span>
            {exp.responses != null && exp.responses > 0 && (
              <span>{exp.responses} responses · {exp.completionRate}% completion</span>
            )}
          </div>

          {exp.questions.length > 0 && (
            <div className="flex flex-col gap-2.5 bg-grey-bg rounded-lg px-3 py-2.5">
              {exp.questions.map((q, qi) => (
                <div key={q.id} className="flex gap-2.5 items-start">
                  <span className="text-[11px] font-bold text-brand bg-[rgba(33,112,244,0.1)] rounded px-[6px] py-px flex-shrink-0 mt-px">Q{qi + 1}</span>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <p className="text-[13px] text-t1 m-0 leading-[1.45]">{q.text}</p>
                    {q.type === "multiple-choice" && q.options && (
                      <div className="flex flex-wrap gap-1">
                        {q.options.map((opt) => (
                          <span key={opt} className="text-[11px] px-2 py-0.5 border border-line rounded text-t2 bg-white">{opt}</span>
                        ))}
                      </div>
                    )}
                    {q.type === "rating" && (
                      <div className="flex gap-[5px]">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className="w-6 h-6 rounded-full border border-line bg-white text-[11px] flex items-center justify-center text-t2">{n}</span>
                        ))}
                      </div>
                    )}
                    {q.type === "text" && <div className="text-[12px] text-t3 italic">Free text response</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            {exp.status === "draft" && (
              <>
                <button className="px-3 py-[5px] bg-brand text-white border-brand rounded text-[12px] cursor-pointer hover:bg-[#1a5fd4]">Launch Survey</button>
                <button className="px-3 py-[5px] border border-line rounded bg-white text-[12px] text-t1 cursor-pointer hover:bg-hover">Edit Questions</button>
              </>
            )}
            {exp.status === "active" && (
              <>
                <button className="px-3 py-[5px] border border-line rounded bg-white text-[12px] text-t1 cursor-pointer hover:bg-hover">View Responses</button>
                <button className="px-3 py-[5px] border border-line rounded bg-white text-[12px] text-t1 cursor-pointer hover:bg-hover">Share Link</button>
              </>
            )}
            {exp.status === "completed" && (
              <button className="px-3 py-[5px] border border-line rounded bg-white text-[12px] text-t1 cursor-pointer hover:bg-hover">View Results Report</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Canvas Tab ───────────────────────────────────────────────────────────────

function CanvasTab({ content }: { content: string }) {
  const [text, setText] = useState(content);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line flex-shrink-0">
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-t2">
          <DocumentOutlineIcon />
          Notes & Docs
        </span>
        <div className="flex items-center gap-2">
          {saved && <span className="text-[12px] text-[#4CAF50] font-medium">Saved</span>}
          <button className="px-2.5 py-1 text-[12px] rounded border border-line bg-white text-t1 cursor-pointer hover:bg-hover" onClick={handleSave}>Save</button>
          <button className="px-2.5 py-1 text-[12px] rounded border border-line bg-white text-t1 cursor-pointer hover:bg-hover">Export as PDF</button>
        </div>
      </div>
      <textarea
        className="flex-1 p-5 text-[13px] font-mono text-t1 leading-[1.8] border-none outline-none resize-none bg-[#FAFFFE] overflow-y-auto"
        value={text}
        onChange={handleChange}
        placeholder="Start typing your notes, PRD, or research here…"
        spellCheck={false}
      />
      <div className="px-4 py-1.5 text-[11px] text-t3 border-t border-line bg-hover flex-shrink-0">
        Markdown supported · {text.split("\n").length} lines · {text.length} characters
      </div>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────

const NOTIF_ICONS: Record<string, React.ReactNode> = {
  "status-change": <NotifStatusIcon />,
  comment: <NotifCommentIcon />,
  insight: <NotifInsightIcon />,
  assignment: <NotifAssignmentIcon />,
  mention: <NotifMentionIcon />,
  experiment: <NotifExperimentIcon />,
};

function NotificationsTab({ notifications }: { notifications: ActivityItem[] }) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
      {unread > 0 && (
        <div className="bg-[rgba(33,112,244,0.08)] border border-[rgba(33,112,244,0.2)] rounded-md px-[14px] py-2 text-[13px] text-brand font-medium">
          {unread} unread {unread === 1 ? "update" : "updates"}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        {notifications.map((n) => (
          <div key={n.id} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors hover:bg-hover relative${!n.read ? " bg-[rgba(33,112,244,0.04)]" : ""}`}>
            <div className="w-7 h-7 rounded-full bg-hover flex items-center justify-center flex-shrink-0">{NOTIF_ICONS[n.type]}</div>
            <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
              <div className="flex items-center gap-1.5 flex-wrap text-[13px] leading-[1.45]">
                <Avatar initials={n.initials} color={n.color} size={22} />
                <span className="font-semibold text-t1">{n.user}</span>
                <span className="text-t2">{n.text}</span>
              </div>
              <span className="text-[11px] text-t3">{n.timestamp}</span>
            </div>
            {!n.read && <div className="w-[7px] h-[7px] rounded-full bg-brand flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Copilot Drawer ───────────────────────────────────────────────────────────

interface CopilotMessage {
  id: string;
  role: "user" | "ai";
  text: string;
}

const COPILOT_SUGGESTIONS = [
  "Summarise key themes from feedback",
  "Draft a one-pager PRD for this feature",
  "Find similar features from other customers",
  "Search web for competitive benchmarks",
  "Generate follow-up questions for top customers",
];

const COPILOT_RESPONSES: Record<string, string> = {
  "Summarise key themes from feedback":
    "Based on 8 insights analysed, the top themes are:\n\n1. **Compliance/Audit (63%)** — Customers need structured evidence for SOC 2, ISO 27001, and GDPR audits.\n2. **Scheduled export (42%)** — Recurring reports sent to security/legal teams are a recurring ask.\n3. **Granular filtering (35%)** — Filter by department, data type, and date range is critical for making reports actionable.\n\nTop customer: Tango (3 escalations, $200K ARR, compliance deadline in Q2).",
  "Draft a one-pager PRD for this feature":
    "**Feature: Custom Data Shared Report**\n\n**Problem**: Enterprise customers can't efficiently generate compliance evidence for SOC 2 / ISO 27001 audits. Manual data compilation takes 2+ days per audit cycle.\n\n**Solution**: A dedicated report builder that surfaces which apps access which data fields, filterable by department, data type, and time range — with one-click CSV/PDF export.\n\n**Success metrics**: ≥80% of Enterprise customers use the report within 3 months; reduce audit prep time by 70%.\n\n**Phase 1 scope**: One-time CSV export with date range + app filters. Estimated: 1 sprint.",
  "Find similar features from other customers":
    "Found 3 related feature requests across your roadmap:\n\n• **Time tracking for app usage** (ID #4) — also driven by audit/reporting needs from Just Eat.\n• **Usage-based insights** (ID #3) — Tango also mentioned compliance gaps for non-seat apps.\n• **Employee app visibility** (ID #5, Shipped) — compliance theme reappears: employees need to know which apps are 'approved'.\n\nCommon thread: enterprise compliance is a high-value, recurring theme across 4 features.",
  "Search web for competitive benchmarks":
    "**Competitive landscape for SaaS compliance reporting:**\n\n• **BetterCloud**: Basic audit log, no custom report builder. No scheduling.\n• **Torii**: Current-state data only. No historical snapshots.\n• **Productiv**: Has a 'SaaS Audit' export but limited filtering.\n\n**Opportunity**: None of the key competitors offer a compliance-ready, scheduled report builder with per-field data sharing breakdowns. This is a clear differentiation opportunity.",
  "Generate follow-up questions for top customers":
    "Suggested follow-up questions for Tango (Sarah Kim):\n\n1. What specific compliance frameworks are you targeting? (SOC 2 Type II, ISO 27001, GDPR?)\n2. Who receives the report — CISO, Legal, or external auditor?\n3. How often do you need to run this? (Ad-hoc, monthly, quarterly?)\n4. What's the current workaround and how many hours does it take?\n5. Would a manual CSV export meet the Q2 deadline, or do you need a full report builder?\n\nThese questions will help scope the MVP and validate phase 1 vs. phase 2 prioritisation.",
};

function CopilotDrawer({ feature, onClose }: { feature: Feature; onClose: () => void }) {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "intro",
      role: "ai",
      text: `Hi! I'm your Pulse Copilot. I have context on **${feature.title.slice(0, 50)}${feature.title.length > 50 ? "…" : ""}** — including ${feature.insights.length} insights, ${feature.customers.length} customers, and ${feature.metrics.totalARR} ARR impact. What would you like to explore?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: CopilotMessage = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText =
        COPILOT_RESPONSES[text] ||
        `I've analysed **${feature.title.slice(0, 40)}…** and related feedback. Based on ${feature.insights.length} insights from customers like ${feature.customers[0]?.company || "your top accounts"}, here's what I found:\n\nThe key theme is **${feature.tags[0] || "product improvement"}** — with ${feature.metrics.totalRequests} requests totalling ${feature.metrics.totalARR} ARR impact. I'd recommend prioritising the top 3 customer requests from ${feature.customers.slice(0, 2).map((c) => c.company).join(" and ")}.`;

      const aiMsg: CopilotMessage = { id: (Date.now() + 1).toString(), role: "ai", text: responseText };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .split("\n")
      .map((line, i) => {
        const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        if (line.startsWith("• ")) {
          return <li key={i} className="ml-4 mb-[3px]" dangerouslySetInnerHTML={{ __html: bold.slice(2) }} />;
        }
        if (!line.trim()) return <br key={i} />;
        return <p key={i} className="m-0 mb-1" dangerouslySetInnerHTML={{ __html: bold }} />;
      });
  };

  return (
    <div className="flex-shrink-0 h-[340px] border-t border-[rgba(33,112,244,0.2)] bg-white flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-[14px] py-2.5 border-b border-line bg-[linear-gradient(135deg,rgba(33,112,244,0.05)_0%,rgba(121,111,236,0.07)_100%)] flex-shrink-0">
        <div className="flex items-center gap-1.5 text-[13px] font-semibold bg-[linear-gradient(135deg,#2170F4,#796FEC)] bg-clip-text text-transparent">
          <AIStarGradientIcon gradientId="cp-star" />
          Pulse Copilot
        </div>
        <button className="w-6 h-6 border-none bg-transparent rounded cursor-pointer flex items-center justify-center p-0 hover:bg-hover text-[#888]" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-[14px] py-3 flex flex-col gap-2.5 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 items-start${msg.role === "user" ? " flex-row-reverse" : ""}`}>
            {msg.role === "ai" && (
              <div className="w-[22px] h-[22px] rounded-full bg-[linear-gradient(135deg,#2170F4,#796FEC)] flex items-center justify-center flex-shrink-0">
                <StarIcon fill="white" width={12} height={12} />
              </div>
            )}
            <div className={`max-w-[85%] px-3 py-2 rounded-[10px] text-[12.5px] leading-[1.6]${msg.role === "ai" ? " bg-hover text-t1 rounded-tl-none" : " bg-brand text-white rounded-tr-none"}`}>
              {msg.role === "ai" ? (
                <div>{renderMarkdown(msg.text)}</div>
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-start">
            <div className="w-[22px] h-[22px] rounded-full bg-[linear-gradient(135deg,#2170F4,#796FEC)] flex items-center justify-center flex-shrink-0">
              <StarIcon fill="white" width={12} height={12} />
            </div>
            <div className="max-w-[85%] px-3 py-2 rounded-[10px] text-[12.5px] leading-[1.6] bg-hover text-t1 rounded-tl-none flex gap-1 items-center min-w-[50px] h-[26px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#888] animate-dot-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#888] animate-dot-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#888] animate-dot-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-[14px] py-2 flex flex-wrap gap-1.5 border-t border-line flex-shrink-0">
          {COPILOT_SUGGESTIONS.map((s) => (
            <button key={s} className="text-[11.5px] px-2.5 py-[5px] border border-[rgba(33,112,244,0.3)] rounded-full bg-[rgba(33,112,244,0.05)] text-brand cursor-pointer whitespace-nowrap hover:bg-[rgba(33,112,244,0.1)]" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 px-3 py-2 border-t border-line items-end flex-shrink-0">
        <textarea
          className="flex-1 text-[12.5px] font-[inherit] px-3 py-[7px] border border-line rounded-lg resize-none outline-none leading-[1.5] text-t1 bg-grey-bg transition-colors focus:border-[rgba(33,112,244,0.4)] placeholder:text-t3"
          placeholder="Ask about this feature…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
        />
        <button
          className="w-8 h-8 rounded-lg bg-brand text-white border-none cursor-pointer flex items-center justify-center flex-shrink-0 hover:bg-[#1a5fd4] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!input.trim() || isTyping}
          onClick={() => sendMessage(input)}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────────

interface FeatureDetailPanelProps {
  feature: Feature;
  onClose: () => void;
}

export default function FeatureDetailPanel({ feature, onClose }: FeatureDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [copilotOpen, setCopilotOpen] = useState(false);

  const unreadCount = feature.notifications.filter((n) => !n.read).length;

  const tabCountBadge = (tab: TabId): number | null => {
    if (tab === "insights") return feature.insights.length;
    if (tab === "customers") return feature.customers.length;
    if (tab === "notifications") return unreadCount || null;
    return null;
  };

  const statusLabel = { done: "Done", "in-progress": "In Progress", backlog: "Backlog" }[feature.status];
  const priorityColor = { high: "#D45867", medium: "#C59937", low: "#447EDF" }[feature.priority];
  const priorityBg = { high: "rgba(212,88,103,0.1)", medium: "rgba(197,153,55,0.1)", low: "rgba(68,126,223,0.1)" }[feature.priority];

  const STATUS_PILL_CLASSES: Record<string, string> = {
    done: "inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium bg-[rgba(68,126,223,0.1)] text-[#447EDF]",
    "in-progress": "inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium bg-[rgba(197,153,55,0.1)] text-[#C59937]",
    backlog: "inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium bg-[rgba(212,126,95,0.1)] text-[#D47E5F]",
  };

  return (
    <div className="w-[590px] min-w-[590px] max-w-[590px] bg-white border-l border-line flex flex-col h-screen sticky top-0 overflow-hidden animate-slide-in">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-line bg-white">
        <div className="flex items-start justify-between pt-[14px] px-4 pb-2 gap-2.5">
          <div className="flex items-start gap-2 flex-1 min-w-0 [&>svg]:flex-shrink-0 [&>svg]:mt-[3px]">
            <StatusIcon status={feature.status} />
            <h2 className="text-[14px] font-semibold text-t1 m-0 leading-[1.45] line-clamp-2">{feature.title}</h2>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="w-7 h-7 border-none bg-transparent rounded cursor-pointer flex items-center justify-center text-t2 p-0 hover:bg-hover" title="More options">
              <DotsVerticalIcon />
            </button>
            <button className="w-7 h-7 border-none bg-transparent rounded cursor-pointer flex items-center justify-center text-t2 p-0 hover:bg-hover" onClick={onClose} title="Close panel">
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 pb-2.5 flex-wrap">
          <span className={STATUS_PILL_CLASSES[feature.status]}>{statusLabel}</span>
          <span className="inline-flex px-[7px] py-0.5 rounded text-[11px] font-medium" style={{ background: priorityBg, color: priorityColor }}>
            {feature.priority.charAt(0).toUpperCase() + feature.priority.slice(1)}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-t2">
            <ArrMetricIcon />
            {feature.arr}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-t2">
            <Avatar initials={feature.assigneeInitials} color={feature.assigneeColor} size={16} />
            {feature.assignee}
          </span>
          <span className="text-[12px] text-t2 bg-hover px-[7px] py-px rounded border border-line">{feature.category}</span>
        </div>

        {/* Tabs */}
        <div className="flex px-2.5 gap-0.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => {
            const count = tabCountBadge(tab.id);
            return (
              <button
                key={tab.id}
                className={`flex items-center gap-[5px] px-[10px] py-2 pb-[10px] text-[13px] bg-transparent border-none border-b-2 cursor-pointer whitespace-nowrap transition-colors ${activeTab === tab.id ? "text-brand border-b-brand font-medium" : "text-t2 border-b-transparent hover:text-t1"}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {count != null && (
                  <span className={tab.id === "notifications" ? "bg-[rgba(212,88,103,0.15)] text-[#8C2233] text-[11px] px-[5px] rounded-[10px] min-w-[18px] text-center leading-4 inline-block" : "bg-sel text-t2 text-[11px] px-[5px] rounded-[10px] min-w-[18px] text-center leading-4 inline-block"}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className={`flex-1 overflow-hidden flex flex-col${copilotOpen ? " max-h-[calc(100%-389px)]" : ""}`}>
        {activeTab === "overview" && <OverviewTab feature={feature} onTabSwitch={(t) => setActiveTab(t)} />}
        {activeTab === "insights" && <InsightsTab insights={feature.insights} />}
        {activeTab === "customers" && <CustomersTab customers={feature.customers} />}
        {activeTab === "discussion" && <DiscussionTab discussions={feature.discussions} featureTitle={feature.title} />}
        {activeTab === "experiments" && <ExperimentsTab experiments={feature.experiments} featureTitle={feature.title} />}
        {activeTab === "canvas" && <CanvasTab content={feature.canvas} />}
        {activeTab === "notifications" && <NotificationsTab notifications={feature.notifications} />}
      </div>

      {/* Copilot */}
      {copilotOpen ? (
        <CopilotDrawer feature={feature} onClose={() => setCopilotOpen(false)} />
      ) : (
        <div className="flex-shrink-0 px-4 py-3 border-t border-line bg-white">
          <button className="flex items-center gap-[7px] px-4 py-2 bg-[linear-gradient(135deg,#2170F4_0%,#796FEC_100%)] text-white border-none rounded-lg text-[13px] font-medium cursor-pointer w-full justify-center shadow-[0_2px_12px_rgba(33,112,244,0.25)] hover:opacity-90" onClick={() => setCopilotOpen(true)}>
            <StarIcon fill="white" width={16} height={16} />
            Copilot
          </button>
        </div>
      )}
    </div>
  );
}
