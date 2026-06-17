import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../../shared/layout/AppLayout';
import UsersPage from '../../features/users/pages/UsersPage';
import UserDetailPage from '../../features/users/pages/UserDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/users" replace />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'users/:id',
        element: <UserDetailPage />,
      },
      {
        path: '*',
        element: <Navigate to="/users" replace />,
      },
    ],
  },
]);

export default router;
