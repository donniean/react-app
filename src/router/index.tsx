import { createBrowserRouter } from 'react-router';

import { RouteError } from '@/features/route-error';
import { Root } from '@/pages/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RouteError />,
  },
]);

export { router };
