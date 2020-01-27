/* Function that is used to check if the username entered exists and the correct password associated with 
the account has been entered during login */

document.getElementById('login').addEventListener('click', getUser);

function processUser(response) {
    if (response.status === 200) {
        window.sessionStorage.setItem("currentuser", response.body);
        document.location.href = "home.html";
    } else {
        alert(response.body);
    }
}

// The line for processing response was gotten from this link: https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
function getUser(e) {
    e.preventDefault();
    
    let username = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    
    if (username != "" && password != ""){
        fetch('https://socialmediaapp.azurewebsites.net/api/CheckUser?code=lTVeJTin6o2xjy4lYiP/H7q1twlUmxCtM5MWVELpV4nCW78A/CPdyA==', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res =>  res.json().then(data => ({status: res.status, body: data}))).then(obj => processUser(obj));
    } else{
        if (username == ""){
            alert("Please enter the username");
        } else if (password ==""){
            alert("Please enter the password");
        }
    }
}