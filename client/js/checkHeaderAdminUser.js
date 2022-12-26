import request from './helpers/request';
const userHeader = document.getElementById('userHeaderId');
const role = localStorage.getItem('role');

if(userHeader){
    if(role == 'admin')
    userHeader.innerHTML = `<a class="uk-text-capitalize" href="/users.html">Usuarios</a>`;
}