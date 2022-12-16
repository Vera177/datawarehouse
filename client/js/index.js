import './login';
import './createuser';
import './checkHeaderAdminUser';
import './home';
import './companies';
// import './city';

const allowedURL = [
    "/login.html"
];

if(!allowedURL.includes(location.pathname)){
    if(!localStorage.getItem('token')){
        console.log('test');
        window.location.replace('/login.html');
    }
}