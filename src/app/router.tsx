import { createBrowserRouter } from 'react-router';

import { RouteError } from '@/components/errors';
import { Root } from '@/routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RouteError />,
  },
]);

export { router };
