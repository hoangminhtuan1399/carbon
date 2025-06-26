import { createBrowserRouter } from "react-router";
import { AuthPage } from "./AuthPage/AuthPage.jsx";
import { DashboardLayout } from "./DashboardLayout/DashboardLayout.jsx";
import { DashboardPage } from "./DashboardPage/DashboardPage.jsx";
import { ProfilePage } from "./ProfilePage/ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  }
])

export default router;
