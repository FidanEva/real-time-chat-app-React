import { lazy } from 'react';
import { ROUTES } from '../routes/config';
import { MainLayout } from '../components/MainLayout';
import { AuthLayout } from '../components/AuthLayout';

const Welcome = lazy(() => import('../components/Welcome'));
const ChatBox = lazy(() => import('../components/ChatBox'));

export const routesConfig = [
  {
    path: ROUTES.HOME,
    component: Welcome,
    layout: AuthLayout,
  },
  {
    path: ROUTES.CHAT,
    component: ChatBox,
    protected: true,
    layout: MainLayout,
  },
  {
    path: ROUTES.AUTH.LOGIN,
    component: Welcome,
    layout: AuthLayout,
  },
];