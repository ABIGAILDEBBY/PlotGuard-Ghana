# PlotGuard Ghana

A free due-diligence companion for anyone buying land in Ghana — including diaspora buyers who can't inspect a plot themselves.

Ghana's land system (state, stool/skin, family, and private title, often overlapping and poorly documented) makes double-selling common: Ghana's Supreme Court has found the same parcel registered to 13 different sellers over 30 years, and selling one plot to multiple buyers can carry a 15-year prison sentence. A handful of paid verification services exist, but there's little free and self-serve to help an ordinary buyer do their *own* first-pass checks before paying a lawyer or surveyor. PlotGuard is that first line of defense — not a replacement for one.

## Features

- **Dashboard** — every property you're tracking, at a glance, plus the most recent community alerts.
- **My Properties** — log each plot you're considering (seller, price, GhanaPostGPS, documents, notes) and work through a **due-diligence checklist that adapts to the land type** (State / Stool·Skin / Family / Private title) — covering the real process: Lands Commission search, OASL concurrence for stool land, family-head *and* elders' consent for family land, boundary verification with a licensed surveyor, and legal review.
- **Community Alerts** — a crowd-sourced early-warning board where buyers can flag a seller or location as disputed, and others can confirm they've seen the same thing. Clearly disclaimed as unverified reports, not legal findings.
- **Resources & Glossary** — the official verification steps in plain language, a red-flags checklist, and a glossary of terms (indenture, stool land, caveat, OASL, and more).

Data is seeded with realistic example content so the app is usable immediately — none of it refers to real people or places.

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

## Disclaimer

PlotGuard is a self-help organizing tool. It does not replace a lawyer, a licensed surveyor, or an official search at the Lands Commission — always complete independent, professional verification before paying for land.
