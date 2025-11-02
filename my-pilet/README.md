# Dashboard Pilet

A polished microfrontend (pilet) for the Piral framework that showcases a Nigerian-inspired content dashboard. It is implemented with React 18 and TypeScript, integrates with the local Piral shell in `react-piral-int`, and can be published to any Piral feed service.

---

## Highlights

- **Latest spotlight hero** that elevates the most recent story with contextual stats and calls to action.
- **Paginated catalog** (10 items per page) with animated skeletons during page transitions.
- **Optimistic creation flow** powered by a responsive modal and instant state updates.
- **Reusable UI kit** (`ItemCard`, `Modal`, `Pagination`) designed to stay host-agnostic.
- **Resilient data layer:** `usePosts` fetches live content from `jsonplaceholder.typicode.com`, themes it with Naija copy, and falls back to curated data when offline.
- **Dark, Tailwind-inspired aesthetic** with gradients, blur effects, and accessible focus states.

---

## Prerequisites

- Node.js 18 (or the latest LTS release)
- npm 7+ (bundled with recent Node LTS versions) or yarn
- Piral CLI `piral-cli@1.9.0` installed globally for convenience:

  ```bash
  npm install -g piral-cli@1.9.0
  ```

---

## Quick Start

1. Clone the repository and switch to the pilet directory:

   ```bash
   git clone https://github.com/Sadiq-Teslim/turog_test.git
   cd turog_test/my-pilet
   ```

2. Install dependencies (links the local Piral emulator tarball):

   ```bash
   npm install
   ```

3. Launch the debug experience:

   ```bash
   npm run debug
   ```

   The Piral CLI starts the emulator at [http://localhost:1234](http://localhost:1234) with a **Dashboard** menu entry.

---

## Scripts

- `npm run debug` / `npm start` – serve the pilet inside the Piral debug shell with live reloading.
- `npm run build` – produce a versioned `.tgz` bundle inside `dist/` ready for publication to a feed.
- `npm run upgrade` – apply Piral CLI scaffolding updates when upgrading the tooling.
- `npm run postinstall` (auto) – generates type declarations through `pilet declaration`.

The companion shell `react-piral-int` exposes identical `debug` and `build` scripts should you need to evolve the emulator.

---

## Project Structure

```text
my-pilet/
  src/
    components/     # Reusable UI building blocks (ItemCard, Modal, Pagination)
    hooks/          # Data + business logic (usePosts)
    pages/          # Piral-registered pages (DashboardPage)
    index.tsx       # Piral integration, route + menu registration, Tailwind injection
  pilet.json        # Pilet metadata and host shell configuration
react-piral-int/    # Local Piral app shell used for debugging this pilet
```

---

## Architecture & Key Modules

- **`src/index.tsx`** registers the `/dashboard` route and menu entry, lazy-loads the page for bundle efficiency, and injects Tailwind via CDN during development.
- **`src/pages/DashboardPage.tsx`** orchestrates the dashboard layout, latest-post hero, pagination flow, and modal interactions.
- **`src/hooks/usePosts.ts`** centralizes data fetching, fallbacks, optimistic `addPost`, and error handling through a reducer.
- **`src/components/Modal.tsx`** offers a responsive modal with backdrop dismissal, metadata slots, optional footers, and viewport-safe scrolling.
- **`src/components/Pagination.tsx`** renders accessible pagination controls and supports shimmer placeholders during transitions.

This separation keeps UI, state management, and Piral wiring isolated for easier testing and maintenance.

---

## Design Notes

- **Data lifecycle:** `usePosts` uses `fetch`, guarded cleanup, and themed transformations before returning content. A curated fallback list maintains the experience offline.
- **Accessibility:** Buttons include focus states, aria labels, and screen-reader hints to keep interactions inclusive.
- **Styling:** Tailwind utility classes deliver gradients, blur, and depth; the modal enforces viewport-safe scrolling, and pagination shimmers maintain perceived performance.
- **Lazy loading:** The dashboard page is registered via `React.lazy`, so the code only loads when the route is visited.

---

## Configuration Notes

- `pilet.json` targets schema `v2`, inherits dependencies from the selected shell, and emits remote type declarations into `src/remote.d.ts`.
- `package.json` depends on the emulator tarball from `../react-piral-int/dist/emulator`. Rebuild the shell if you modify it:

  ```bash
  cd ../react-piral-int
  npm install
  npm run build
  cd ../my-pilet
  npm install
  ```

- Tailwind styles are injected at runtime via CDN for local development. Production Piral shells should ship a stable stylesheet or integrate Tailwind directly.

---

## Production Build

```bash
npm run build
```

The command emits a tarball such as `my-pilet-1.0.0.tgz` in `dist/`. Publish this artifact to your Piral feed service or import it into another Piral instance.

---

## Troubleshooting

- **Styles missing in production:** Ensure the consuming app shell provides the required Tailwind (or equivalent) styles; the CDN script is a development convenience only.
- **Missing emulator tarball:** Rebuild `react-piral-int` so the `dist/emulator` directory contains the package referenced in `devDependencies`.
- **API failures:** When `fetch` to `jsonplaceholder.typicode.com` fails, the UI falls back to curated Nigerian stories and displays an inline alert. Verify connectivity if you expect live data.

---

## License

This project builds on the take-home assignment assets provided to the author. No additional license has been declared.# Dashboard Pilet

A polished microfrontend (pilet) for the Piral framework that showcases a Nigerian-inspired content dashboard. It is implemented with React 18 and TypeScript, integrates with the local Piral shell in `react-piral-int`, and can be published to any Piral feed service.

---

## Highlights

- **Latest spotlight hero** that elevates the most recent story with contextual stats and calls to action.
- **Paginated catalog** (10 items per page) with animated skeletons during page transitions.
- **Optimistic creation flow** powered by a responsive modal and instant state updates.
- **Reusable UI kit** (`ItemCard`, `Modal`, `Pagination`) designed to stay host-agnostic.
- **Resilient data layer:** `usePosts` fetches live content from `jsonplaceholder.typicode.com`, themes it with Naija copy, and falls back to curated data when offline.
- **Dark, Tailwind-inspired aesthetic** with gradients, blur effects, and accessible focus states.

---

## Prerequisites

- Node.js 18 (or the latest LTS release)
- npm 7+ (bundled with recent Node LTS versions) or yarn
- Piral CLI `piral-cli@1.9.0` installed globally for convenience:

	```bash
	npm install -g piral-cli@1.9.0
	```

---

## Quick Start

1. Clone the repository and switch to the pilet directory:

	```bash
	git clone https://github.com/Sadiq-Teslim/turog_test.git
	cd turog_test/my-pilet
	```

2. Install dependencies (links the local Piral emulator tarball):

	```bash
	npm install
	```

3. Launch the debug experience:

	```bash
	npm run debug
	```

	The Piral CLI starts the emulator at [http://localhost:1234](http://localhost:1234) with a **Dashboard** menu entry.

---

## Scripts

- `npm run debug` / `npm start` – serve the pilet inside the Piral debug shell with live reloading.
- `npm run build` – produce a versioned `.tgz` bundle inside `dist/` ready for publication to a feed.
- `npm run upgrade` – apply Piral CLI scaffolding updates when upgrading the tooling.
- `npm run postinstall` (auto) – generates type declarations through `pilet declaration`.

The companion shell `react-piral-int` exposes identical `debug` and `build` scripts should you need to evolve the emulator.

---

## Project Structure

```text
my-pilet/
  src/
	components/     # Reusable UI building blocks (ItemCard, Modal, Pagination)
	hooks/          # Data + business logic (usePosts)
	pages/          # Piral-registered pages (DashboardPage)
	index.tsx       # Piral integration, route + menu registration, Tailwind injection
  pilet.json        # Pilet metadata and host shell configuration
react-piral-int/    # Local Piral app shell used for debugging this pilet
```

---

## Architecture & Key Modules

- **`src/index.tsx`** registers the `/dashboard` route and menu entry, lazy-loads the page for bundle efficiency, and injects Tailwind via CDN during development.
- **`src/pages/DashboardPage.tsx`** orchestrates the dashboard layout, latest-post hero, pagination flow, and modal interactions.
- **`src/hooks/usePosts.ts`** centralizes data fetching, fallbacks, optimistic `addPost`, and error handling through a reducer.
- **`src/components/Modal.tsx`** offers a responsive modal with backdrop dismissal, metadata slots, optional footers, and viewport-safe scrolling.
- **`src/components/Pagination.tsx`** renders accessible pagination controls and supports shimmer placeholders during transitions.

This separation keeps UI, state management, and Piral wiring isolated for easier testing and maintenance.

---

## Design Notes

- **Data lifecycle:** `usePosts` uses `fetch`, guarded cleanup, and themed transformations before returning content. A curated fallback list maintains the experience offline.
- **Accessibility:** Buttons include focus states, aria labels, and screen-reader hints to keep interactions inclusive.
- **Styling:** Tailwind utility classes deliver gradients, blur, and depth; the modal enforces viewport-safe scrolling, and pagination shimmers maintain perceived performance.
- **Lazy loading:** The dashboard page is registered via `React.lazy`, so the code only loads when the route is visited.

---

## Configuration Notes

- `pilet.json` targets schema `v2`, inherits dependencies from the selected shell, and emits remote type declarations into `src/remote.d.ts`.
- `package.json` depends on the emulator tarball from `../react-piral-int/dist/emulator`. Rebuild the shell if you modify it:

	```bash
	cd ../react-piral-int
	npm install
	npm run build
	cd ../my-pilet
	npm install
	```

- Tailwind styles are injected at runtime via CDN for local development. Production Piral shells should ship a stable stylesheet or integrate Tailwind directly.

---

## Production Build

```bash
npm run build
```

The command emits a tarball such as `my-pilet-1.0.0.tgz` in `dist/`. Publish this artifact to your Piral feed service or import it into another Piral instance.

---

## Troubleshooting

- **Styles missing in production:** Ensure the consuming app shell provides the required Tailwind (or equivalent) styles; the CDN script is a development convenience only.
- **Missing emulator tarball:** Rebuild `react-piral-int` so the `dist/emulator` directory contains the package referenced in `devDependencies`.
- **API failures:** When `fetch` to `jsonplaceholder.typicode.com` fails,,PS C:\piral-project> git commit -m "Fix sub-folder issues"
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
PS C:\piral-project> git push   
Everything up-to-date
PS C:\piral-project> git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
PS C:\piral-project> git add .
PS C:\piral-project> git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, worki the UI falls back to curated Nigerian stories and displays an inline alert. Verify connectivity if you expect live data.

---

## License

This project builds on the take-home assignment assets provided to the author. No additional license has been declared.
