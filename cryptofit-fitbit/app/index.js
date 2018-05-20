import document from "document";
import { peerSocket } from "messaging";
import { geolocation } from "geolocation";
import { today } from "user-activity";

let titleScreen = document.getElementById("titleTxt");
let laterBtn = document.getElementById("btnLeft");
let startBtn = document.getElementById("btnRight");
let adidasLaterBtn = document.getElementById("adidasBtnLeft");
let adidasStartBtn = document.getElementById("adidasBtnRight");
let popupPrompt = document.getElementById("my-popup");
let adidas5KPopup = document.getElementById("adidas5k-popup");
let stepsCount = document.getElementById("stepsCount");

const beginningSteps = (today.local.steps || 0);
const stepsSince = 0;

let data = {
  geo_history: [
    {
      lat: 40.722752,
      lon: -74.003497
    }
  ],
  steps: 0,
  time: new Date()
};

console.log((today.local.steps || 0) + " steps");

setTimeout(hideSplash(), 500);

function hideSplash(){
  popupPrompt.style.display = "inline";
  // adidas5KPopup.style.display = "inline";
}

adidasStartBtn.onclick = function(evt) {
  console.log("ADIDAS STOP");
  // sendSteps(stepsSince)
  adidas5KPopup.style.display = "none";
  popupPrompt.style.display = "inline";
}

laterBtn.onclick = function(evt) {
  console.log("LATER");
  popupPrompt.style.display = "none";
}

startBtn.onclick = function(evt) {
  console.log("START");
  adidas5KPopup.style.display = "inline";
  popupPrompt.style.display = "none";
}

// Listen for the onopen event
peerSocket.onopen = function() {
  // Ready to send or receive messages
  console.log('SOCKET OPEN!')
}

function refreshData() {
  
  let geoData = JSON.stringify(data.geo_history);
  
  geolocation.getCurrentPosition(function(position) {
    console.log('position: ');
    console.log(position.coords.latitude + ", " + position.coords.longitude);
    
    data = {
      ...data,
      geo_history: [
        ...data.geo_history,
        {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
      ]
    };
  });
  
  data = {
    ...data,
    geo_history: [
      ...data.geo_history,
      {
        lat: 0,
        lon: 0
      }
    ],
    steps: stepsSince
  };
  
  console.log('JSON: ', JSON.stringify(data));
  stepsSince = (today.local.steps || 0) - beginningSteps;
  if(stepsSince >= 15){
    sendSteps(stepsSince);
  } else {
    stepsCount.text = stepsSince + " Steps!";
  }
}

function sendSteps(steps){
  if (peerSocket.readyState === peerSocket.OPEN){
     console.log('SENDING STEPS')
     peerSocket.send({ steps: steps });
  }
}

refreshData();
setInterval(refreshData, 500);