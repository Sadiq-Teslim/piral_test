import * as React from 'react';
import { Link } from 'react-router-dom';
import type { PiletApi } from 'react-piral-int';
import './index.css';

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));

export function setup(app: PiletApi) {
  app.registerPage('/dashboard', DashboardPage);

  app.registerMenu(() => (
    <Link to="/dashboard" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
      Dashboard
    </Link>
  ));

  if (typeof document !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.async = true;
    document.head.appendChild(script);
  }
}
