export default function getToken() {
  let token = localStorage.getItem("token");
  return token;
}

export function expirationDuration() {
  let storedDate = localStorage.getItem("expiration");
  let futureDate = new Date(storedDate);
  let currentDate = new Date();
  let duration = futureDate.getTime() - currentDate.getTime();
  return duration;
}

export let TokenLoader = function () {
  let duration = expirationDuration();

  let token = getToken();

  if (!token) {
    return null;
  }
  if (duration < 0) {
    return "expired";
  }

  return token;
};
