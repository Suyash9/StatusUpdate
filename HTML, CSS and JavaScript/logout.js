document.getElementById('logout').addEventListener('click', logout);

// Function that logs out the user and redirects them to the login page
function logout(){
    window.sessionStorage.removeItem("currentuser");
    document.location.href = "index.html";
}