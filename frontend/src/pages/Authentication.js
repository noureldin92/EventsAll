import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import getToken from "../util/getToken";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  let searchParams = new URL(request.url).searchParams;
  let param = searchParams.get("mode");
  let data = await request.formData();
  let credentials = {
    email: data.get("email"),
    password: data.get("password"),
    name: data.get("name"),
  };
  let response = await fetch(`http://localhost:8080/${param}`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "faild To Validate Credentials" }, { status: 500 });
  } else {
    if (param === "signup") {
      window.alert("Signed Up Successfully");
      const rr = await response.json();
      console.log(rr);
      return redirect("/");
    } else {
      let dataRecived = await response.json();
      console.log(dataRecived);
      let token = dataRecived.token;
      localStorage.setItem("token", token);

      let futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 1);
      localStorage.setItem("expiration", futureDate.toISOString());
    }

    return redirect("/");
  }
}

export function loader() {
  let token = getToken();
  if (token) {
    return redirect("/");
  }
  return null;
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// export async function action({ request }) {
//   let data = await request.formData();
//   let searchParams = new URL(request.url).searchParams;
//   let param = searchParams.get("mode");
//   let credentials = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };

//   let response = await fetch(`http://localhost:8080/${param}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(credentials),
//   });

//   if (response.status === 422) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({ message: "ERROR ON POSTING CREDENTIALS" }, { status: 500 });
//   }

//   let responseData = await response.json();
//   let token = responseData.token;

//   localStorage.setItem("token", token);

//   return redirect("/");
// }
