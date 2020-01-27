getTweetsTimeline();

document.getElementById('refresh').addEventListener('click', getTweetsTimeline);

// Functions that get and display the tweets posted by the users that the logged in user is following
function processTweetsTimeline(response) {
  if (response.status === 200) {
    document.getElementById("timeline").innerHTML = createHTMLTweetsTimeline(response.body);
  } else {
    output =
      `
    <div class="error">
      <div class="errortimeline">${response.body}</div>
    </div>
    `;
    document.getElementById('timeline').innerHTML = output;
  }
}

// The line for processing response was gotten from this link: https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
function getTweetsTimeline() {
  let username = document.getElementById('usernamehandle').textContent;

  fetch('https://socialmediaapp.azurewebsites.net/api/GetTweetsTimeline?code=ocIsNS2S6bj/vNl6E8A82pqvyeVnaDHB41eGSczNqBpn0HBYOlHNbQ==', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        username: username
    })
  }) 
  .then(r =>  r.json().then(data => ({status: r.status, body: data}))).then(obj => processTweetsTimeline(obj));
}

// Creating the HTML to be displayed according to the response received from functions in the function app
function createHTMLTweetsTimeline(arr){
  output = "";
  for (i = 0; i < arr.length; i++) {
    output += `
    <div class="tweet">
        <img src="`+setPicture()+`" class="avatar" alt="avatar"/>
        <div>
            <span>
                <span class="handle">${arr[i].PartitionKey}</span>
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

function createDate(time){
  var today = new Date();
  var todayDate = today.getDate();
  var todayMonth = today.getMonth() + 1;
  var todayYear = today.getFullYear();
  var todayDateString =  todayDate + "/" + todayMonth + "/" + todayYear;
  
  var tweetDate = new Date(time);
  var tweetDateString = (tweetDate.getDate()+"/" + (tweetDate.getMonth()+1)+"/"+tweetDate.getFullYear());

  if (todayDateString == tweetDateString){
    if (String(tweetDate.getMinutes()).length>1){
      return String(tweetDate.getHours()+":"+tweetDate.getMinutes());
    } else{
      return String(tweetDate.getHours()+":0"+tweetDate.getMinutes());
    }
  } else{
    return String(tweetDateString);
  }
}