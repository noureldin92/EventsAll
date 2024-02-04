import { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "../components/EventItem";

function EventDetailPage() {
  const { event } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}> Loading Details ... </p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    event: loadEvent(id),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  let token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}