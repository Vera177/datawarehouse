import request from './helpers/request';

const companyTBody = document.getElementById('companiesTableBody');
const input_name = document.getElementById('name');
const input_adress = document.getElementById('adress');
const input_email = document.getElementById('email');
const input_phone = document.getElementById('phone');
const select_city = document.getElementById('city');
const btnAddCompanies = document.getElementById('btnAddCompanies');
const btnSaveContact = document.getElementById('btnSaveContact');

const allowedCompanyURL = "./companies.html";

if(allowedCompanyURL.includes(location.pathname)){
    btnAddCompanies.addEventListener("click", () => {
        getCities();
    });

    btnSaveContact.addEventListener("click", () => {
        createCompany();
    })
}

function printCompanyRow(response){
    console.log(response);
    response.forEach(element => {
        companyTBody.innerHTML += `<tr>
            <td>
                ${element.name}
            </td>
            <td>
                ${element.adress}
            </td>
            <td>
                ${element.email}
            </td>
            <td>
                ${element.phone}
            </td>
            <td>
                ${element.cities_id.name}
            </td>
            <td>
                <button class="btnEditCompany">Edit</button>
                <button class="btnDeletecompany">X</button>
            </td>
            </tr>`;
        });
}

function renderCities(response){
    for(let i = 0; i < response.length; i++) {
        select_city.innerHTML += `<option value="${response[i].name}">${response[i].name}</option>`
    };
}

function getCities(){
    if (localStorage.getItem('token')) {
        request(`/api/city`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            renderCities(response.data);
        }).catch(error=>{console.log(error);});
    }
}

if(allowedCompanyURL.includes(location.pathname)){
    if (localStorage.getItem('token')) {
        request('/api/company', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            printCompanyRow(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
}

function createCompany(){
    let data = {
        name: input_name.value,
        adress: input_adress.value,
        email: input_email.value,
        phone: input_phone.value,
        city: select_city.value
        // updater_userid: loggedUser.id
    };

    request(`/api/company`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: data
    }).then(response => {
        console.log(response);
        // printCompanyRow();
    }).catch((err) => {
        console.log(err);
    });
}