import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { expirationDuration } from "../util/getToken";

function RootLayout() {
  let token = useLoaderData();
  let submit = useSubmit();
  useEffect(() => {
    if (token === "expired") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }
    let tokenDuration = expirationDuration();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
