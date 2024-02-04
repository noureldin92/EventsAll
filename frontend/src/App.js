import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage, { loader as lockLoader } from "./pages/NewEvent";
// import EventDetailPage, { action, loader } from "./pages/EventDetail";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import Authentication, {
  loader as authLockLoader,
  action as loginAction,
} from "./pages/Authentication";
import { action as logOutAction } from "./pages/Logout";
import { TokenLoader } from "./util/getToken";
import { Suspense, lazy } from "react";
let EventDetailPage = lazy(() => import("./pages/EventDetail"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: TokenLoader,
    id: "tokenData",
    children: [ 
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <Authentication />,
        action: loginAction,
        loader: authLockLoader,
      },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: (meta) =>
              import("./pages/EventDetail").then((e) => e.loader(meta)),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<p>lololololo</p>}>
                    <EventDetailPage />
                  </Suspense>
                ),

                action: (meta) =>
                  import("./pages/EventDetail").then((e) => e.action(meta)),
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: lockLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: lockLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      { path: "/logout", action: logOutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
