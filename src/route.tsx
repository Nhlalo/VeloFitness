import { createBrowserRouter } from "react-router";
import { homeColors } from "./data/constants/colors";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/home/Home";
import ProtectedRoute from "./components/shared/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: {
          colors: { ...homeColors },
        },
      },
      {
        path: "clubs",
        lazy: async () => {
          const module = await import("./pages/clubs/Clubs.tsx");
          return { Component: module.default };
        },
        handle: {
          colors: { ...homeColors },
        },
      },
      {
        path: "clubs/:country",
        lazy: async () => {
          const module = await import("./pages/clubs/CountryClubs.tsx");
          return { Component: module.default };
        },
        handle: {
          colors: { ...homeColors },
        },
      },

      {
        path: "classes",
        lazy: async () => {
          const module = await import("./pages/classes/Classes.tsx");
          return { Component: module.default };
        },
        handle: {
          colors: { ...homeColors },
        },
      },
      {
        path: "membership",
        lazy: async () => {
          const module = await import("./pages/membership/Membership.tsx");
          return { Component: module.default };
        },
        handle: {
          colors: { ...homeColors },
        },
      },
      {
        path: "jointoday",
        lazy: async () => {
          const module = await import("./pages/jointoday/JoinToday.tsx");
          return { Component: module.default };
        },
        handle: {
          header: "hidden",
          footer: "hidden",
        },
      },
      {
        path: "set-password",
        lazy: async () => {
          const module = await import("./pages/setpassword/SetPassword.tsx");
          return { Component: module.default };
        },
        handle: {
          header: "hidden",
          footer: "hidden",
        },
      },
      {
        path: "signin",
        lazy: async () => {
          const module = await import("./pages/signin/SignIn.tsx");
          return { Component: module.default };
        },
        handle: {
          header: "hidden",
          footer: "hidden",
        },
      },
      {
        path: "password-message",
        lazy: async () => {
          const module =
            await import("./pages/passwordmessage/PasswordMessage.tsx");
          return { Component: module.default };
        },
        handle: {
          header: "hidden",
          footer: "hidden",
        },
      },
      {
        path: "profile",
        lazy: async () => {
          const module = await import("./pages/dashboard/Dashboard.tsx");
          return {
            Component: () => (
              <ProtectedRoute redirectTo="/signin">
                <module.default />
              </ProtectedRoute>
            ),
          };
        },
        handle: {
          header: "hidden",
          footer: "hidden",
        },
      },
      {
        path: "mymembership",
        lazy: async () => {
          const module =
            await import("./pages/dashboard/membershiphub/MembershipHub.tsx");
          return {
            Component: () => (
              <ProtectedRoute redirectTo="/signin">
                <module.default />
              </ProtectedRoute>
            ),
          };
        },
        handle: {
          header: "hidden",
          footer: "hidden",
        },
      },
    ],
  },
]);

export { router };
