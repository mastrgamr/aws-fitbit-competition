import { peerSocket } from "messaging";

// http://34.217.69.68:4040
// https://us-central1-tokyo-flames-94521.cloudfunctions.net/function-1

console.log("Companion Started");

peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
  console.log("EVENT ONMESSAGE: " + event)
  
  // Fetch the image from the internet
  fetch("https://us-central1-tokyo-flames-94521.cloudfunctions.net/function-1?steps="+evt.data.steps)
    .then((res) => {
    console.log('Hello: ', res);
    return res.json();
  }).catch((error) => {
    // Log the error
    console.log("Failure: " + error);
  });
}
