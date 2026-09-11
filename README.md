<div align="center">

# 🛡️ PlotGuard Ghana

### Know before you pay.

*A free due diligence companion for anyone buying land in Ghana*

[![React](https://img.shields.io/badge/React-18-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Local first](https://img.shields.io/badge/Data-Local%20first-C1663A?style=for-the-badge)](#data-and-privacy)
[![License: MIT](https://img.shields.io/badge/License-MIT-1F4E3D?style=for-the-badge)](LICENSE)

<br/>

[**⭐ Star this repo**](https://github.com/ABIGAILDEBBY/PlotGuard-Ghana) &nbsp;·&nbsp; [**🐛 Report an issue**](https://github.com/ABIGAILDEBBY/PlotGuard-Ghana/issues) &nbsp;·&nbsp; [**⚠️ Read the disclaimer**](#disclaimer)

</div>

---

## Why this exists

Ghana's land system mixes state, stool, skin, family, and private title, often overlapping and poorly documented. That gap makes double selling common. Ghana's Supreme Court has found a single 50 acre parcel registered to 13 different sellers across 30 years, and selling one plot to multiple buyers now carries [up to 15 years in prison](https://www.newsghana.com.gh/selling-land-twice-can-cost-fifteen-years-in-prison/) under the Land Act, 2020 (Act 1036). That penalty exists because the practice is common enough to legislate against directly.

A few paid verification services have started to appear, but there is very little that is free and self serve to help an ordinary buyer run their own first pass checks before paying a lawyer or a surveyor. Diaspora buyers are especially exposed since they often cannot inspect a plot themselves.

PlotGuard is that first pass. It organizes the checks you should run, tracks every plot you are considering in one place, and surfaces warnings other buyers have already raised, all before you commit any money.

It is not a law firm, a licensed surveyor, or the Lands Commission. See the [disclaimer](#disclaimer).

---

## Quick setup

> **Total time: under 2 minutes**

```bash
# 1. Clone the repo
git clone https://github.com/ABIGAILDEBBY/PlotGuard-Ghana.git
cd PlotGuard-Ghana

# 2. Install and run
npm install
npm run dev
```

Open the local URL Vite prints in your terminal. The app loads with realistic example data so every screen is usable right away; clear it out and add your own properties whenever you are ready.

To ship a production build instead:

```bash
npm run build
npm run preview
```

No account, no API key, and no backend to configure. Everything runs in your browser.

---

## Features

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>What it does</th>
      <th>Why it matters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Dashboard</strong></td>
      <td>Every property you are tracking at a glance, plus the community alerts most relevant to your saved regions</td>
      <td>One screen instead of scattered WhatsApp chats and screenshots</td>
    </tr>
    <tr>
      <td><strong>My Properties</strong></td>
      <td>Log each plot (seller, price, GhanaPostGPS, notes) and work through a checklist that adapts to the land type</td>
      <td>State, stool/skin, family, and private title each require different proof; the checklist reflects that</td>
    </tr>
    <tr>
      <td><strong>Community Alerts</strong></td>
      <td>Flag a seller or location as disputed, and confirm reports other buyers have already made</td>
      <td>Clearly labeled as unverified reports, not legal findings; a reason to dig deeper, never proof on its own</td>
    </tr>
    <tr>
      <td><strong>Resources &amp; Glossary</strong></td>
      <td>Plain language guidance, a red flags list, and definitions for terms like indenture, caveat, and OASL</td>
      <td>You should not need a law degree to understand what you are being asked to sign</td>
    </tr>
  </tbody>
</table>

---

## How it works

```text
For every plot you are considering:

1. Log the property      Nickname, region, seller, price, land type, GhanaPostGPS
                          takes under a minute, and nothing gets lost between conversations

2. Work the checklist     Steps adapt automatically to State, Stool/Skin, Family, or Private title
                          covers the Lands Commission search, consent, and surveyor verification

3. Check community alerts Search the region and seller before you go further
                          unverified, but a strong reason to slow down if something matches

4. Get professional review  A lawyer and a licensed surveyor, before any money changes hands
                          PlotGuard organizes your case; it does not replace their sign off
```

> The most common mistake is skipping straight to a deposit because a plot "feels right." A clean feeling is not a clean title.

---

## Folder structure

```
PlotGuard-Ghana/
│
├── src/
│   ├── App.tsx                    entry component and view routing
│   ├── main.tsx                   React root
│   ├── types.ts                   shared types: PropertyCase, CommunityAlert, land types
│   ├── index.css                  theme tokens: palette, typography
│   │
│   ├── components/
│   │   ├── Sidebar.tsx            navigation, responsive mobile drawer, export/import
│   │   ├── Dashboard.tsx          overview of properties and relevant alerts
│   │   ├── Properties.tsx         property list and due diligence detail panel
│   │   ├── PropertyModal.tsx      add/edit a property
│   │   ├── CommunityAlerts.tsx    the alert board and report form
│   │   ├── Resources.tsx          official steps, red flags, glossary
│   │   └── ui.tsx                 shared Modal, Badge, and SectionCard
│   │
│   ├── lib/
│   │   ├── store.tsx              app state and all read/write operations
│   │   ├── storage.ts             localStorage persistence
│   │   └── helpers.ts             checklist generator, red flags, glossary content
│   │
│   └── data/
│       └── seed.ts                example properties and alerts (no real people or places)
│
├── LICENSE
└── README.md
```

---

## Data and privacy

Everything lives in your browser's `localStorage`. Nothing is sent to a server, and there is no account to create. Use the **Export data** and **Import data** buttons in the sidebar to back your data up or move it to another browser.

Community Alerts you submit are saved only on your device; they are not automatically shared with other users. To pool reports with family or a trusted group, export your data and have them import it.

---

## Who this is for

- Land buyers in Ghana who want a structured record instead of scattered notes and screenshots
- Diaspora buyers sending money home for land who cannot inspect a plot themselves
- Families or small groups who want to pool what they have each found on a seller or an area
- Anyone who wants to understand the real verification process before calling a lawyer

---

## Disclaimer

PlotGuard is a self help organizing tool, not legal advice. It does not replace a lawyer, a licensed surveyor, or an official search at the Lands Commission. Community Alerts are unverified, user submitted reports, not legal findings or proof of fraud. Always complete independent, professional verification before paying for land.

---

## Contributing

Issues and pull requests are welcome. If you know the land verification process better than the checklist currently reflects, that is exactly the kind of correction this project needs. Keep changes focused, and run `npm run build` before submitting.

---

## License

Released under the [MIT License](LICENSE). Use it, adapt it, and ship it for your own market if land fraud is a problem where you are too.

---

<div align="center">

*A research backed answer to one question:*
*what would actually help someone about to lose their savings to a fake title?*

<br/>

Made by [Abigail Woolley](https://github.com/ABIGAILDEBBY)

</div>
