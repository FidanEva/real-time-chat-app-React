import { FC, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { routesConfig } from './RoutesRegistry';
import { ROUTES } from './config';
import { AuthGuard } from '../guards/AuthGuard';
import LoadingSpinner from '../components/LoadingSpinner';
import { NavigationService } from '../services/navigationService';

export const Router: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    NavigationService.init(navigate);
  }, [navigate]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {routesConfig.map(({ path, component: Component, protected: isProtected, layout: Layout }) => {
          const RouteComponent = (
            <Layout>
              <Component />
            </Layout>
          );

          return (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <AuthGuard>{RouteComponent}</AuthGuard>
                ) : (
                  RouteComponent
                )
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to={ROUTES.ERROR.NOT_FOUND} replace />} />
      </Routes>
    </Suspense>
  );
};