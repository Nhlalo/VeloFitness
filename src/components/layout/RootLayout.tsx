import { useLayoutEffect } from "react";
import { Outlet, useMatches, useLocation } from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function RootLayout() {
  const { pathname } = useLocation();

  const matches = useMatches();

  const routeHandles = matches.map((match) => match.handle).filter(Boolean);

  const mergedHandle = Object.assign({}, ...routeHandles);

  //Data is gotten from the route handle property
  const shouldHideHeader = mergedHandle?.header === "hidden";
  const shouldHideFooter = mergedHandle?.footer === "hidden";

  //This is to overcome the react default of scroll position persistence when navigating to another page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main>
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}
