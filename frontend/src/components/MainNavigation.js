import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";

function MainNavigation() {
  let isLoggedIn = useRouteLoaderData("tokenData");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }>
              Newsletter
            </NavLink>
          </li>

          {!isLoggedIn ? (
            <li>
              <NavLink
                to="/auth?mode=signup"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }>
                Authentication
              </NavLink>
            </li>
          ) : (
            <Form action="logout" method="POST">
              <button>Logout</button>
            </Form>
          )}
          <li></li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
