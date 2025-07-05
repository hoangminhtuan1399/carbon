import { createBrowserRouter } from "react-router";
import { AuthPage } from "./AuthPage/AuthPage.jsx";
import { DashboardLayout } from "./DashboardLayout/DashboardLayout.jsx";
import { DashboardPage } from "./DashboardPage/DashboardPage.jsx";
import { ProfilePage } from "./ProfilePage/ProfilePage.jsx";
import { UsersPage } from "./UsersPage/UsersPage.jsx"
import { ProjectsPage } from "./ProjectsPage/ProjectsPage.jsx"
import { logoutLoader } from "./LogoutPage/logout-loader.js"

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
        path: '/projects',
        element: <ProjectsPage />
      },
      {
        path: '/users',
        element: <UsersPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/logout',
        loader: logoutLoader
      },
      {
        path: '/*',
        element: <ProfilePage />
      }
    ]
  }
])

export default router;
