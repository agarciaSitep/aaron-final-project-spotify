import * as config from '../config';
import { Base64 } from 'js-base64';

export async function authorize(){
  let myHeaders = new Headers();
  myHeaders.append("Authorization", 'Basic ' + Base64.encode(config.client_id + ":" + config.client_secret));
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
  }
  
  let res = await fetch("https://accounts.spotify.com/api/token", requestOptions);
  res = await res.json();
  return res.access_token; 
}
