import { createBrowserRouter } from 'react-router';

import { RouteError } from '@/features/RouteError';
import { Root } from '@/pages/Root/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RouteError />,
  },
]);

export { router };
