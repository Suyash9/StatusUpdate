// Function that stores a new tweet posted by the logged in user in the Tweets table in Azure Table Storage

document.getElementById('submittweet').addEventListener('click', storeTweet);

function storeTweet(e) {
    e.preventDefault();

    let tweet = document.getElementById('newtweet').value;
    let username = document.getElementById('usernamehandle').textContent;

    if (tweet != ""){
        fetch('https://socialmediaapp.azurewebsites.net/api/StoreTweet?code=Oy7opl/3vax/pCCDz7LZTve8OakOqgSBCuzgjY6KUmdsJxaQs6C1kw==', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                tweet: tweet
            })
        });
        alert("Tweet successfully posted");
        getTweetsUser();
        document.getElementById('newtweet').value = "";
        document.getElementById('newtweet').innerHTML = "";
    } else{
        alert("Enter characters in the box to post tweet");
    }
}