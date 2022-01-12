import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}
export default Routes;
