import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  Error,
  Landing,
  Login,
  Profile,
  Register,
  SiteLayout,
  EditJob,
  Stats,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      { path: "login", element: <Login />, action: loginAction },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddJob />, action: addJobAction },
          { path: "stats", element: <Stats /> },
          { path: "all-jobs", element: <AllJobs />, loader: allJobsLoader },
          { path: "profile", element: <Profile /> },
          { path: "admin", element: <Admin /> },
          { path: "edit-job/:id", element: <EditJob />, loader: editJobLoader },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
