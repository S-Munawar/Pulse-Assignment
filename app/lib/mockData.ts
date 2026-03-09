// ─── Types ────────────────────────────────────────────────────────────────────

export type StatusType = "done" | "in-progress" | "backlog";
export type PriorityType = "high" | "medium" | "low";
export type InsightType = "feature-request" | "bug" | "pain-point" | "praise";
export type SentimentType = "positive" | "negative" | "neutral";
export type SourceType = "zendesk" | "slack" | "gong" | "freshdesk" | "fireflies" | "hubspot";
export type PlanType = "Enterprise" | "Growth" | "Starter";

export interface Insight {
  id: string;
  text: string;
  source: SourceType;
  type: InsightType;
  customer: string;
  company: string;
  date: string;
  sentiment: SentimentType;
  tags: string[];
}

export interface FeatureCustomer {
  id: string;
  company: string;
  contact: string;
  role: string;
  arr: string;
  plan: PlanType;
  mentions: number;
  priority: PriorityType;
  initials: string;
  color: string;
}

export interface DiscussionMessage {
  user: string;
  initials: string;
  color: string;
  text: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
}

export interface Discussion {
  id: string;
  platform: "slack" | "teams";
  channel: string;
  date: string;
  messages: DiscussionMessage[];
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: "rating" | "multiple-choice" | "text";
  options?: string[];
}

export interface Experiment {
  id: string;
  title: string;
  type: "survey" | "ab-test";
  status: "draft" | "active" | "completed";
  target: string;
  responses?: number;
  completionRate?: number;
  questions: SurveyQuestion[];
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: "status-change" | "comment" | "insight" | "assignment" | "mention" | "experiment";
  user: string;
  initials: string;
  color: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  status: StatusType;
  priority: PriorityType;
  arr: string;
  customer: string;
  assignee: string;
  assigneeInitials: string;
  assigneeColor: string;
  category: string;
  tags: string[];
  aiSummary: string;
  metrics: {
    totalRequests: number;
    totalARR: string;
    avgSentiment: number;
    topSource: SourceType;
  };
  insights: Insight[];
  customers: FeatureCustomer[];
  discussions: Discussion[];
  experiments: Experiment[];
  canvas: string;
  notifications: ActivityItem[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const features: Feature[] = [
  {
    id: 1,
    title: "Custom 'Data Shared' report for managed apps",
    description:
      "Enterprise customers need a dedicated report showing exactly which data fields are being shared with each managed application — both for internal auditing and external compliance requirements.",
    status: "in-progress",
    priority: "high",
    arr: "$200K",
    customer: "Tango",
    assignee: "Vatsal Singhal",
    assigneeInitials: "VS",
    assigneeColor: "#7BA7DF",
    category: "Reporting",
    tags: ["compliance", "data-privacy", "reporting", "enterprise"],
    aiSummary:
      "8 enterprise customers representing $380K ARR have explicitly requested a custom 'Data Shared' compliance report. The primary driver is regulatory compliance (GDPR, SOC 2) — customers need to audit what data each managed app is reading or writing. A secondary theme is executive reporting: IT leaders want a scheduled PDF/CSV export they can share with their legal and security teams quarterly. Tango alone has escalated this request 3 times in the past 6 months.",
    metrics: {
      totalRequests: 8,
      totalARR: "$380K",
      avgSentiment: 3.8,
      topSource: "gong",
    },
    insights: [
      {
        id: "i1-1",
        text: "We need a way to run a quarterly report showing every app that touches our customer PII. Our legal team is asking for it and currently we have to do this manually in spreadsheets.",
        source: "gong",
        type: "feature-request",
        customer: "Sarah Kim",
        company: "Tango",
        date: "Feb 28, 2025",
        sentiment: "negative",
        tags: ["compliance", "pii", "reporting"],
      },
      {
        id: "i1-2",
        text: "The Data Shared view in the managed apps section only shows current state — we need historical snapshots for our SOC 2 audit. This is blocking our renewal conversation.",
        source: "zendesk",
        type: "pain-point",
        customer: "Marcus Webb",
        company: "Tango",
        date: "Feb 14, 2025",
        sentiment: "negative",
        tags: ["soc2", "audit", "history"],
      },
      {
        id: "i1-3",
        text: "Loving the platform overall! One thing that would make it perfect is a scheduled export of the data sharing report — we'd send it to our CISO every month automatically.",
        source: "freshdesk",
        type: "feature-request",
        customer: "Priya Mehta",
        company: "Freshworks",
        date: "Jan 30, 2025",
        sentiment: "positive",
        tags: ["scheduled-export", "ciso", "automation"],
      },
      {
        id: "i1-4",
        text: "We had an audit last quarter and had to manually compile data sharing info from 3 different screens. A single consolidated report would have saved us 2 days of work.",
        source: "gong",
        type: "pain-point",
        customer: "Tom Bradley",
        company: "Stripe",
        date: "Jan 22, 2025",
        sentiment: "negative",
        tags: ["audit", "efficiency", "consolidation"],
      },
      {
        id: "i1-5",
        text: "Can you add filters to the data report — by department, app category, and data type? Right now the report scope is too broad to be actionable for our security team.",
        source: "slack",
        type: "feature-request",
        customer: "Rachel Torres",
        company: "Notion",
        date: "Jan 10, 2025",
        sentiment: "neutral",
        tags: ["filters", "security", "granularity"],
      },
      {
        id: "i1-6",
        text: "The existing export is missing the 'last data access' timestamp — this is crucial for us to demonstrate compliance to enterprise clients.",
        source: "zendesk",
        type: "bug",
        customer: "James Liu",
        company: "Intercom",
        date: "Dec 18, 2024",
        sentiment: "negative",
        tags: ["timestamp", "export", "bug"],
      },
      {
        id: "i1-7",
        text: "Just want to say the overview dashboard is great — the data sharing section is a step in the right direction. A dedicated report page would be the cherry on top.",
        source: "hubspot",
        type: "praise",
        customer: "Anna Chen",
        company: "Atlassian",
        date: "Dec 5, 2024",
        sentiment: "positive",
        tags: ["praise", "reporting"],
      },
      {
        id: "i1-8",
        text: "We're about to go through a ISO 27001 certification process. Having a structured data sharing report with app-level breakdowns would significantly accelerate our evidence collection.",
        source: "fireflies",
        type: "feature-request",
        customer: "David Park",
        company: "Rippling",
        date: "Nov 28, 2024",
        sentiment: "neutral",
        tags: ["iso27001", "certification", "evidence"],
      },
    ],
    customers: [
      { id: "c1-1", company: "Tango", contact: "Sarah Kim", role: "IT Director", arr: "$200K", plan: "Enterprise", mentions: 3, priority: "high", initials: "TG", color: "#2170F4" },
      { id: "c1-2", company: "Freshworks", contact: "Priya Mehta", role: "Security Lead", arr: "$80K", plan: "Enterprise", mentions: 2, priority: "high", initials: "FW", color: "#4CAF50" },
      { id: "c1-3", company: "Stripe", contact: "Tom Bradley", role: "Compliance Manager", arr: "$50K", plan: "Growth", mentions: 1, priority: "medium", initials: "ST", color: "#9C27B0" },
      { id: "c1-4", company: "Notion", contact: "Rachel Torres", role: "CISO", arr: "$30K", plan: "Growth", mentions: 1, priority: "medium", initials: "NO", color: "#C59937" },
      { id: "c1-5", company: "Rippling", contact: "David Park", role: "Head of IT", arr: "$20K", plan: "Starter", mentions: 1, priority: "low", initials: "RP", color: "#DD5263" },
    ],
    discussions: [
      {
        id: "d1-1",
        platform: "slack",
        channel: "#product-feedback",
        date: "Mar 3, 2025",
        messages: [
          { user: "Vatsal Singhal", initials: "VS", color: "#2170F4", text: "Hey team — Tango escalated the Data Shared report request again today. They're about to go through a SOC 2 renewal. Should we bump this up to P0 for Q2?", timestamp: "10:14 AM" },
          { user: "Ishan Jaiswal", initials: "IJ", color: "#9C27B0", text: "I've been hearing the same from Freshworks. I think a scheduled report builder would solve 80% of requests. What's the lift on that?", timestamp: "10:22 AM", reactions: [{ emoji: "👍", count: 3 }] },
          { user: "Sajal Kumar", initials: "SK", color: "#4CAF50", text: "Engineering estimates ~3 sprints for a full report builder. But we could ship a basic CSV export in 1 sprint as a stopgap. Thoughts?", timestamp: "10:35 AM" },
          { user: "Vatsal Singhal", initials: "VS", color: "#2170F4", text: "Let's do the CSV export first to unblock the Tango renewal, then iterate into a full report builder. I'll write up the spec today.", timestamp: "10:41 AM", reactions: [{ emoji: "✅", count: 4 }, { emoji: "🚀", count: 2 }] },
        ],
      },
      {
        id: "d1-2",
        platform: "slack",
        channel: "#design-review",
        date: "Feb 20, 2025",
        messages: [
          { user: "Design", initials: "DE", color: "#DD5263", text: "Sharing some early wireframes for the Data Shared report page. Key decisions: (1) Column picker for report customization, (2) Date range filter, (3) Export to CSV/PDF", timestamp: "2:05 PM" },
          { user: "Sajal Kumar", initials: "SK", color: "#4CAF50", text: "Love it! One question — should we support scheduling (e.g., send to email weekly)? Multiple customers asked for this.", timestamp: "2:18 PM", reactions: [{ emoji: "💡", count: 2 }] },
          { user: "Design", initials: "DE", color: "#DD5263", text: "Yes, adding a 'Schedule Report' option in v2. Will keep v1 focused on one-time export to meet the compliance deadline.", timestamp: "2:24 PM" },
        ],
      },
    ],
    experiments: [
      {
        id: "e1-1",
        title: "Data Shared Report — Feature Validation Survey",
        type: "survey",
        status: "active",
        target: "Enterprise customers (50+ seats)",
        responses: 14,
        completionRate: 78,
        createdAt: "Feb 15, 2025",
        questions: [
          { id: "q1", text: "How often do you need to generate a data-sharing compliance report?", type: "multiple-choice", options: ["Weekly", "Monthly", "Quarterly", "Only for audits"] },
          { id: "q2", text: "Which export format do you prefer?", type: "multiple-choice", options: ["CSV", "PDF", "Both", "Excel"] },
          { id: "q3", text: "How important is it to schedule automatic report delivery?", type: "rating" },
          { id: "q4", text: "What additional filters would make this report most useful for your team?", type: "text" },
        ],
      },
    ],
    canvas:
      "# Data Shared Report — Feature Notes\n\n## Problem Statement\nEnterprise customers need to demonstrate compliance during audits. Currently they have to manually compile data sharing information from multiple screens — a process that takes hours.\n\n## Key Jobs to be Done\n- Compliance Manager: Generate evidence for SOC 2 / ISO 27001 audits without manual work\n- CISO: Get a monthly snapshot of what apps touch which data categories\n- IT Director: Quickly answer 'what apps can read our HR data?'\n\n## Proposed Solution\n**Phase 1** (Q2): One-time CSV export with filters (app, department, data type, date range)\n**Phase 2** (Q3): Scheduled report builder with email delivery\n\n## Open Questions\n- [ ] Should we include historical data snapshots or only current state?\n- [ ] Minimum granularity: per-app or per-permission?\n- [ ] Who in an org should have access to this report?\n\n## Competitive Notes\n- BetterCloud: Has a basic audit log but no report builder\n- Torii: Only shows current state, no scheduling\n- Our differentiation: Compliance-ready report with historical context",
    notifications: [
      { id: "n1-1", type: "status-change", user: "Vatsal Singhal", initials: "VS", color: "#2170F4", text: "moved this feature from Backlog → In Progress", timestamp: "2 days ago", read: false },
      { id: "n1-2", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "3 new insights linked from Gong calls — Tango mentioned compliance deadline", timestamp: "3 days ago", read: false },
      { id: "n1-3", type: "comment", user: "Ishan Jaiswal", initials: "IJ", color: "#9C27B0", text: "left a comment: 'Engineering scoped this at 3 sprints. Let's discuss prioritization in next sprint planning.'", timestamp: "5 days ago", read: true },
      { id: "n1-4", type: "experiment", user: "Sajal Kumar", initials: "SK", color: "#4CAF50", text: "launched a validation survey — 14 responses so far (78% completion rate)", timestamp: "3 weeks ago", read: true },
      { id: "n1-5", type: "assignment", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "auto-linked this feature to 2 new feature requests from Freshworks and Stripe", timestamp: "1 month ago", read: true },
    ],
  },
  {
    id: 2,
    title: "Enhancement request for direct view of licensed users count by instance on application overview page",
    description:
      "PMs and IT admins want to see licensed user counts per application instance directly on the app overview page, without having to drill into each instance separately.",
    status: "in-progress",
    priority: "high",
    arr: "$200K",
    customer: "Tango",
    assignee: "Vatsal Singhal",
    assigneeInitials: "VS",
    assigneeColor: "#7BA7DF",
    category: "UI/UX",
    tags: ["ui", "overview", "licensing", "instance"],
    aiSummary:
      "4 customers have flagged that the application overview page is missing per-instance licensed user counts. This creates unnecessary navigation friction — users must click into each instance to find a number they expect to see at a glance. The request is nearly identical across Tango (largest ARR), Asana, and HubSpot accounts. Most customers want this as an inline column in the app list, sortable by count.",
    metrics: {
      totalRequests: 4,
      totalARR: "$310K",
      avgSentiment: 3.5,
      topSource: "zendesk",
    },
    insights: [
      { id: "i2-1", text: "Every time I want to see how many users are licensed per instance, I have to click in and click back. Please put the count on the overview page.", source: "zendesk", type: "pain-point", customer: "Sarah Kim", company: "Tango", date: "Mar 1, 2025", sentiment: "negative", tags: ["navigation", "ux"] },
      { id: "i2-2", text: "Would love a summary column on the app list showing total vs. licensed users at a glance. This would save my team 10 minutes every Monday during our review meeting.", source: "gong", type: "feature-request", customer: "Leila Nouri", company: "Asana", date: "Feb 18, 2025", sentiment: "positive", tags: ["column", "summary", "weekly-review"] },
      { id: "i2-3", text: "We manage 5 Salesforce instances. If I could see the licensed count for each in one row, our license optimization reviews would be so much faster.", source: "freshdesk", type: "feature-request", customer: "Chris Yates", company: "HubSpot", date: "Feb 5, 2025", sentiment: "neutral", tags: ["multi-instance", "optimization"] },
      { id: "i2-4", text: "The current approach requires 3 clicks to get a number. That's not a dashboard, that's a navigation maze.", source: "slack", type: "pain-point", customer: "Nina Patel", company: "Intercom", date: "Jan 29, 2025", sentiment: "negative", tags: ["navigation", "frustration"] },
    ],
    customers: [
      { id: "c2-1", company: "Tango", contact: "Sarah Kim", role: "IT Director", arr: "$200K", plan: "Enterprise", mentions: 2, priority: "high", initials: "TG", color: "#2170F4" },
      { id: "c2-2", company: "Asana", contact: "Leila Nouri", role: "IT Manager", arr: "$60K", plan: "Growth", mentions: 2, priority: "high", initials: "AS", color: "#DD5263" },
      { id: "c2-3", company: "HubSpot", contact: "Chris Yates", role: "SaaS Ops Lead", arr: "$30K", plan: "Growth", mentions: 1, priority: "medium", initials: "HS", color: "#C59937" },
      { id: "c2-4", company: "Intercom", contact: "Nina Patel", role: "IT Admin", arr: "$20K", plan: "Starter", mentions: 1, priority: "low", initials: "IC", color: "#4CAF50" },
    ],
    discussions: [
      {
        id: "d2-1",
        platform: "slack",
        channel: "#product",
        date: "Feb 22, 2025",
        messages: [
          { user: "Vatsal Singhal", initials: "VS", color: "#2170F4", text: "For the licensed users count view — do we want to add it as a column to the existing table, or as a hover tooltip? Looking for a quick design decision.", timestamp: "11:00 AM" },
          { user: "Design", initials: "DE", color: "#DD5263", text: "Column makes more sense for the power user workflow. Tooltip can be a nice-to-have. I'd also add a small sparkline for trend.", timestamp: "11:15 AM", reactions: [{ emoji: "💯", count: 3 }] },
          { user: "Ishan Jaiswal", initials: "IJ", color: "#9C27B0", text: "Can we make it sortable? Customers want to sort by under-utilised instances first — that's the FYI moment.", timestamp: "11:28 AM", reactions: [{ emoji: "👍", count: 5 }] },
        ],
      },
    ],
    experiments: [],
    canvas: "# Licensed Users Count — Design Notes\n\n## Quick Win Scope\n- Add 'Licensed Users' column to app overview table\n- Sortable ascending/descending\n- Show as `n / total` format (e.g. 47 / 120)\n\n## Nice-to-haves (v2)\n- Colour indicator (red if >90% utilised, yellow if <50%)\n- Sparkline trend for last 30 days\n- Hover tooltip with per-instance breakdown for multi-instance apps",
    notifications: [
      { id: "n2-1", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "2 new insights added from Zendesk tickets — both from Tango", timestamp: "1 day ago", read: false },
      { id: "n2-2", type: "comment", user: "Design", initials: "DE", color: "#DD5263", text: "shared wireframes for the licensed users column", timestamp: "4 days ago", read: true },
    ],
  },
  {
    id: 3,
    title: "Capability to track and provide insights for usage-based application models",
    description:
      "As more SaaS tools adopt usage-based or consumption pricing (e.g., API calls, storage, seats-used), customers need Pulse to track and surface insights specific to these pricing models — not just seat-based licenses.",
    status: "backlog",
    priority: "medium",
    arr: "$200K",
    customer: "Tango",
    assignee: "Ishan Jaiswal",
    assigneeInitials: "IJ",
    assigneeColor: "#9B8EC4",
    category: "Analytics",
    tags: ["usage-based", "pricing", "analytics", "consumption"],
    aiSummary:
      "5 customers have raised that Pulse's analytics are built for seat-based SaaS but break down for usage-based tools like AWS, Snowflake, or Twilio. The gap is significant: customers are flying blind on consumption costs and can't get optimization recommendations. Tango is the loudest voice, driven by a recent Snowflake bill that surprised them. This is a strategic differentiator as more vendors shift to usage-based pricing.",
    metrics: {
      totalRequests: 5,
      totalARR: "$255K",
      avgSentiment: 3.2,
      topSource: "fireflies",
    },
    insights: [
      { id: "i3-1", text: "We got hit with a $40K Snowflake overage last quarter. Pulse showed Snowflake as a normal SaaS tool but had no insight on our credit burn rate. We need consumption tracking urgently.", source: "fireflies", type: "pain-point", customer: "Sarah Kim", company: "Tango", date: "Feb 20, 2025", sentiment: "negative", tags: ["snowflake", "consumption", "overage"] },
      { id: "i3-2", text: "Half our stack is now usage-based — Twilio, AWS, Stripe, Segment. Pulse only covers the seat-based half. We're missing half the picture for our quarterly SaaS review.", source: "gong", type: "feature-request", customer: "Alex Morgan", company: "Drift", date: "Jan 25, 2025", sentiment: "negative", tags: ["usage-based", "gap", "reporting"] },
      { id: "i3-3", text: "If Pulse could surface 'you're trending to exceed your Snowflake quota by 15% this month', that alone would justify our Enterprise plan upgrade.", source: "zendesk", type: "feature-request", customer: "Mia Johansson", company: "Aircall", date: "Jan 8, 2025", sentiment: "positive", tags: ["forecasting", "alerts", "roi"] },
      { id: "i3-4", text: "The insights engine is great for seat utilisation. But for consumption-based tools there's nothing. Please add support for at least AWS and Snowflake first.", source: "freshdesk", type: "feature-request", customer: "Kevin Brown", company: "Lattice", date: "Dec 20, 2024", sentiment: "neutral", tags: ["aws", "snowflake", "priority"] },
      { id: "i3-5", text: "Usage-based pricing visibility would be a key reason for us to recommend Pulse internally and eventually expand our contract.", source: "hubspot", type: "praise", customer: "Julia Santos", company: "Front", date: "Dec 5, 2024", sentiment: "positive", tags: ["expansion", "advocacy", "upsell"] },
    ],
    customers: [
      { id: "c3-1", company: "Tango", contact: "Sarah Kim", role: "IT Director", arr: "$200K", plan: "Enterprise", mentions: 2, priority: "high", initials: "TG", color: "#2170F4" },
      { id: "c3-2", company: "Drift", contact: "Alex Morgan", role: "SaaS Ops", arr: "$30K", plan: "Growth", mentions: 1, priority: "medium", initials: "DR", color: "#C59937" },
      { id: "c3-3", company: "Aircall", contact: "Mia Johansson", role: "Finance Lead", arr: "$15K", plan: "Growth", mentions: 1, priority: "medium", initials: "AC", color: "#4CAF50" },
      { id: "c3-4", company: "Lattice", contact: "Kevin Brown", role: "IT Manager", arr: "$10K", plan: "Starter", mentions: 1, priority: "low", initials: "LA", color: "#9C27B0" },
    ],
    discussions: [],
    experiments: [],
    canvas: "# Usage-Based Pricing Tracking\n\n## Why This Matters\nThe SaaS market is rapidly shifting from seat-based to consumption pricing. Customers managing tools like Snowflake, AWS, Twilio, or Stripe need a fundamentally different set of metrics vs. seat-based SaaS.\n\n## Phase 1 Scope (MVP)\n- Manual cost entry for usage-based tools\n- Month-over-month consumption trend\n- Budget threshold alerts\n\n## Longer Term Vision\n- Native API integrations with AWS Cost Explorer, Snowflake consumption API\n- AI-powered anomaly detection and forecasting\n- Optimization recommendations (unused credits, right-sizing)",
    notifications: [
      { id: "n3-1", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "5 insights linked — Tango's Snowflake overage mention flagged as high-priority signal", timestamp: "1 week ago", read: false },
    ],
  },
  {
    id: 4,
    title: "Time tracking capability for monitoring application usage duration",
    description:
      "Customers want to track how long employees actually spend in each application — not just whether they logged in — to contextualize license utilization and build a true ROI case.",
    status: "backlog",
    priority: "medium",
    arr: "$180K",
    customer: "Just Eat",
    assignee: "Vatsal Singhal",
    assigneeInitials: "VS",
    assigneeColor: "#7BA7DF",
    category: "Tracking",
    tags: ["time-tracking", "usage", "roi", "productivity"],
    aiSummary:
      "3 customers are asking for time-based usage data to go beyond the binary 'active/inactive' metric. Just Eat's IT team specifically called out that seeing 'login frequency' without duration is not enough — a tool that someone logs into for 2 minutes a month shouldn't be treated the same as one they use for 4 hours a day. This data is essential for building a proper ROI case during vendor renewal negotiations.",
    metrics: {
      totalRequests: 3,
      totalARR: "$235K",
      avgSentiment: 3.6,
      topSource: "gong",
    },
    insights: [
      { id: "i4-1", text: "Login count is a vanity metric. I need to know how long people are actually using a tool to justify its cost. Duration tracking would change how I approach vendor negotiations.", source: "gong", type: "feature-request", customer: "Omar Hassan", company: "Just Eat", date: "Feb 25, 2025", sentiment: "neutral", tags: ["roi", "negotiation", "duration"] },
      { id: "i4-2", text: "We found that 60% of our Figma licenses are used for less than 5 minutes a week. Time tracking in Pulse would let us find these hidden waste pockets across all tools.", source: "fireflies", type: "feature-request", customer: "Elena Kovacs", company: "Deliveroo", date: "Feb 10, 2025", sentiment: "positive", tags: ["figma", "waste", "optimization"] },
      { id: "i4-3", text: "The application usage page shows me DAU/MAU but not duration. Adding average session length would make the insights actionable.", source: "zendesk", type: "feature-request", customer: "Ray Thompson", company: "Monzo", date: "Jan 19, 2025", sentiment: "neutral", tags: ["dau", "session-length", "actionable"] },
    ],
    customers: [
      { id: "c4-1", company: "Just Eat", contact: "Omar Hassan", role: "Director of IT", arr: "$180K", plan: "Enterprise", mentions: 2, priority: "high", initials: "JE", color: "#DD5263" },
      { id: "c4-2", company: "Deliveroo", contact: "Elena Kovacs", role: "SaaS Ops Lead", arr: "$35K", plan: "Growth", mentions: 1, priority: "medium", initials: "DL", color: "#C59937" },
      { id: "c4-3", company: "Monzo", contact: "Ray Thompson", role: "IT Manager", arr: "$20K", plan: "Starter", mentions: 1, priority: "low", initials: "MZ", color: "#4CAF50" },
    ],
    discussions: [],
    experiments: [],
    canvas: "# Time Tracking — Research & Notes\n\n## Technical Approach Options\n1. **Browser Extension**: Most accurate, tracks active tab time. Requires employee install.\n2. **SSO/IdP Integration**: Can track login/logout times for SAML apps. Lower accuracy.\n3. **Calendar Heuristics**: Look at calendar blocks + email activity to approximate tool usage.\n\n## Privacy Considerations\n- Must be opt-in or org-admin controlled\n- Should aggregate at team level by default, not individual\n- Clear data retention policy needed\n\n## Success Metric\nCustomers who adopt time tracking reduce unnecessary license spend by X% within 3 months.",
    notifications: [
      { id: "n4-1", type: "assignment", user: "Vatsal Singhal", initials: "VS", color: "#2170F4", text: "assigned this feature to Vatsal Singhal", timestamp: "2 weeks ago", read: true },
    ],
  },
  {
    id: 5,
    title: "Enable employee visibility of complete app list with paid/unpaid tool distinction",
    description:
      "Employees should be able to see all the SaaS tools available to them, clearly segmented by free vs. company-paid, to reduce shadow IT and help employees choose the right tool for each job.",
    status: "done",
    priority: "low",
    arr: "$180K",
    customer: "Just Eat",
    assignee: "Sajal Kumar",
    assigneeInitials: "SA",
    assigneeColor: "#80BC83",
    category: "Visibility",
    tags: ["employee-portal", "visibility", "shadow-it", "catalog"],
    aiSummary:
      "This feature has been shipped. Customer reception has been positive — Just Eat's IT team reported a 30% reduction in new SaaS tool requests after employees could see what was already available. The employee app catalog with paid/free distinction is now a selling point in demos. Minor improvement requests are still coming in around customization of the catalog view.",
    metrics: {
      totalRequests: 3,
      totalARR: "$205K",
      avgSentiment: 4.5,
      topSource: "hubspot",
    },
    insights: [
      { id: "i5-1", text: "The new app catalog is fantastic! Employees now know what tools are available before going rogue and signing up for their own. This alone has saved us ~$8K/year in duplicate tools.", source: "hubspot", type: "praise", customer: "Omar Hassan", company: "Just Eat", date: "Mar 1, 2025", sentiment: "positive", tags: ["savings", "shadow-it", "success"] },
      { id: "i5-2", text: "Love the paid vs. free badge on the catalog. One request: can we let admins customize the badge label? We call paid tools 'approved' internally.", source: "zendesk", type: "feature-request", customer: "Omar Hassan", company: "Just Eat", date: "Mar 3, 2025", sentiment: "positive", tags: ["customization", "labels"] },
      { id: "i5-3", text: "The catalog is clean and easy to navigate. Being able to see 'HR-approved' tools vs. personal use ones is a game changer for new employee onboarding.", source: "gong", type: "praise", customer: "Lily Wang", company: "Bolt", date: "Feb 28, 2025", sentiment: "positive", tags: ["onboarding", "catalog"] },
    ],
    customers: [
      { id: "c5-1", company: "Just Eat", contact: "Omar Hassan", role: "Director of IT", arr: "$180K", plan: "Enterprise", mentions: 2, priority: "high", initials: "JE", color: "#DD5263" },
      { id: "c5-2", company: "Bolt", contact: "Lily Wang", role: "IT Admin", arr: "$25K", plan: "Growth", mentions: 1, priority: "low", initials: "BT", color: "#9C27B0" },
    ],
    discussions: [],
    experiments: [],
    canvas: "# Employee App Catalog — Post-Launch Notes\n\n## What We Shipped\n- Employee-facing catalog page with all managed apps\n- Paid (company-licensed) vs. Free (self-service) badge\n- Search and filter by category\n- 'Request Access' button for licensed apps\n\n## Post-Launch Feedback\n- Just Eat: 30% reduction in new SaaS requests in first month\n- Bolt: Using it as part of new hire onboarding checklist\n\n## Follow-Up Backlog\n- [ ] Custom badge labels (e.g., 'Approved' instead of 'Paid')\n- [ ] Manager approval workflow for access requests\n- [ ] Integration with HRIS for auto-provisioning",
    notifications: [
      { id: "n5-1", type: "status-change", user: "Sajal Kumar", initials: "SA", color: "#4CAF50", text: "marked this feature as Done — shipped in v2.4.0", timestamp: "2 weeks ago", read: true },
      { id: "n5-2", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "3 new praise insights added post-launch — strong positive signal from Just Eat", timestamp: "1 week ago", read: false },
    ],
  },
  {
    id: 6,
    title: "Bulk application offboarding workflow for departing employees",
    description:
      "When an employee leaves, IT needs to deprovision access across 50-100+ apps simultaneously. Currently this requires manual action in each tool. Customers want a single-click 'offboard employee' workflow triggered from Pulse.",
    status: "backlog",
    priority: "medium",
    arr: "$180K",
    customer: "Just Eat",
    assignee: "Design",
    assigneeInitials: "DE",
    assigneeColor: "#C87B88",
    category: "Tracking",
    tags: ["offboarding", "automation", "security", "workflow"],
    aiSummary:
      "Departing employee offboarding is a security-critical pain point. Just Eat reported that manual deprovisioning takes their IT team 2-3 hours per departing employee across ~80 apps. A bulk offboarding workflow is one of the highest-value, highest-urgency features across the entire roadmap — combines security (preventing data breaches) with efficiency gains. The main technical dependency is deep SCIM/SSO integration for deprovisioning to actually work.",
    metrics: {
      totalRequests: 3,
      totalARR: "$280K",
      avgSentiment: 3.9,
      topSource: "gong",
    },
    insights: [
      { id: "i6-1", text: "When someone leaves, I have to manually log into 80+ apps to remove their access. This takes my team hours and we've had security incidents because of delays. A bulk offboard button in Pulse would be transformational.", source: "gong", type: "pain-point", customer: "Omar Hassan", company: "Just Eat", date: "Mar 4, 2025", sentiment: "negative", tags: ["security", "offboarding", "manual-work"] },
      { id: "i6-2", text: "We had a former employee's Slack access stay active for 3 weeks after they left. If Pulse could trigger deprovisioning automatically, this would never happen.", source: "zendesk", type: "pain-point", customer: "Maya Singh", company: "Monzo", date: "Feb 22, 2025", sentiment: "negative", tags: ["security", "slack", "incident"] },
      { id: "i6-3", text: "Offboarding workflow is the #1 feature request from our CISO and the main reason we're evaluating enterprise ITAM solutions. Pulse already has the app data — please add the workflow layer.", source: "fireflies", type: "feature-request", customer: "Ben Carter", company: "Wise", date: "Feb 12, 2025", sentiment: "neutral", tags: ["ciso", "itam", "enterprise"] },
    ],
    customers: [
      { id: "c6-1", company: "Just Eat", contact: "Omar Hassan", role: "Director of IT", arr: "$180K", plan: "Enterprise", mentions: 3, priority: "high", initials: "JE", color: "#DD5263" },
      { id: "c6-2", company: "Monzo", contact: "Maya Singh", role: "Security Lead", arr: "$20K", plan: "Starter", mentions: 2, priority: "high", initials: "MZ", color: "#4CAF50" },
      { id: "c6-3", company: "Wise", contact: "Ben Carter", role: "Head of IT", arr: "$80K", plan: "Growth", mentions: 2, priority: "high", initials: "WS", color: "#9C27B0" },
    ],
    discussions: [],
    experiments: [],
    canvas: "# Bulk Offboarding — Scoping Notes\n\n## The Security Case\nEvery hour a departed employee retains access is a potential data breach risk. With 50-100+ apps, manual deprovisioning simply doesn't scale.\n\n## How It Should Work\n1. IT triggers 'Offboard Employee' from Pulse (HR signal or manual)\n2. Pulse surfaces all apps the employee has access to\n3. IT selects apps to deprovision (default: all)\n4. Pulse sends deprovisioning requests via SCIM/OAuth\n5. Status tracker shows success/failure per app\n6. Auto-generate offboarding audit report\n\n## Dependencies\n- SCIM provisioning integration (in progress)\n- OAuth token revocation APIs per app\n- HRIS integration for departure events\n\n## Risk: Apps Without SCIM\nSome apps (legacy tools, niche SaaS) don't support SCIM. For these, Pulse should surface manual action items with one-click links to the admin panel.",
    notifications: [
      { id: "n6-1", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "high-urgency pattern detected: 3 customers mentioned security incidents related to offboarding", timestamp: "3 days ago", read: false },
      { id: "n6-2", type: "comment", user: "Design", initials: "DE", color: "#DD5263", text: "started wireframing the offboarding flow — will share in next design review", timestamp: "5 days ago", read: false },
    ],
  },
  {
    id: 7,
    title: "Voice Calling",
    description:
      "Customers need Pulse to track and surface insights for voice calling SaaS tools (Aircall, RingCentral, Zoom Phone) — including call-minute usage, idle seat detection, and cost-per-call trends across their telephony stack.",
    status: "backlog",
    priority: "high",
    arr: "$110K",
    customer: "Just Eat",
    assignee: "Unassigned",
    assigneeInitials: "–",
    assigneeColor: "#9CA3AF",
    category: "Tracking",
    tags: ["voice", "telephony", "aircall", "ringcentral"],
    aiSummary:
      "3 enterprise customers have flagged that Pulse has zero visibility into UCaaS tools despite Aircall and RingCentral sitting in their top-5 SaaS spend. Just Eat and Deliveroo both want idle seat detection and call-volume trending that Pulse already offers for other app categories. Telephony is typically 8–12% of total SaaS spend, making this a high-value gap.",
    metrics: { totalRequests: 3, totalARR: "$175K", avgSentiment: 3.6, topSource: "gong" },
    insights: [
      { id: "i7-1", text: "Aircall is our third-biggest SaaS line item but Pulse shows nothing useful — no call minutes, no adoption by team, just a seat count. We need actual usage data here.", source: "gong", type: "pain-point", customer: "Omar Hassan", company: "Just Eat", date: "Feb 10, 2025", sentiment: "negative", tags: ["aircall", "usage", "spend"] },
      { id: "i7-2", text: "We suspect 30% of our RingCentral licences are idle. If Pulse could flag dormant telephony seats the same way it does for other apps, we'd cut spend significantly.", source: "zendesk", type: "feature-request", customer: "Elena Kovacs", company: "Deliveroo", date: "Jan 14, 2025", sentiment: "neutral", tags: ["ringcentral", "idle", "savings"] },
      { id: "i7-3", text: "Voice calling tracking would close the last blind spot in our SaaS stack coverage. Right now UCaaS tools are just invisible to Pulse.", source: "fireflies", type: "feature-request", customer: "Chris Yates", company: "HubSpot", date: "Jan 3, 2025", sentiment: "positive", tags: ["ucaas", "coverage", "full-stack"] },
    ],
    customers: [
      { id: "c7-1", company: "Just Eat", contact: "Omar Hassan", role: "Director of IT", arr: "$110K", plan: "Enterprise", mentions: 2, priority: "high", initials: "JE", color: "#DD5263" },
      { id: "c7-2", company: "Deliveroo", contact: "Elena Kovacs", role: "SaaS Ops Lead", arr: "$35K", plan: "Growth", mentions: 1, priority: "medium", initials: "DL", color: "#C59937" },
      { id: "c7-3", company: "HubSpot", contact: "Chris Yates", role: "SaaS Ops Lead", arr: "$30K", plan: "Growth", mentions: 1, priority: "medium", initials: "HS", color: "#4CAF50" },
    ],
    discussions: [],
    experiments: [],
    canvas:
      "# Voice Calling Tracking — Scoping\n\n## Problem\nPulse has no native support for UCaaS/telephony tools. Customers with Aircall, RingCentral, or Zoom Phone in their SaaS stack get zero insights.\n\n## Metrics Needed\n- Call volume per user / team\n- Minutes used vs. plan limit\n- Idle seat detection (seat with <1 call/month)\n- Cost-per-call trend\n\n## API Availability\n- Aircall: REST API with call metrics ✓\n- RingCentral: Analytics API ✓\n- Zoom Phone: Limited analytics API ~\n\n## Phase 1 Scope\nAircall integration only — covers ~60% of customer use cases. Estimated: 2 sprints.",
    notifications: [
      { id: "n7-1", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "3 insights linked — Just Eat flagged Aircall as top-5 spend with zero Pulse coverage", timestamp: "2 weeks ago", read: false },
    ],
  },
  {
    id: 8,
    title: "Enhance Voice Calling Capabilities",
    description:
      "Building on basic telephony tracking, this feature adds advanced analytics: per-department call cost breakdowns, anomaly alerts for usage spikes, and scheduled report delivery for IT and Finance teams.",
    status: "in-progress",
    priority: "medium",
    arr: "$85K",
    customer: "Deliveroo",
    assignee: "Ananya Lal",
    assigneeInitials: "AL",
    assigneeColor: "#D48E97",
    category: "Tracking",
    tags: ["voice", "analytics", "alerts", "reporting"],
    aiSummary:
      "Following the initial Aircall integration, 3 customers immediately requested deeper analytics — specifically per-department cost breakdowns and spike alerts. Deliveroo's finance team wants a monthly cost-per-team report, while Just Eat needs threshold alerts when daily call minutes exceed budget. These enhancements are scoped as a fast-follow to the base voice calling feature.",
    metrics: { totalRequests: 3, totalARR: "$185K", avgSentiment: 3.8, topSource: "zendesk" },
    insights: [
      { id: "i8-1", text: "The basic call tracking is great, but I need a breakdown by department — Customer Support vs. Sales vs. Account Management. Right now it's one big number.", source: "zendesk", type: "feature-request", customer: "Elena Kovacs", company: "Deliveroo", date: "Feb 28, 2025", sentiment: "positive", tags: ["department", "breakdown", "cost"] },
      { id: "i8-2", text: "We had a spike in Aircall usage last month that nobody caught until the bill arrived. An alert when daily minutes exceed our budget would be incredibly valuable.", source: "gong", type: "feature-request", customer: "Omar Hassan", company: "Just Eat", date: "Feb 16, 2025", sentiment: "neutral", tags: ["alerts", "budget", "spike"] },
      { id: "i8-3", text: "Can we schedule the call cost report to auto-send to our Finance team each month? Would save me an hour of manual export every billing cycle.", source: "freshdesk", type: "feature-request", customer: "Ray Thompson", company: "Monzo", date: "Feb 5, 2025", sentiment: "positive", tags: ["scheduled-report", "finance", "automation"] },
    ],
    customers: [
      { id: "c8-1", company: "Deliveroo", contact: "Elena Kovacs", role: "SaaS Ops Lead", arr: "$85K", plan: "Enterprise", mentions: 2, priority: "high", initials: "DL", color: "#C59937" },
      { id: "c8-2", company: "Just Eat", contact: "Omar Hassan", role: "Director of IT", arr: "$80K", plan: "Enterprise", mentions: 1, priority: "medium", initials: "JE", color: "#DD5263" },
      { id: "c8-3", company: "Monzo", contact: "Ray Thompson", role: "IT Manager", arr: "$20K", plan: "Starter", mentions: 1, priority: "low", initials: "MZ", color: "#4CAF50" },
    ],
    discussions: [
      {
        id: "d8-1",
        platform: "slack",
        channel: "#product",
        date: "Mar 2, 2025",
        messages: [
          { user: "Ananya Lal", initials: "AL", color: "#D48E97", text: "Kicking off the voice calling enhancements sprint. Prioritising: (1) dept. cost breakdown, (2) threshold alerts, (3) scheduled reports. Design, can you share wires by EOW?", timestamp: "9:30 AM" },
          { user: "Design", initials: "DE", color: "#E89AA0", text: "On it — I'll base the breakdown UI on the existing usage-by-team pattern. Alert setup can reuse the notification preferences panel.", timestamp: "9:48 AM", reactions: [{ emoji: "👍", count: 2 }] },
        ],
      },
    ],
    experiments: [],
    canvas:
      "# Voice Calling Enhancements — Sprint Notes\n\n## In Scope (this sprint)\n1. Per-department cost breakdown (Aircall)\n2. Budget threshold alerts (configurable by admin)\n3. Scheduled monthly report to email\n\n## Out of Scope\n- RingCentral dept. breakdown (API limitations)\n- Real-time call monitoring\n\n## Alert Logic\n- Trigger: daily call minutes > X% of monthly budget\n- Recipients: IT Admin + optionally Finance\n- Channel: in-app + email",
    notifications: [
      { id: "n8-1", type: "status-change", user: "Ananya Lal", initials: "AL", color: "#D48E97", text: "moved this feature to In Progress", timestamp: "4 days ago", read: false },
      { id: "n8-2", type: "comment", user: "Design", initials: "DE", color: "#E89AA0", text: "shared wireframes for department cost breakdown view", timestamp: "2 days ago", read: true },
    ],
  },
  {
    id: 9,
    title: "Security and Compliance Initiatives",
    description:
      "A centralized dashboard surfacing security risk signals across the SaaS stack — highlighting apps with excessive permissions, missing SSO, or expired OAuth tokens — to help IT teams proactively manage their security posture.",
    status: "backlog",
    priority: "low",
    arr: "$20K",
    customer: "Monzo",
    assignee: "Unassigned",
    assigneeInitials: "–",
    assigneeColor: "#9CA3AF",
    category: "Security",
    tags: ["security", "compliance", "sso", "permissions"],
    aiSummary:
      "Early signal from Monzo's security team: they want Pulse to flag SaaS apps that bypass SSO, have stale OAuth tokens, or are configured with overly broad permissions. This is a nascent request (1 customer, $20K ARR) but sits at the intersection of SaaS management and security posture — a strategic direction worth tracking.",
    metrics: { totalRequests: 1, totalARR: "$20K", avgSentiment: 3.4, topSource: "zendesk" },
    insights: [
      { id: "i9-1", text: "We had a shadow SaaS tool that bypassed SSO for 4 months before we caught it. If Pulse could surface apps not enrolled in SSO enforcement, that would prevent exactly this scenario.", source: "zendesk", type: "feature-request", customer: "Maya Singh", company: "Monzo", date: "Feb 8, 2025", sentiment: "neutral", tags: ["sso", "shadow-saas", "security"] },
    ],
    customers: [
      { id: "c9-1", company: "Monzo", contact: "Maya Singh", role: "Security Lead", arr: "$20K", plan: "Starter", mentions: 1, priority: "medium", initials: "MZ", color: "#4CAF50" },
    ],
    discussions: [],
    experiments: [],
    canvas:
      "# Security Posture — Early Exploration\n\n## Problem Signal\nIT/Security teams want to know which apps in their stack represent security risks — not just governance/cost risks.\n\n## Potential Signals to Surface\n- Apps not enrolled in SSO\n- Applications with OAuth scopes beyond their required access\n- Expired or long-lived tokens with no rotation\n- Apps with admin access granted to non-IT users\n\n## Open Questions\n- Is this a separate module or part of each app's detail view?\n- How do we define 'risky'? Need a scoring model.\n- Dependency: OAuth token introspection API coverage",
    notifications: [
      { id: "n9-1", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "new security-themed insight flagged from Monzo — SSO bypass incident", timestamp: "3 weeks ago", read: true },
    ],
  },
  {
    id: 10,
    title: "Compliance Training Reminders",
    description:
      "Automatic reminders triggered within Pulse when employees are overdue on compliance training linked to specific SaaS tools — for example, security training before Salesforce CRM access is provisioned.",
    status: "backlog",
    priority: "low",
    arr: "$0",
    customer: "—",
    assignee: "Unassigned",
    assigneeInitials: "–",
    assigneeColor: "#9CA3AF",
    category: "Security",
    tags: ["compliance", "training", "reminders", "automation"],
    aiSummary:
      "No customer requests yet — this feature is internally proposed to close the loop between app provisioning and compliance training completion. The idea: when Pulse provisions access to a regulated tool (e.g., a HIPAA-covered app), it auto-triggers a training reminder and blocks full access until the training is marked complete in the LMS.",
    metrics: { totalRequests: 0, totalARR: "$0", avgSentiment: 0, topSource: "slack" },
    insights: [],
    customers: [],
    discussions: [],
    experiments: [],
    canvas:
      "# Compliance Training Reminders — Internal Proposal\n\n## Concept\nWhen Pulse provisions access to a 'compliance-tagged' app, it checks the employee's training status in the linked LMS (e.g., Workday Learning, TalentLMS) and auto-sends a reminder if incomplete.\n\n## Flow\n1. Employee requests access to Salesforce (compliance-tagged)\n2. Pulse checks LMS: training status = incomplete\n3. Pulse sends reminder email + in-app notification\n4. Access is provisioned but limited until training is complete\n5. LMS completion event unlocks full permissions\n\n## Dependencies\n- LMS integration (not yet built)\n- Compliance tagging for apps\n- Provisioning workflow (in progress via offboarding epic)",
    notifications: [],
  },
  {
    id: 11,
    title: "Accessibility Settings Customization",
    description:
      "Allow IT admins and end users to customise Pulse's accessibility settings — including high-contrast mode, keyboard navigation improvements, font scaling, and WCAG 2.1 AA conformance across all views.",
    status: "backlog",
    priority: "medium",
    arr: "$95K",
    customer: "Wise",
    assignee: "Maya Rao",
    assigneeInitials: "MR",
    assigneeColor: "#4E9E95",
    category: "UI/UX",
    tags: ["accessibility", "wcag", "a11y", "ui"],
    aiSummary:
      "5 customers have raised accessibility gaps — primarily contrast ratios below WCAG 2.1 AA in the app list and dashboard views, and missing keyboard navigation in dropdown menus. Wise's accessibility team flagged this during an internal audit before renewing. Fixing WCAG conformance is both a compliance obligation for enterprise customers and a blocker for public sector deals.",
    metrics: { totalRequests: 5, totalARR: "$320K", avgSentiment: 3.4, topSource: "zendesk" },
    insights: [
      { id: "i11-1", text: "Our internal accessibility audit flagged Pulse's app list table with insufficient contrast. We're required to use WCAG 2.1 AA tools across our org — this needs to be fixed before renewal.", source: "zendesk", type: "pain-point", customer: "Ben Carter", company: "Wise", date: "Feb 20, 2025", sentiment: "negative", tags: ["wcag", "contrast", "renewal"] },
      { id: "i11-2", text: "The filter dropdown isn't keyboard navigable. Our team members who rely on keyboard-only navigation can't use the Insights tab at all.", source: "zendesk", type: "bug", customer: "Maya Singh", company: "Monzo", date: "Feb 4, 2025", sentiment: "negative", tags: ["keyboard", "navigation", "bug"] },
      { id: "i11-3", text: "Could you add a high-contrast mode? Our security operations team works in low-light environments — a dark/high-contrast UI option would be really appreciated.", source: "slack", type: "feature-request", customer: "Omar Hassan", company: "Just Eat", date: "Jan 25, 2025", sentiment: "neutral", tags: ["dark-mode", "high-contrast", "ux"] },
      { id: "i11-4", text: "Font size is hard to scale without layout breaking. As an IT lead with low vision, I often use system font scaling — Pulse's layout breaks at 150%.", source: "freshdesk", type: "pain-point", customer: "Leila Nouri", company: "Asana", date: "Jan 12, 2025", sentiment: "negative", tags: ["font-scaling", "low-vision", "layout"] },
      { id: "i11-5", text: "We'd love to see Pulse publish a VPAT (Voluntary Product Accessibility Template) — it's required for our vendor procurement process.", source: "gong", type: "feature-request", customer: "Tom Bradley", company: "Stripe", date: "Dec 15, 2024", sentiment: "neutral", tags: ["vpat", "procurement", "enterprise"] },
    ],
    customers: [
      { id: "c11-1", company: "Wise", contact: "Ben Carter", role: "Head of IT", arr: "$80K", plan: "Growth", mentions: 2, priority: "high", initials: "WS", color: "#9C27B0" },
      { id: "c11-2", company: "Monzo", contact: "Maya Singh", role: "Security Lead", arr: "$20K", plan: "Starter", mentions: 1, priority: "medium", initials: "MZ", color: "#4CAF50" },
      { id: "c11-3", company: "Just Eat", contact: "Omar Hassan", role: "Director of IT", arr: "$110K", plan: "Enterprise", mentions: 1, priority: "medium", initials: "JE", color: "#DD5263" },
      { id: "c11-4", company: "Asana", contact: "Leila Nouri", role: "IT Manager", arr: "$60K", plan: "Growth", mentions: 1, priority: "medium", initials: "AS", color: "#C59937" },
      { id: "c11-5", company: "Stripe", contact: "Tom Bradley", role: "Compliance Manager", arr: "$50K", plan: "Growth", mentions: 1, priority: "low", initials: "ST", color: "#2170F4" },
    ],
    discussions: [
      {
        id: "d11-1",
        platform: "slack",
        channel: "#design-review",
        date: "Feb 26, 2025",
        messages: [
          { user: "Design", initials: "DE", color: "#E89AA0", text: "Kicking off an accessibility audit of Pulse. Running an automated a11y scan on all pages — will share the full report by end of week. Initial findings: contrast failures in table headers and badge components.", timestamp: "3:00 PM" },
          { user: "Maya Rao", initials: "MR", color: "#4E9E95", text: "Thanks for getting on this. Wise's renewal is in 6 weeks. Can we scope a targeted fix for the top WCAG blockers in time?", timestamp: "3:15 PM", reactions: [{ emoji: "✅", count: 3 }] },
        ],
      },
    ],
    experiments: [],
    canvas:
      "# Accessibility Audit & Fixes\n\n## WCAG 2.1 AA Gaps (from automated scan)\n1. **Contrast ratio failures**: table header text (#6B7280 on white = 3.0:1, need ≥4.5:1)\n2. **Keyboard trap**: filter dropdown closes on Tab without selecting\n3. **Missing focus indicator**: custom button components lack visible focus ring\n4. **Font scaling**: layout breaks at 150% browser zoom\n\n## Priority Order\n1. Contrast fixes (affects all users, quick CSS)\n2. Keyboard navigation (affects keyboard users, medium lift)\n3. Focus indicators (affects keyboard + screen reader users)\n4. Font scaling (medium complexity, layout refactor)\n\n## Nice-to-Have\n- High-contrast theme toggle\n- VPAT document for enterprise procurement",
    notifications: [
      { id: "n11-1", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "accessibility gap flagged by Wise — WCAG failures may block renewal", timestamp: "1 week ago", read: false },
      { id: "n11-2", type: "assignment", user: "Maya Rao", initials: "MR", color: "#4E9E95", text: "assigned this feature to Maya Rao", timestamp: "5 days ago", read: true },
    ],
  },
  {
    id: 12,
    title: "In-App Upgrade Prompts",
    description:
      "Smart, contextual prompts within Pulse that nudge customers on Starter or Growth plans to upgrade when they hit feature limits or when usage patterns suggest they'd benefit from a higher tier.",
    status: "backlog",
    priority: "medium",
    arr: "$75K",
    customer: "Lattice",
    assignee: "Vatsal Singhal",
    assigneeInitials: "VS",
    assigneeColor: "#7BA7DF",
    category: "Analytics",
    tags: ["growth", "upsell", "monetization", "upgrade"],
    aiSummary:
      "Customer success data shows that 40% of Growth plan customers regularly hit the 50-app tracking limit without upgrading. In-app prompts shown at the moment of friction (e.g., when attempting to add app #51) are estimated to increase upgrade conversion by 2–3×. This is a pure growth initiative with no external customer requests — it's entirely internally driven.",
    metrics: { totalRequests: 2, totalARR: "$100K", avgSentiment: 3.9, topSource: "hubspot" },
    insights: [
      { id: "i12-1", text: "We didn't even know Enterprise plan had the policy automation feature until our CSM told us during renewal. An in-app prompt 3 months earlier would have made us upgrade sooner.", source: "hubspot", type: "feature-request", customer: "Kevin Brown", company: "Lattice", date: "Jan 30, 2025", sentiment: "positive", tags: ["discovery", "upgrade", "automation"] },
      { id: "i12-2", text: "When we hit the user limit, the error message was unhelpful — it just said 'limit reached'. Showing what we'd unlock by upgrading right at that moment would have made the decision much easier.", source: "zendesk", type: "pain-point", customer: "Julia Santos", company: "Front", date: "Jan 8, 2025", sentiment: "neutral", tags: ["limit", "ux", "upgrade-flow"] },
    ],
    customers: [
      { id: "c12-1", company: "Lattice", contact: "Kevin Brown", role: "IT Manager", arr: "$75K", plan: "Growth", mentions: 1, priority: "medium", initials: "LA", color: "#9C27B0" },
      { id: "c12-2", company: "Front", contact: "Julia Santos", role: "SaaS Ops", arr: "$25K", plan: "Growth", mentions: 1, priority: "low", initials: "FR", color: "#4CAF50" },
    ],
    discussions: [],
    experiments: [
      {
        id: "e12-1",
        title: "Upgrade prompt copy A/B — friction point vs. value-led",
        type: "ab-test",
        status: "draft",
        target: "Growth plan customers hitting 80% app limit",
        responses: 0,
        completionRate: 0,
        createdAt: "Mar 1, 2025",
        questions: [
          { id: "eq1", text: "Variant A: 'You've used 80% of your app slots. Upgrade to Enterprise for unlimited tracking.' vs. Variant B: 'Unlock advanced analytics, unlimited apps, and policy automation — see what Enterprise adds for your team.'", type: "text" },
        ],
      },
    ],
    canvas:
      "# In-App Upgrade Prompts — Strategy\n\n## Trigger Points\n1. User hits 80% of app limit → soft prompt\n2. User hits 100% limit → hard gate with upgrade CTA\n3. User clicks on an Enterprise-only feature → contextual upsell\n4. Monthly digest: 'You've outgrown your plan' (if >90% of limit used for 2+ weeks)\n\n## Prompt Principles\n- Show value, not just the limit\n- One-click path to pricing page / CSM contact\n- Never show same prompt more than once per week\n- Dismissible (with 'remind me later')\n\n## Success Metrics\n- Upgrade conversion rate from prompt interactions\n- Time from prompt exposure to upgrade\n- Prompt dismissal rate (high = prompt is irrelevant or annoying)",
    notifications: [
      { id: "n12-1", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "2 customer insights linked — both mention discovering features too late to influence upgrade timing", timestamp: "3 weeks ago", read: true },
    ],
  },
  {
    id: 13,
    title: "Zapier Integration",
    description:
      "A native Zapier integration that lets customers trigger workflows from Pulse events — new app detected, license limit reached, employee offboarded — and push SaaS data into their existing automation stack without engineering involvement.",
    status: "backlog",
    priority: "medium",
    arr: "$110K",
    customer: "Drift",
    assignee: "Maya Rao",
    assigneeInitials: "MR",
    assigneeColor: "#4E9E95",
    category: "Integrations",
    tags: ["zapier", "automation", "integrations", "workflow", "no-code"],
    aiSummary:
      "7 customers (primarily mid-market on Growth plan) want to connect Pulse events to their existing Zapier workflows without needing a developer. The most requested triggers are: 'new shadow IT app detected' → Slack alert, 'license limit reached' → Jira ticket, and 'employee offboarded' → notify HR system. A Zapier integration would dramatically expand Pulse's automation surface without building point-to-point integrations.",
    metrics: { totalRequests: 7, totalARR: "$205K", avgSentiment: 4.1, topSource: "slack" },
    insights: [
      { id: "i13-1", text: "We use Zapier to connect all our SaaS tools. If Pulse had a Zapier trigger for 'new unlicensed app detected', I could auto-create a Jira ticket for our IT team without writing a single line of code.", source: "slack", type: "feature-request", customer: "Alex Morgan", company: "Drift", date: "Mar 1, 2025", sentiment: "positive", tags: ["zapier", "jira", "automation", "no-code"] },
      { id: "i13-2", text: "I want to trigger a Slack message to our IT channel whenever someone gets a new app that isn't in our approved catalog. A Zapier trigger for that would take me 5 minutes to set up.", source: "slack", type: "feature-request", customer: "Julia Santos", company: "Front", date: "Feb 19, 2025", sentiment: "positive", tags: ["slack", "approval", "shadow-it"] },
      { id: "i13-3", text: "We have a whole automation stack built in Zapier. The ability to pull Pulse license and usage data into our monthly SaaS review spreadsheet via Zap would save 2 hours a month.", source: "freshdesk", type: "feature-request", customer: "Mia Johansson", company: "Aircall", date: "Feb 7, 2025", sentiment: "positive", tags: ["data-export", "spreadsheet", "monthly-review"] },
      { id: "i13-4", text: "Zapier integration would be a strong reason to move from Starter to Growth. It's exactly the kind of extensibility a growing ops team needs.", source: "hubspot", type: "feature-request", customer: "Kevin Brown", company: "Lattice", date: "Jan 22, 2025", sentiment: "positive", tags: ["upsell", "growth", "extensibility"] },
      { id: "i13-5", text: "Not a developer, but I manage SaaS for 800 people. Zapier is my superpower. If Pulse joined our Zapier network, I'd automate 5 painful manual processes immediately.", source: "gong", type: "praise", customer: "Nina Patel", company: "Intercom", date: "Jan 10, 2025", sentiment: "positive", tags: ["no-code", "automation", "advocacy"] },
      { id: "i13-6", text: "We're already using Zapier to sync Okta with our ITSM. Adding Pulse as a data source would complete the picture — new app events → ITSM ticket automatically.", source: "fireflies", type: "feature-request", customer: "Ben Carter", company: "Wise", date: "Dec 28, 2024", sentiment: "positive", tags: ["okta", "itsm", "event-driven"] },
      { id: "i13-7", text: "A Webhook or Zapier integration would let our team self-serve automation without waiting for engineering. This alone would justify our Growth plan renewal.", source: "zendesk", type: "feature-request", customer: "Ray Thompson", company: "Monzo", date: "Dec 10, 2024", sentiment: "positive", tags: ["webhook", "self-serve", "renewal"] },
    ],
    customers: [
      { id: "c13-1", company: "Drift", contact: "Alex Morgan", role: "SaaS Ops", arr: "$30K", plan: "Growth", mentions: 2, priority: "high", initials: "DR", color: "#C59937" },
      { id: "c13-2", company: "Front", contact: "Julia Santos", role: "SaaS Ops", arr: "$25K", plan: "Growth", mentions: 2, priority: "high", initials: "FR", color: "#4CAF50" },
      { id: "c13-3", company: "Aircall", contact: "Mia Johansson", role: "Finance Lead", arr: "$15K", plan: "Growth", mentions: 1, priority: "medium", initials: "AC", color: "#9C27B0" },
      { id: "c13-4", company: "Lattice", contact: "Kevin Brown", role: "IT Manager", arr: "$15K", plan: "Growth", mentions: 1, priority: "medium", initials: "LA", color: "#2170F4" },
      { id: "c13-5", company: "Intercom", contact: "Nina Patel", role: "IT Admin", arr: "$20K", plan: "Starter", mentions: 1, priority: "medium", initials: "IC", color: "#DD5263" },
      { id: "c13-6", company: "Wise", contact: "Ben Carter", role: "Head of IT", arr: "$80K", plan: "Growth", mentions: 1, priority: "medium", initials: "WS", color: "#9C27B0" },
      { id: "c13-7", company: "Monzo", contact: "Ray Thompson", role: "IT Manager", arr: "$20K", plan: "Starter", mentions: 1, priority: "low", initials: "MZ", color: "#4CAF50" },
    ],
    discussions: [
      {
        id: "d13-1",
        platform: "slack",
        channel: "#integrations",
        date: "Mar 4, 2025",
        messages: [
          { user: "Maya Rao", initials: "MR", color: "#4E9E95", text: "Scoping the Zapier integration. Zapier requires us to build a 'Pulse app' on their platform. The core triggers we'd publish: app_detected, license_limit_reached, employee_offboarded. Actions: add_app_to_watchlist, suppress_alert. Thoughts on priority order?", timestamp: "10:00 AM" },
          { user: "Vatsal Singhal", initials: "VS", color: "#2170F4", text: "Start with just triggers — that covers 90% of the use cases customers mentioned. Actions can be v2. Also worth checking if we already have webhooks (we do per tf-18) — can Zapier just use those?", timestamp: "10:15 AM", reactions: [{ emoji: "💡", count: 4 }] },
          { user: "Maya Rao", initials: "MR", color: "#4E9E95", text: "Good call — Zapier can technically wrap our existing webhook spec. I'll test that path first. Would save us building a dedicated Zapier app entirely.", timestamp: "10:28 AM", reactions: [{ emoji: "🚀", count: 3 }] },
        ],
      },
    ],
    experiments: [],
    canvas:
      "# Zapier Integration — Approach\n\n## Option A: Native Zapier App\nBuild a Pulse app on Zapier's developer platform. More polished UX for customers, but ~3-4 sprints to build and maintain.\n\n## Option B: Webhook-Based (fast path)\nZapier supports 'Custom Webhooks' — customers can connect Pulse's existing webhook events to any Zap. Zero extra build time. Less discoverable.\n\n## Recommended Path\nShip Option B as immediate value (document it), then build a native Zapier app in Q3 for better discoverability and a proper listing in the Zapier marketplace.\n\n## Triggers to Expose (v1)\n- `app.detected` — new shadow IT app found\n- `license.limit_reached` — app hit seat limit\n- `employee.offboarded` — offboarding completed\n- `insight.created` — new feedback insight linked\n\n## Success Metrics\n- # Zaps created by customers within 30 days of launch\n- Support tickets related to integration (target: <5%)\n- Upgrade uplift from Growth → Enterprise post-Zapier adoption",
    notifications: [
      { id: "n13-1", type: "insight", user: "Pulse AI", initials: "AI", color: "#796FEC", text: "7 insights linked — strong positive signal, avg sentiment 4.1 across all requesters", timestamp: "1 week ago", read: false },
      { id: "n13-2", type: "comment", user: "Maya Rao", initials: "MR", color: "#4E9E95", text: "started scoping — may be able to ship via existing webhooks sooner than expected", timestamp: "3 days ago", read: false },
    ],
  },
];

// ─── Tree Types ───────────────────────────────────────────────────────────────

export interface TreeFeature {
  id: string;
  type: "feature";
  title: string;
  status: StatusType;
  assignees: { initials: string; color: string }[];
  createdAt: string;
  numCustomers: number;
  numFeedbacks: number;
  arr: number; // raw dollars, for aggregation
  detailId?: number; // links to Feature.id for side panel
}

export interface TreeFolder {
  id: string;
  type: "folder";
  title: string;
  children: TreeNode[];
}

export type TreeNode = TreeFolder | TreeFeature;

export function formatARR(n: number): string {
  if (n === 0) return "$0";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

// ─── Tree Data ────────────────────────────────────────────────────────────────

export const treeData: TreeNode[] = [
  {
    id: "folder-1",
    type: "folder",
    title: "Platform Alignment and Security Compliance",
    children: [
      {
        id: "tf-1",
        type: "feature",
        title: "Workflow Optimization",
        status: "in-progress",
        assignees: [{ initials: "VS", color: "#7BA7DF" }],
        createdAt: "a month ago",
        numCustomers: 4,
        numFeedbacks: 4,
        arr: 200_000,
        detailId: 2,
      },
      {
        id: "tf-2",
        type: "feature",
        title: "Enhancing API Security",
        status: "in-progress",
        assignees: [{ initials: "VS", color: "#7BA7DF" }],
        createdAt: "a month ago",
        numCustomers: 5,
        numFeedbacks: 8,
        arr: 200_000,
        detailId: 1,
      },
      {
        id: "tf-3",
        type: "feature",
        title: "UI/UX Enhancements",
        status: "backlog",
        assignees: [{ initials: "IJ", color: "#9B8EC4" }],
        createdAt: "a month ago",
        numCustomers: 4,
        numFeedbacks: 5,
        arr: 200_000,
        detailId: 3,
      },
      {
        id: "tf-4",
        type: "feature",
        title: "Product Planning and Roadmap",
        status: "backlog",
        assignees: [{ initials: "VS", color: "#7BA7DF" }],
        createdAt: "a month ago",
        numCustomers: 3,
        numFeedbacks: 3,
        arr: 180_000,
        detailId: 4,
      },
      {
        id: "tf-5",
        type: "feature",
        title: "File Transfer Issues",
        status: "done",
        assignees: [{ initials: "SA", color: "#80BC83" }],
        createdAt: "24 days ago",
        numCustomers: 2,
        numFeedbacks: 3,
        arr: 180_000,
        detailId: 5,
      },
      {
        id: "tf-6",
        type: "feature",
        title: "Language Interface Enhancements",
        status: "backlog",
        assignees: [{ initials: "DE", color: "#C87B88" }],
        createdAt: "24 days ago",
        numCustomers: 3,
        numFeedbacks: 3,
        arr: 180_000,
        detailId: 6,
      },
      {
        id: "tf-7",
        type: "feature",
        title: "Voice Calling",
        status: "backlog",
        assignees: [],
        createdAt: "23 days ago",
        numCustomers: 3,
        numFeedbacks: 3,
        arr: 110_000,
        detailId: 7,
      },
      {
        id: "tf-8",
        type: "feature",
        title: "Enhance Voice Calling Capabilities",
        status: "in-progress",
        assignees: [{ initials: "AL", color: "#D48E97" }],
        createdAt: "22 days ago",
        numCustomers: 3,
        numFeedbacks: 3,
        arr: 85_000,
        detailId: 8,
      },
      {
        id: "tf-9",
        type: "feature",
        title: "Security and Compliance Initiatives",
        status: "backlog",
        assignees: [],
        createdAt: "22 days ago",
        numCustomers: 1,
        numFeedbacks: 1,
        arr: 20_000,
        detailId: 9,
      },
      {
        id: "tf-10",
        type: "feature",
        title: "Compliance Training Reminders",
        status: "backlog",
        assignees: [],
        createdAt: "22 days ago",
        numCustomers: 0,
        numFeedbacks: 0,
        arr: 0,
        detailId: 10,
      },
      {
        id: "tf-11",
        type: "feature",
        title: "Accessibility Settings Customization",
        status: "backlog",
        assignees: [{ initials: "MR", color: "#4E9E95" }],
        createdAt: "21 days ago",
        numCustomers: 5,
        numFeedbacks: 5,
        arr: 95_000,
        detailId: 11,
      },
    ],
  },
  {
    id: "folder-2",
    type: "folder",
    title: "Product Growth & Monetization",
    children: [
      {
        id: "subfolder-1",
        type: "folder",
        title: "Pricing & Billing",
        children: [
          {
            id: "tf-12",
            type: "feature",
            title: "Custom Pricing Tiers",
            status: "done",
            assignees: [{ initials: "SA", color: "#80BC83" }],
            createdAt: "2 months ago",
            numCustomers: 2,
            numFeedbacks: 3,
            arr: 180_000,
            detailId: 5,
          },
          {
            id: "tf-13",
            type: "feature",
            title: "Usage-Based Billing",
            status: "backlog",
            assignees: [{ initials: "DE", color: "#C87B88" }],
            createdAt: "5 weeks ago",
            numCustomers: 3,
            numFeedbacks: 3,
            arr: 180_000,
            detailId: 6,
          },
        ],
      },
      {
        id: "tf-14",
        type: "feature",
        title: "Onboarding Flow Redesign",
        status: "backlog",
        assignees: [{ initials: "IJ", color: "#9B8EC4" }],
        createdAt: "3 weeks ago",
        numCustomers: 4,
        numFeedbacks: 5,
        arr: 200_000,
        detailId: 3,
      },
      {
        id: "tf-15",
        type: "feature",
        title: "In-App Upgrade Prompts",
        status: "backlog",
        assignees: [{ initials: "VS", color: "#7BA7DF" }],
        createdAt: "2 weeks ago",
        numCustomers: 2,
        numFeedbacks: 2,
        arr: 75_000,
        detailId: 12,
      },
    ],
  },
  {
    id: "folder-3",
    type: "folder",
    title: "Integrations & Ecosystem",
    children: [
      {
        id: "tf-16",
        type: "feature",
        title: "Zapier Integration",
        status: "backlog",
        assignees: [{ initials: "MR", color: "#4E9E95" }],
        createdAt: "a month ago",
        numCustomers: 7,
        numFeedbacks: 7,
        arr: 110_000,
        detailId: 13,
      },
      {
        id: "tf-17",
        type: "feature",
        title: "Salesforce Sync",
        status: "backlog",
        assignees: [{ initials: "VS", color: "#7BA7DF" }],
        createdAt: "3 weeks ago",
        numCustomers: 3,
        numFeedbacks: 3,
        arr: 180_000,
        detailId: 4,
      },
      {
        id: "tf-18",
        type: "feature",
        title: "Webhook Support",
        status: "in-progress",
        assignees: [{ initials: "VS", color: "#7BA7DF" }],
        createdAt: "2 months ago",
        numCustomers: 5,
        numFeedbacks: 8,
        arr: 200_000,
        detailId: 1,
      },
    ],
  },
];
