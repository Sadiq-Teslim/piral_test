# Turog Technical Assessment - Dashboard Pilet

This repository contains my implementation of the Senior React Developer technical assessment for Turog. The solution demonstrates a microfrontend dashboard using Piral, implementing modern React practices, component architecture, and efficient state management.

## Project Overview

The repository is structured into two main components:

- `my-pilet/` - The primary dashboard implementation containing components, hooks, and layouts
- `react-piral-int/` - The Piral development shell for testing and debugging

For detailed implementation documentation, refer to [`my-pilet/README.md`](my-pilet/README.md).

---

## Technical Implementation

The solution implements all required features from the assessment:

1. **Piral Integration**
   - Registered route at `/dashboard`
   - Implemented Dashboard menu item
   - Proper pilet lifecycle management

2. **Data Management**
   - Integrated with JSONPlaceholder API
   - Implemented paginated data display (10 items per page)
   - Modal-based detail view implementation
   - Optimistic updates for new item creation

3. **Component Architecture**
   - Reusable component library including ItemCard and Modal
   - TypeScript implementation for type safety
   - Modern React patterns with hooks and functional components

4. **UI/UX Features**
   - Clean, professional interface using Tailwind CSS
   - Responsive design across device sizes
   - Optimized performance with lazy loading
   - Proper loading states and error handling

---

## Project Structure

The project follows a modular architecture:

```text
my-pilet/
  src/
    components/     # Reusable UI components (ItemCard, Modal, Pagination)
    hooks/         # Custom hooks for data fetching and state management
    pages/         # Route components and page layouts
    index.tsx      # Pilet entry point and Piral integration
react-piral-int/   # Development shell for testing and debugging
```

Note: Any modifications to the shell configuration in `react-piral-int` require rebuilding to update the emulator tarball.

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
