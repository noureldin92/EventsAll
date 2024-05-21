import { json, redirect } from "react-router-dom";
import PageContent from "../components/PageContent";

function NewsletterPage() {
  return <PageContent title="Join our awesome newsletter!"></PageContent>;
}

export default NewsletterPage;

export async function action({ request }) {
  let searchParams = new URL(request.url).searchParams;
  let param = searchParams.get("mode");
  const data = await request.formData();
  const myData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  let response = await fetch(`https://eventsback.onrender.com/${param}`, {
    method: request.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(myData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "faild To Validate Credentials" }, { status: 500 });
  } else {
    if (param === "signup") {
      window.alert("Signed Up Successfully");
      window.location.href = "/";
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
