document.getElementById('subutton').addEventListener('click', storeUser);

// Function that creates and stores a new user that has signed up
function processStoreUser(response) {
    if (response.status === 200) {
        alert(response.body);
    } else {
        alert(response.body);
    }
}

// The line for processing response was gotten from this link: https://stackoverflow.com/questions/47267221/fetch-response-json-and-response-status
function storeUser(e) {
    e.preventDefault();

    let username = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    
    if (checkUsernameAndPassword(username, password)){
        fetch('https://socialmediaapp.azurewebsites.net/api/CreateNewUser?code=cW0vvltbI6LATel0R4arGBwWlQ/wNLcgjnKUs0DZXpxhvrumWiUfyg==', {
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
        .then(res =>  res.json().then(data => ({status: res.status, body: data}))).then(obj => processStoreUser(obj));
        document.getElementById('loginform').reset();
    }
}

// Input validation of username and password to ensure strong username and passwords are used
function checkUsernameAndPassword(username, password){
    if (username.length < 3|| username.length > 22){
        alert("Username should contain between 3 and 22 characters");
        return false;
    } if (!username.match("^[a-zA-Z0-9]*$")){
        alert("Username should contain only alphabets and numbers");
        return false;
    } if (password.length < 10 || password.length > 250){
        alert("Password should contain at least 10 characters");
        return false;
    } if (!password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{0,}$")){
        alert("Password should contain:\n   1 upppercase letter\n   1 lowercase letter\n   1 number\n   1 special character");
        return false;
    }
    return true;
}