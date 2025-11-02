import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createInstance, Piral, createStandardApi } from 'piral';
import { layout, errors } from './layout';

// We have removed the `feedUrl` and `requestPilets` function.
// The Piral CLI will now inject a development loader automatically.

const instance = createInstance({
  state: {
    components: layout,
    errorComponents: errors,
  },
  plugins: [...createStandardApi()],
});

const root = createRoot(document.querySelector('#app'));

root.render(<Piral instance={instance} />);
