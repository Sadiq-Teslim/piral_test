import * as React from 'react';
import { Link } from 'react-router-dom';
// The PiletApi type is provided by your app shell, 'react-piral-int'
import type { PiletApi } from 'react-piral-int';

import './index.css';
// Lazy-load the dashboard page for better performance (Bonus Requirement)
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));

export function setup(app: PiletApi) {
  // 1. Register the route accessible at /dashboard (Requirement #1)
  // We use React.lazy to code-split and only load this page when needed.
  app.registerPage('/dashboard', DashboardPage);

  // 2. Register a menu item labeled "Dashboard" (Requirement #1)
  app.registerMenu(() => (
    <Link to="/dashboard" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
      Dashboard
    </Link>
  ));

  // 3. Inject Tailwind CSS for development
  // This ensures our styling works when debugging the pilet.
  // In a real production setup, the Piral instance (app shell)
  // would be responsible for providing Tailwind.
  // Append the Tailwind CDN script directly to the document to avoid using non-existent PiletApi methods.
  if (typeof document !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.async = true;
    document.head.appendChild(script);
  }
}

