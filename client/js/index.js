import './login';

const allowedURL = [
    "/login.html"
];

if(!allowedURL.includes(location.pathname)){
    if(!localStorage.getItem('token')){
        console.log('test');
        window.location.replace('/login.html');
    }
}