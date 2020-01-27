document.getElementById('following').addEventListener('change', getFollowing);

// Function that gets and displays the users that the logged in user is following
function processFollowing(response) { 
  if (response.status === 200) {
    document.getElementById('followingtab').innerHTML = createHTMLFollowing(response.body);
  } else {
    output =
      `
    <div class="error">
      <div class="errorfollowing">${response.body}</div>
    </div>
    `;
    document.getElementById('followingtab').innerHTML = output;
  }
}

// The line for processing response was gotten from this link: https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
function getFollowing() {

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
  .then(res =>  res.json().then(data => ({status: res.status, body: data}))).then(obj => processFollowing(obj));
}

// Creating the HTML to be displayed according to the response received from functions in the function app
function createHTMLFollowing(arr){
  output ="";
  for (i = 0; i < arr.length; i++) {
    output += `
    <div class="tweetuser">
      <img src="`+setPicture()+`" class="avatar" alt="avatar"/>  
      <div>
        <span>
            <span class="followhandle">${arr[i]}</span>
        </span>
      </div>
    </div> 
  `;
  }
  return output;
}