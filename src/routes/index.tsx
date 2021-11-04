import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import Home from '@/pages/Home/index';
import NotFound from '@/pages/NotFound/index';

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}
export default Routes;
