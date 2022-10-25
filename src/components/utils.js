import * as config from "../config";

export async function getSpotifyToken() {
  // your application requests authorization
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://accounts.spotify.com/api/token");

  xhr.setRequestHeader(
    "Authorization",
    "Basic " +
      (config.client_id + ":" + config.client_secret).toString("base64")
  );
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = async () => {console.log(xhr.responseText); return xhr.responseText.json()};
  xhr.send({
    form: {
      grant_type: "client_credentials",
    },
    grant_type: "client_credentials",
  });
}
