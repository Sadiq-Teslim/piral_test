# Turog Dashboard Experience

This repository contains:

- `my-pilet/` – the feature-rich Piral pilet that implements the Nigerian content dashboard.
- `react-piral-int/` – the lightweight Piral app shell used to emulate the host environment during development.

The pilet-specific documentation lives in [`my-pilet/README.md`](my-pilet/README.md). The sections below describe how both folders work together for local development, review, and deployment.

---

## At a Glance

- **Architecture:** React 18 + TypeScript pilet plugged into a Piral shell.
- **Experience:** Latest-post hero, paginated archive, responsive modals, optimistic creation flow, tailored Naija copywriting.
- **Styling:** Tailwind utility classes delivered via CDN in debug mode; host shell supplies the dark chrome.
- **Data:** Live fetch from `jsonplaceholder.typicode.com` with curated fallbacks and loading skeletons.

For deeper UI and component details, read [`my-pilet/README.md`](my-pilet/README.md).

---

## Repository Layout

```text
my-pilet/           # Primary pilet (dashboard UI, hooks, reusable components)
react-piral-int/    # Development shell that serves and bundles the pilet
```

The pilet’s `package.json` references the emulator tarball produced by `react-piral-int/dist/emulator`. Rebuild the shell whenever you change host styling or layout so the pilet inherits fresh assets.

---

## Prerequisites

- Node.js 18 (latest LTS recommended)
- npm 7 or newer (bundled with Node LTS) or yarn
- Piral CLI 1.9:

```bash
npm install -g piral-cli@1.9.0
```

---

## Quick Start (Full Workspace)

```bash
git clone https://github.com/Sadiq-Teslim/turog_test.git
cd turog_test

# Install and build the host shell first so the emulator tarball exists
cd react-piral-int
npm install
npm run build

# Return to the pilet and start the debug shell
cd ../my-pilet
npm install
npm run debug
```

Piral opens [http://localhost:1234/dashboard](http://localhost:1234/dashboard) (also accessible via the **Dashboard** menu link) and loads the pilet lazily.

---

## Common Tasks

| Task | Command |
|------|---------|
| Serve in debug shell | `npm run debug` inside `my-pilet/` |
| Build production pilet bundle | `npm run build` inside `my-pilet/` |
| Rebuild emulator tarball | `npm run build` inside `react-piral-int/` |
| Clean install both projects | `npm install` in each folder |

See [`my-pilet/README.md`](my-pilet/README.md) for feature notes, architecture breakdown, troubleshooting tips, and screenshots of the dashboard experience.

---

## Deployment Notes

- `npm run build` inside `my-pilet/` outputs `dist/my-pilet-<version>.tgz`, ready for upload to a Piral feed.
- Ensure the production host shell provides Tailwind (or equivalent) styling; the repo uses CDN injection strictly for local debugging.
- The host shell changes in `react-piral-int/src/layout.tsx` implement the minimalist dark chrome seen in the prototype—include them if you replicate this environment.

---

## License

Based on the turog take-home assignment provided to the author. No additional license has been declared.
