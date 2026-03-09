# Pulse

A product management dashboard for tracking feature requests, customer feedback, and prioritization — built with Next.js, React, and Tailwind CSS.

![Pulse Dashboard](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)

## Overview

Pulse helps product teams organize and prioritize feature requests by aggregating customer feedback, tracking ARR impact, and surfacing AI-powered insights. It provides a centralized view of your product roadmap with deep integration into customer voices.

## Application Walkthrough

### Sidebar Navigation

The collapsible sidebar provides quick access to different sections:
- **Overview** — Dashboard home
- **Copilot** — AI assistant (planned)
- **Insights** — Customer feedback analysis (planned)
- **Features** — Main feature management view
- **Customers** — Customer directory (planned)
- **Trends** / **Hotspots** — Analytics views (planned)

### Features Page

The main workspace for managing product features:

#### Tree View
- **Hierarchical organization** — Features are organized in folders and sub-folders
- **Status indicators** — Visual icons showing Done (orange), In Progress (purple), or Backlog (gray)
- **Expandable folders** — Click chevrons to expand/collapse folder contents
- **Aggregated metrics** — Folders show rolled-up counts from child features

#### Table Columns
| Column | Description |
|--------|-------------|
| Assignees | Avatar stack of team members assigned |
| Created at | Relative time since creation |
| Customers | Number of customers requesting this feature |
| Feedbacks | Total feedback items linked |
| ARR | Annual Recurring Revenue impact |

#### Toolbar
- **Columns** — Toggle which columns are visible
- **Filters** — Filter by minimum customers, feedbacks, or ARR
- **Search** — Full-text search across feature titles
- **View options** — Group by folder, status, or flat list

### Feature Detail Panel

Click "Open" on any feature row to view the detail panel:

#### Overview Tab
- **AI Summary** — Auto-generated summary of customer feedback themes
- **Key Metrics** — Total requests, ARR impact, sentiment score, top source
- **Top Customer Voices** — Preview of most relevant customer quotes
- **Quick Actions** — Generate PRD, create survey, start discussion, share

#### Insights Tab
- Filter insights by type: Feature Request, Pain Point, Bug, Praise
- Filter by source: Zendesk, Slack, Gong, Freshdesk, Fireflies, HubSpot
- Each insight shows sentiment, customer info, and tags

#### Customers Tab
- List of companies requesting this feature
- Contact info, ARR, plan tier, mention count, priority level
- Summary metrics: total companies, mentions, enterprise accounts

#### Discussion Tab
- Threaded conversations from Slack/Teams
- Post new messages to linked channels
- Reaction counts and timestamps

#### Experiments Tab
- Create validation surveys with AI assistance
- Track survey responses and completion rates
- Manage A/B tests

#### Canvas Tab
- Markdown notes and documentation
- Problem statements, use cases, competitive notes

#### Notifications Tab
- Activity feed: status changes, comments, new insights
- Assignment and mention alerts
- Experiment updates

#### Copilot Tab
- AI chat assistant with feature context
- Ask questions about customer feedback, prioritization, trends

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
├── components/        # Shared UI components (Sidebar, Icons)
├── features/          # Features page and components
│   └── _components/   # Feature-specific components
│       ├── AvatarStack.tsx
│       ├── FeatureDetailPanel.tsx
│       ├── FeaturesTable.tsx
│       ├── PageHeader.tsx
│       ├── Toolbar.tsx
│       └── TreeRow.tsx
├── lib/               # Utilities and mock data
│   ├── mockData.ts    # Sample features, insights, customers
│   └── treeUtils.ts   # Tree aggregation and filtering helpers
├── globals.css        # Tailwind config and custom animations
├── layout.tsx         # Root layout with sidebar
└── page.tsx           # Home redirect to /features
```
