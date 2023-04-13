import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import HomePage from 'src/pages';
import Error401Page from 'src/pages/401';
import Error404Page from 'src/pages/404';
import Error500Page from 'src/pages/500';
import ContactPage from 'src/pages/contact';
import CheckoutPage from 'src/pages/checkout';

import PrivacyPage from 'src/pages/legal/privacy';
import TermsPage from 'src/pages/legal/terms';

import FeaturesPage from 'src/pages/features';
import PricingPage from 'src/pages/pricing';
import { authRoutes } from './auth';
import { authDemoRoutes } from './auth-demo';
import { componentsRoutes } from './components';
import { dashboardRoutes } from './dashboard';


import { Layout as DashboardLayout } from 'src/layouts/dashboard';

const IndexPage = lazy(() => import('src/pages/dashboard/index'));
const UploadPage = lazy(() => import('src/pages/upload/index'));
const AnalyticsPage = lazy(() => import('src/pages/analytics/index'));

export const routes = [
  {
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <IndexPage />
      },
      {
        path: 'upload',
        element: <UploadPage />
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />
      }
    ]
  }
];
