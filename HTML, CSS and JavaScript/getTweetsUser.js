getTweetsUser();

document.getElementById('tweets').addEventListener('change', getTweetsUser);

// Functions that get and display all the tweets posted by the logged in user
function processTweetsUser(response) {
  if (response.status === 200) {
    document.getElementById('tweetstab').innerHTML = createHTMLTweetsUser(response.body);
  } else {
    output =
    `
    <div class="error">
      <div class="errortweet">${response.body}</div>
    </div>
    `;
  document.getElementById('tweetstab').innerHTML = output;
  }
}

// The line for processing response was gotten from this link: https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
function getTweetsUser() {

  let username = document.getElementById('usernamehandle').textContent;

  fetch('https://socialmediaapp.azurewebsites.net/api/GetTweetsUser?code=hcibAl9XNAEQ7dMYT1scXo3Oc00cKSS0DmS47dTmwVjGI3slbWDUvw==', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        username: username
    })
  })
  .then(res =>  res.json().then(data => ({status: res.status, body: data}))).then(obj => processTweetsUser(obj));
}

// Creating the HTML to be displayed according to the response received from functions in the function app
function createHTMLTweetsUser(arr){
  output = "";
  for (i = 0; i < arr.length; i++) {
    output += `
    <div class="tweetuser">
        <img src="`+window.sessionStorage.getItem("profilepic")+`" class="avatar" alt="avatar"/>
        <div>
            <span>
                <span class="handle">${document.getElementById('usernamehandle').textContent}</span>
                <span class="time">${createDate(parseInt(arr[i].RowKey))}</span>
            </span>
            <div class="status">
                ${arr[i].tweet}
            </div>
        </div>
    </div>
    `;
  }
  return output;
}