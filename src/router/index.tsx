import { createBrowserRouter } from 'react-router-dom';
import { RouteError } from 'src/features/RouteError';

import { Root } from '@/pages/Root/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RouteError />,
  },
]);

export { router };
