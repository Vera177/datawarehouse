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
        localStorage.setItem("ejercicio_tokenasas", res.token);
        window.location.replace('/news.html');
    }).catch(err => {
      console.log(err);
    });
});