import { FC } from 'react';

interface RouteConfig {
  path: string;
  component: FC;
  protected?: boolean;
  layout?: FC;
  children?: RouteConfig[];
}

export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  // PROFILE: '/profile',
  // SETTINGS: '/settings',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
  ERROR: {
    NOT_FOUND: '/404',
    UNAUTHORIZED: '/401',
  },
} as const;