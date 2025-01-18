function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === 'admin' && password === 'admin') {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        window.location.href = 'index.html';
    } else {
        errorMessage.classList.remove("no-display");
    }
}

var loginButton = document.getElementById("login-button")
loginButton.addEventListener("click", login)