document.getElementById('searchbox').addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) { 
    searchUserTweet(e);
  }
});

// Functions that search display tweets containing the specified characters and displays it in the search section
function processSearchTweet(response){
  if (response.status === 200) {
    document.getElementById('searchresults').innerHTML = createHTMLSearchTweets(response.body);
  } else {
    output =
      `
    <div class="errorsearchbox">
      <div class="errorsearchtweets">${response.body}</div>
    </div>
    `;
    document.getElementById('searchresults').innerHTML = output;
  }
}

// Functions that search and display specific usernames
function processSearchUser(response) { 
  if (response.status === 200) {
    document.getElementById('searchresults').innerHTML = createHTMLSearchUsers(response.body);
  } else {
    output =
      `
    <div class="errorsearchbox">
      <div class="errorsearchusers">${response.body}</div>
    </div>
    `;
    document.getElementById('searchresults').innerHTML = output;
  }
}

// The line for processing response was gotten from this link: https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
function searchUserTweet() {

  let search = document.getElementById("searchbox").value;

    if (search != ""){
      if (document.getElementById('searchtweets').checked){
        fetch('https://socialmediaapp.azurewebsites.net/api/searchTweets?code=IS0r5uXI6bOZy75pijc7LGfwWaJwI0CWxx6xbCOaa/PhTwItuFRaXw==', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type': 'application/json'
          },
          body: JSON.stringify({
              search: search
          })
      })
      .then(res =>  res.json().then(data => ({status: res.status, body: data}))).then(obj => processSearchTweet(obj));
      } else if (document.getElementById('searchusers').checked){
        fetch('https://socialmediaapp.azurewebsites.net/api/SearchUsers?code=ES2zrJMHVzAUj0xEKBjjqa3nA97osdmqciME4rIgzVRaS5rF/iby6w==', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type': 'application/json'
          },
          body: JSON.stringify({
              search: search
          })
      })
      .then(res =>  res.json().then(data => ({status: res.status, body: data}))).then(obj => processSearchUser(obj));
      }
    } else{
      alert("Enter search term in the search box");
    }
}

document.getElementById('searchtweets').addEventListener('change', searchTweetChange);

function searchTweetChange(){
  document.getElementById('searchresults').innerHTML = "";

  let search = document.getElementById("searchbox").value;

  if (search != ""){
    searchUserTweet();
  }
}

document.getElementById('searchusers').addEventListener('change', searchUserChange);

function searchUserChange(){
  document.getElementById('searchresults').innerHTML = "";

  let search = document.getElementById("searchbox").value;

  if (search != ""){
    searchUserTweet();
  }
}

// Creating the HTML to be displayed according to the response received from functions in the function app
function createHTMLSearchTweets(arr){
  output = "";
  for (i = 0; i < arr.length; i++) {
    output += `
    <div class="searchtweet">
        <img src="`+setPicture()+`" class="avatar" alt="avatar"/>
        <div>
            <span>
                <span id="tweethandle" class="handle">${arr[i].PartitionKey}</span>
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

// Creating the HTML to be displayed according to the response received from functions in the function app
function createHTMLSearchUsers(arr){
  output = "";
  for (i = 0; i < arr.length; i++) {
    output +=
    `
    <div class="searchtweet">
      <img src="`+setPicture()+`" class="avatar" alt="avatar"/>
      <div>
        <span>
          <span id="userhandle" class="handle">${arr[i]}</span>
        </span>
        <input onClick="followUser()" type="submit" class="searchfollow" value="Follow">
      </div>
    </div>
  `;
  }
  return output;
}