import { createBrowserRouter } from "react-router";
import { homeColors } from "./data/constants/colors";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/home/Home";

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
    ],
  },
]);

export { router };
