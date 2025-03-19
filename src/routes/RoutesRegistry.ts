import { lazy } from 'react';
import { ROUTES } from '../routes/config';
import { MainLayout } from '../components/MainLayout';
import { AuthLayout } from '../components/AuthLayout';

const Welcome = lazy(() => import('../components/Welcome'));
const ChatBox = lazy(() => import('../components/ChatBox'));
const LogIn = lazy(() => import('../components/LogIn'));
const SignUp = lazy(() => import('../components/SignUp'));

export const routesConfig = [
  {
    path: ROUTES.HOME,
    component: LogIn,
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
    component: LogIn,
    layout: AuthLayout,
  },
  {
    path: ROUTES.AUTH.SIGNUP,
    component: SignUp,
    layout: AuthLayout,
  },
];