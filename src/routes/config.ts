import { FC } from 'react';

interface RouteConfig {
  path: string;
  component: FC;
  protected?: boolean;
  layout?: FC;
  children?: RouteConfig[];
}

// Define route paths as constants
export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  // PROFILE: '/profile',
  // SETTINGS: '/settings',
  AUTH: {
    LOGIN: '/auth/login',
    //REGISTER: '/auth/register',
  },
  ERROR: {
    NOT_FOUND: '/404',
    UNAUTHORIZED: '/401',
  },
} as const;