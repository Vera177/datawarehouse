import './login';
import './users';

if(!localStorage.getItem('token')){
    console.log('test');
    window.location.pathname.replace('/login.html');
}

// if(location.pathname !== '/login.html'){
//     console.log(location.pathname);
//     localStorage.getItem('token');
//     // window.location.pathname.replace('/login.html');
// }