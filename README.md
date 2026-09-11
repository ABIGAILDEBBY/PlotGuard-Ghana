# TechArtGenius Studio Hub

A practical content-ops app for running a YouTube channel: track video ideas, move them through a production pipeline, plan a publishing calendar, manage sponsorship deals, and keep a gear/asset library — all in one place.

Built as a real, working app (React + TypeScript + Tailwind CSS), inspired by the "build governed apps in the flow of work" idea from Microsoft's Copilot Cowork announcement, adapted here for a solo content creator's actual workflow.

## Features

- **Dashboard** — at-a-glance view of what's in progress, what's coming up, open sponsorship deliverables, and top-performing videos.
- **Ideas** — a prioritized backlog for video ideas. Promote an idea straight into the production pipeline when you're ready to make it.
- **Pipeline** — a Kanban-style board tracking every video through Idea → Scripting → Filming → Editing → Scheduled → Published, with a per-video checklist and performance stats once published.
- **Calendar** — a monthly view of scheduled and published videos, plus a rolling 30-day upload cadence count.
- **Sponsorships** — brand deals with deliverables, deadlines, payment status, and disclosure flags, optionally linked to a specific video.
- **Gear & Assets** — the hardware/software you use or review, so you can see what's already been featured and what hasn't.

Data is seeded with realistic example content on first run — replace it with your own as you go.

## Data & privacy

Everything is stored locally in your browser via `localStorage`. Nothing is sent to a server. Use the **Export data** / **Import data** buttons in the sidebar to back up or move your data between browsers.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. To build a production bundle:

```bash
npm run build
npm run preview
```

## Tech stack

React 18, TypeScript, Vite, Tailwind CSS v4. No backend, no external accounts required.
