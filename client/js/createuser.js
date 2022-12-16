import request from './helpers/request';
const createUserbtn = document.getElementById("createUserbtn");
const user_name = document.getElementById("user_name");
const user_lastname = document.getElementById("user_lastname");
const user_email = document.getElementById("user_email");
const user_password = document.getElementById("user_password");
const user_role = document.getElementById("user_role");

let allowedCreateUserURL = "/users.html"

if(allowedCreateUserURL.includes(location.pathname)){

    createUserbtn.addEventListener("click", (e) => {
        e.preventDefault();

        const data = {
            firstname: user_name.value,
            lastname: user_lastname.value,
            email: user_email.value,
            password: user_password.value,
            role: user_role.value
            // updater_userid: loggedUser.id
        };

        request("/api/user", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}` 
            },
            body: data
        }).then((response) => {
            window.alert("Usuario creado!");
            location.reload();
            // window.location.replace('/index.html');
        }).catch(err => {
        console.log(err);
        });
    });
}