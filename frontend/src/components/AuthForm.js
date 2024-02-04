import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  let [params] = useSearchParams();
  let isLogin = params.get("mode") === "login";
  let { state } = useNavigation();
  let submitting = state === "submitting";
  let data = useActionData();

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
        <ul>
          {data &&
            data.errors &&
            Object.values(data.errors).map((err) => <li key={err}>{err}</li>)}
        </ul>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="" name="email" />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" />
        </p>
        <p>{data && data.message}</p>
        <div className={classes.actions}>
          <Link to={`/auth?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create New User" : "Login"}
          </Link>
          <button>{submitting ? "submitting" : "Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
