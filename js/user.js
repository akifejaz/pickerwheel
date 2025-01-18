function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const username = sessionStorage.getItem('username');

    if (isLoggedIn !== 'true') {
        loginButton.classList.remove("red")
        userInfo.classList.add("no-display")
    } else {
        loginButton.classList.add("red")
        userInfo.classList.remove("no-display")
        userInfo.innerHTML = "Welcome, " + username
    }
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    checkLoginStatus()
}

function buttonAction() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html'
    } else {
        logout()
    }
}

console.log(sessionStorage)
checkLoginStatus();
loginButton.addEventListener("click", buttonAction)