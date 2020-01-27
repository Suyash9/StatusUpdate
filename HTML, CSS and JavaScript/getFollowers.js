document.getElementById('followers').addEventListener('change', getFollowers);

// Function that gets and displays the users that follow the logged in user
function processFollowers(response) { 
  if (response.status === 200) {
    document.getElementById('followerstab').innerHTML = (createHTMLFollowers(response.body));
  } else {
    output =
      `
    <div class="error">
      <div class="errorfollowers">${response.body}</div>
    </div>
    `;
    document.getElementById('followerstab').innerHTML = output;
  }
}

// The line for processing response was gotten from this link: https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
function getFollowers() {

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
  .then(res =>  res.json().then(data => ({status: res.status, body: data}))).then(obj => processFollowers(obj));
}

// Creating the HTML to be displayed according to the response received from functions in the function app
function createHTMLFollowers(arr){
  output ="";
  for (i = 0; i < arr.length; i++) {
    output += `
    <div class="tweetuser">
      <img src="`+setPicture()+`" class="avatar" alt="avatar"/>    
      <div>
        <span>
            <span class="followhandle"> ${arr[i]} </span>
        </span>
      </div>
    </div>      
  `;
  }
  return output;
}