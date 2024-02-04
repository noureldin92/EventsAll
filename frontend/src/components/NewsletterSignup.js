import {
  Link,
  useFetcher,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  let [param] = useSearchParams();

  let isLogin = param.get("mode") === "login";

  const { Form, data, state } = useFetcher();
  let token = useRouteLoaderData("tokenData");

  let submitting = state === "submitting";

  return (
    <>
      {!token && (
        <main className={classes.main}>
          <Form
            method="POST"
            action={
              `/newsletter?mode=${isLogin ? "login" : "signup"}` ||
              "/newsletter?mode=login"
            }
            className={classes.newsletter}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email..."
              aria-label="Sign up for newsletter"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password..."
              aria-label="Sign up for newsletter"
            />
            <button>{submitting ? "submitting. . . " : "submit"}</button>
            <Link to={`/newsletter?mode=${isLogin ? "signup" : "login"}`}>
              {isLogin ? "Create new account" : "Have an account"}
            </Link>
            <ul>
              {data &&
                data.errors &&
                Object.values(data.errors).map((err) => (
                  <li key={err}>{err}</li>
                ))}
            </ul>
            {data && data.message && <p>{data.message}</p>}
          </Form>
        </main>
      )}
    </>
  );
}

export default NewsletterSignup;
