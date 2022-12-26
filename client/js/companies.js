import request from './helpers/request';

const btnOpenAddContact = document.getElementById('btnAddCompanies');
const companyTBody = document.getElementById('companiesTableBody');
const input_name = document.getElementById('name');
const input_adress = document.getElementById('adress');
const input_email = document.getElementById('email');
const input_phone = document.getElementById('phone');
const select_city = document.getElementById('city');
const btnAddCompanies = document.getElementById('btnAddCompanies');
const btnSaveContact = document.getElementById('btnSaveContact');

const allowedCompanyURL = "./companies.html";

if (btnOpenAddContact) {
    btnOpenAddContact.addEventListener('click', () => {
        UIkit.modal('#companies-modal').toggle();
    });
}

if (allowedCompanyURL.includes(location.pathname)) {
    if (btnAddCompanies) {
        btnAddCompanies.addEventListener("click", () => {
            getCities();
        });
    }

    if (btnSaveContact) {
        btnSaveContact.addEventListener("click", () => {
            createCompany();
        });
    }
}

function showEditModal(element) {
    const txf_name = document.getElementById('edit-name');
    const txf_adress = document.getElementById('edit-adress');
    const txf_email = document.getElementById('edit-email');
    const txf_phone = document.getElementById('edit-phone');
    const cmb_city = document.getElementById('edit-city');
    const btnEditContact = document.getElementById('btnEditContact');

    request(`/api/company/${element.target.dataset.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }).then(resCompany => {
        console.log(resCompany);
        request(`/api/city`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resCities => {
            for (let i = 0; i < resCities.data.length; i++) {
                cmb_city.innerHTML += `<option value="${resCities.data[i]._id}">${resCities.data[i].name}</option>`
            };
            cmb_city.value = resCompany.data.cities_id._id;
            txf_name.value = resCompany.data.name;
            txf_adress.value = resCompany.data.adress;
            txf_email.value = resCompany.data.email;
            txf_phone.value = resCompany.data.phone;
            console.log(cmb_city.value);
            btnEditContact.addEventListener('click', () => {
                editCompany(resCompany.data._id, {
                    name: txf_name.value,
                    adress: txf_adress.value,
                    email: txf_email.value,
                    phone: txf_phone.value,
                    city: cmb_city.value
                })
            });
        }).catch(error => { console.log(error); });
    }).catch(error => {
        console.log(error);
    });

    UIkit.modal('#edit-company').toggle();
}


function printCompanyRow(response) {
    companyTBody.innerHTML = '';
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
                <button id="btnEditCompany_${element._id}" data-id="${element._id}" class="btnEditCompany">Edit</button>
                <button id="btnDeletecompany_${element._id}" data-id="${element._id}" class="btnDeletecompany">X</button>
            </td>
            </tr>`;
    });
    const btnsEditCompany = companyTBody.getElementsByClassName('btnEditCompany');
    for (let index = 0; index < btnsEditCompany.length; index++) {
        const element = btnsEditCompany[index];
        element.onclick = showEditModal;
    }

    const btnsDeleteCompany = companyTBody.getElementsByClassName('btnDeletecompany');
    for (let index = 0; index < btnsDeleteCompany.length; index++) {
        const element = btnsDeleteCompany[index];
        element.onclick = showDeleteModal;
    }
}

function showDeleteModal(element){
    const btnDeleteCompany = document.getElementById('deleteCompany');
    btnDeleteCompany.addEventListener('click', () => {
        deleteCompany(element.target.dataset.id);
    });
    UIkit.modal('#delete-company').toggle();
}

function deleteCompany(id){
    request(`/api/company/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).then(() => {
        getCompanies();
    }).catch((err) => {
        console.log(err);
    });
}

function editCompany(id, data) {
    let body = {
        name: data.name,
        adress: data.adress,
        email: data.email,
        phone: data.phone,
        cities_id: data.city
    };

    request(`/api/company/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body
    }).then(() => {
        getCompanies();
    }).catch((err) => {
        console.log(err);
    });
}

function renderCities(response) {
    for (let i = 0; i < response.length; i++) {
        select_city.innerHTML += `<option value="${response[i]._id}">${response[i].name}</option>`
    };
}

function getCities() {
    if (localStorage.getItem('token')) {
        request(`/api/city`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            renderCities(response.data);
        }).catch(error => { console.log(error); });
    }
}

if (allowedCompanyURL.includes(location.pathname)) {
    getCompanies();
}

function getCompanies(){
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

function createCompany() {
    let data = {
        name: input_name.value,
        adress: input_adress.value,
        email: input_email.value,
        phone: input_phone.value,
        city: select_city.value
    };

    request(`/api/company`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: data
    }).then(response => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    });
}