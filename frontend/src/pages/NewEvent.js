import { redirect } from "react-router-dom";
import EventForm from "../components/EventForm";
import getToken from "../util/getToken";

function NewEventPage() {
  return <EventForm method="post" />;
}

export default NewEventPage;

export function loader() {
  let token = getToken();

  if (!token) {
    return redirect("/");
  }
  return null;
}
