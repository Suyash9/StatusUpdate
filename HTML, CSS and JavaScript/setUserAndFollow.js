const pictures = ["https://imgur.com/jPPQUfF.jpg", "https://imgur.com/scHJCA4.jpg", "https://imgur.com/15Wt837.jpg", 
"https://imgur.com/oxlVz4F.jpg", "https://imgur.com/pysMQG2.jpg", "https://imgur.com/EZA2pcT.jpg",
"https://imgur.com/MpMYYuN.jpg", "https://imgur.com/JLfP35R.jpg", "https://imgur.com/RHu8rOH.jpg",
"https://imgur.com/XyM9bas.jpg", "https://imgur.com/dWrV2cl.jpg", "https://imgur.com/LidiQHu.jpg",
"https://imgur.com/RTYvkB1.jpg", "https://imgur.com/A9XNyV6.jpg", "https://imgur.com/KnMMXA6.jpg",
"https://imgur.com/wFvdzak.jpg", "https://imgur.com/7oSho52.jpg", "https://imgur.com/99JmiPX.jpg",
"https://imgur.com/lTAYfif.jpg", "https://imgur.com/fpvvRZv.jpg"];

// Function that sets the profile pictures chosen randomly from an array of picture urls
function setPicture(){
  var index = Math.floor(Math.random() * Math.floor(14));
  return String(pictures[index]);
}

// Function that gets the logged in user's username and sets it in the bio section of the application  
function setCurrentUser(){
  document.getElementById('usernamehandle').innerHTML = window.sessionStorage.getItem('currentuser');
  window.sessionStorage.setItem('profilepic', setPicture());
  document.getElementById('bioimg').innerHTML = `<img src="`+window.sessionStorage.getItem("profilepic")+`" class="avatar" alt="avatar"/>`
}

setCurrentUser();

// Functions that set the number of followers of the logged in user in the bio section of the application
function processAndSetFollowers(response) { 
  if (response.status === 200) {
    document.getElementById('nofollowers').innerHTML = `${(response.body).length} Followers`;
  } else {
    document.getElementById('nofollowers').innerHTML = `0 Followers`;
  }
}

function setFollowers() {
  
  let username = document.getElementById('usernamehandle').textContent;

  fetch('https://socialmediaapp.azurewebsites.net/api/GetFollowers?code=5R9pzGEakDUgC0JQrxhpmyO61xX7B4oZnMqaduqHcUldbM1aaQpoAg==', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        username: username
    })
  })
  .then(r =>  r.json().then(data => ({status: r.status, body: data}))).then(obj => processAndSetFollowers(obj));
}

setFollowers();

// Functions that set the number of users the logged in user is following in the bio section of the application
function processAndSetFollowing(response) { 
  if (response.status === 200) {
    document.getElementById('nofollowing').innerHTML = `${(response.body).length} Following`;
  } else {
    document.getElementById('nofollowing').innerHTML = `0 Following`;
  }
}

// The line for processing response was gotten from this link: https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
function setFollowing() {
  let username = document.getElementById('usernamehandle').textContent;

  fetch('https://socialmediaapp.azurewebsites.net/api/GetFollowing?code=aGiIoIJ6MfPa1qam39xcElmz0CIadJ9S7WLpa3xHrH/HazDKF9WQzw==', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        username: username
    })
  })
  .then(res =>  res.json().then(data => ({status: res.status, body: data}))).then(obj => processAndSetFollowing(obj));
}

setFollowing();