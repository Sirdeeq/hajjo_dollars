import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout       from './components/Layout';
import Home         from './pages/Home';
import About        from './pages/About/index';
import CpaMarketing from './pages/CpaMarketing/index';
import Programs     from './pages/Programs/index';
import Results      from './pages/Results/index';
import Blog         from './pages/Blog/index';
import BlogDetail   from './pages/Blog/Detail';
import Contact      from './pages/Contact/index';
import Checkout     from './pages/Checkout/index';

// Auth & Dashboard
import Login          from './pages/Auth/Login';
import Register       from './pages/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary  from './components/ErrorBoundary';
import DashboardLayout from './layouts/DashboardLayout';
import Overview       from './pages/Dashboard/Overview';
import MyPrograms     from './pages/Dashboard/MyPrograms';
import Certificates   from './pages/Dashboard/Certificates';
import Notifications  from './pages/Dashboard/Notifications';
import Profile        from './pages/Dashboard/Profile';
import ProgramPlayer   from './pages/Dashboard/ProgramPlayer';
import Enrollment      from './pages/Dashboard/Enrollment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true,              element: <Home /> },
      { path: 'about',            element: <About /> },
      { path: 'cpa-marketing',    element: <CpaMarketing /> },
      { path: 'programs',         element: <Programs /> },
      { path: 'results',          element: <Results /> },
      { path: 'blog',             element: <Blog /> },
      { path: 'blog/:id',         element: <BlogDetail /> },
      { path: 'contact',          element: <Contact /> },
      { path: 'checkout',         element: <Checkout /> },
      { path: 'login',            element: <Login /> },
      { path: 'register',         element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    errorElement: <ErrorBoundary />,
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true,              element: <Overview /> },
      { path: 'programs',         element: <MyPrograms /> },
      { path: 'programs/:programId', element: <ProgramPlayer /> },
      { path: 'enroll/:programId', element: <Enrollment /> },
      { path: 'certificates',     element: <Certificates /> },
      { path: 'notifications',    element: <Notifications /> },
      { path: 'profile',          element: <Profile /> },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
