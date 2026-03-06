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
    ],
  },
]);

export { router };
