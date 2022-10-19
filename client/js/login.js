import request from './helpers/request.js';

const txtUser = document.getElementById("username");
const txtPassword = document.getElementById("password");
const btnSubmit = document.getElementById("submit");

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    request("/api/login", {
        method: "POST",
        body: { email: txtUser.value, password: txtPassword.value },
    }).then((res) => {
        localStorage.setItem("token", res.token);
        window.location.replace('/index.html');
    }).catch(err => {
      console.log(err);
    });
});