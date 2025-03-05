import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../routes/config';
import { useAuth } from '../hooks/useAuth';
export const AuthGuard: FC<{children: ReactNode}> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }


  return <>{children}</>;
};