// Functions that create and store a new follow relation from both searched tweets and searched users

function processFollowUser(response) {
    if (response.status === 200) {
      alert("Successfully followed " + response.body);
      document.getElementById('searchbox').value = "";
      document.getElementById('searchresults').innerHTML = "";
      setFollowers();
      setFollowing();
      getFollowers();
      getFollowing();
      getTweetsUser();
      getTweetsTimeline();
    } else {
      alert(response.body);
    }
}

// The line for processing response was gotten from this link: https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
function followUser(){

  let username = document.getElementById('usernamehandle').textContent;
  let follow = document.getElementById('userhandle').textContent;

  if (follow != ""){
    fetch('https://socialmediaapp.azurewebsites.net/api/FollowUser?code=0aot8/FMq8vJdZbC1SEwYbankvoc84Q6esmGGatnbcNf/wqWj20iSA==', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            follow: follow
        })
    })
    .then(res =>  res.json().then(data => ({status: res.status, body: data}))).then(obj => processFollowUser(obj));
  }
}