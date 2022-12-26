import request from './helpers/request';
const inputSearch = document.getElementById('inputSearch');
const btnOpenAddContact = document.getElementById('btnOpenAddContact');
const btnSaveNewContact = document.getElementById('btnSaveNewContact');

if (btnOpenAddContact) {
    btnOpenAddContact.addEventListener('click', () => {
        UIkit.modal('#add-contact').toggle();
        getContactscmb();
    });

    btnSaveNewContact.addEventListener('click', () => {
        createContact();
    })
}

function printRow (contacts) {
    const table = document.getElementById("contactsTable");
    const tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    contacts.forEach(element => {
        tBody.innerHTML += `<tr>
            <th class="uk-text-capitalize"><input type="checkbox"></th>
            <td class="contactName">
            <div>${element.firstname} ${element.lastname}</div>
            <div><label class="secondTextGrey">${element.email}</label></div>
            </td>
            <td>${element.cities_id.countries_id.name}<br><label class="secondTextGrey">${element.cities_id.countries_id.regions_id.name}</label></td>
            <td>${element.company_id.name}</td>
            <td>${element.occupation_id.name}</td>
            <td>
            <button class="contactChannel">${element.contact_information_id.name}</button>
            </td>
            <td class="interestPercentage uk-table-expand">${element.interested_id.interest}%
                <div class="progress">
                <div class="progress-bar ${element.interested_id.interest == 25
                    ? 'skyblue'
                    : element.interested_id.interest == 50
                        ? 'yellow'
                        : element.interested_id.interest == 75
                            ? 'orange'
                            : element.interested_id.interest == 100
                                ? 'red'
                                : 'white'
                }"></div>
                </div>
            </td>
            <td class="tripleDot"><span id="btnDeleteContact_${element._id}" data-id="${element._id}" class="trashContact material-symbols-outlined">delete</span></td>
            <td class="tripleDot"><span id="editContact_${element._id}" data-id="${element._id}" class="editContact material-symbols-outlined">edit</span></td>
            </tr>`;
        });

    const btnsEditContact = tBody.getElementsByClassName('editContact');
    for (let index = 0; index < btnsEditContact.length; index++) {
        const element = btnsEditContact[index];
        element.onclick = showEditContactModal;
    }
        
    const btnsDeleteContact = tBody.getElementsByClassName('trashContact');
    for (let index = 0; index < btnsDeleteContact.length; index++) {
        const element = btnsDeleteContact[index];
        element.onclick = showDeleteModalContacts; 
    }
        // <td class="tripleDot"><span class="material-symbols-outlined">more_horiz</span></td>
}

function showDeleteModalContacts(element){
    const btnsDeleteContact = document.getElementById('deleteContact');
    btnsDeleteContact.addEventListener('click', () => {
        deleteContact(element.target.dataset.id);
    });
    UIkit.modal('#delete-contact').toggle();
}

function deleteContact(id){
    request(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).then(() => {
        loadContacts();
    }).catch((err) => {
        console.log(err);
    });
}

const allowedURL = [
    "/index.html",
];

if (allowedURL.includes(location.pathname)) {
    inputSearch.addEventListener('keyup', () => {
        const search = inputSearch.value;
        getSearch(search);
    })
}

function getSearch(search) {
    if (allowedURL.includes(location.pathname)) {
        if (localStorage.getItem('token')) {
            request(`/api/contact?email=${search}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(response => {
                const table = document.getElementById("contactsTable");
                const tBody = table.querySelector("tbody");
                tBody.innerHTML = '';
                response.contacts.forEach(element => {
                    tBody.innerHTML += `<tr>
                        <th class="uk-text-capitalize"><input type="checkbox"></th>
                        <td class="contactName">
                        <div>${element.firstname} ${element.lastname}</div>
                        <div><label class="secondTextGrey">${element.email}</label></div>
                        </td>
                        <td>${element.cities_id.countries_id.name}<br><label class="secondTextGrey">${element.cities_id.countries_id.regions_id.name}</label></td>
                        <td>${element.company_id.name}</td>
                        <td>${element.occupation_id.name}</td>
                        <td>
                        <button class="contactChannel">${element.contact_information_id.name}</button>
                        </td>
                        <td class="interestPercentage uk-table-expand">${element.interested_id.interest}%
                            <div class="progress">
                            <div class="progress-bar ${element.interested_id.interest == 25
                                ? 'skyblue'
                                : element.interested_id.interest == 50
                                    ? 'yellow'
                                    : element.interested_id.interest == 75
                                        ? 'orange'
                                        : element.interested_id.interest == 100
                                            ? 'red'
                                            : 'white'
                            }"></div>
                            </div>
                        </td>
                        <td class="tripleDot"><span class="material-symbols-outlined">more_horiz</span></td>
                    </tr>`;
                });
            }).catch(error => {
                console.log(error);
            })
        }
    }
}

if (allowedURL.includes(location.pathname)) {
    loadContacts();
}

function createContact() {
    const input_contact_name = document.getElementById('input_contact_name');
    const input_contact_lastname = document.getElementById('input_contact_lastname');
    const input_contact_email = document.getElementById('input_contact_email');
    const input_contact_adress = document.getElementById('input_contact_adress');
    const input_contact_occupation = document.getElementById('input_contact_occupation');
    const cmb_contact_company = document.getElementById('cmb_contact_company');
    const cmb_contact_city = document.getElementById('cmb_contact_city');
    const cmb_contact_country = document.getElementById('cmb_contact_country');
    const cmb_contact_region = document.getElementById('cmb_contact_region');
    const cmb_contact_interest = document.getElementById('cmb_contact_interest');
    const cmb_contact_contactChannel = document.getElementById('cmb_contact_contactChannel');

    let data = {
        firstname: input_contact_name.value,
        lastname: input_contact_lastname.value,
        email: input_contact_email.value,
        adress: input_contact_adress.value,
        occupation: input_contact_occupation.value,
        company: cmb_contact_company.value,
        City: cmb_contact_city.value,
        interestedPercentage: cmb_contact_interest.value,
        contactInformation: cmb_contact_contactChannel.value
    };

    request(`/api/contact`, {
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

function getContactscmb(){

    if (localStorage.getItem('token')) {
        request(`/api/city`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resCities => {
            for (let i = 0; i < resCities.data.length; i++) {
                cmb_contact_city.innerHTML += `<option value="${resCities.data[i]._id}">${resCities.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/country`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resCountries => {
            for (let i = 0; i < resCountries.data.length; i++) {
                cmb_contact_country.innerHTML += `<option value="${resCountries.data[i]._id}">${resCountries.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/region`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resRegion => {
            for (let i = 0; i < resRegion.data.length; i++) {
                cmb_contact_region.innerHTML += `<option value="${resRegion.data[i]._id}">${resRegion.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/interest`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resPercentage => {
            for (let i = 0; i < resPercentage.data.length; i++) {
                cmb_contact_interest.innerHTML += `<option value="${resPercentage.data[i]._id}">${resPercentage.data[i].interest}%</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/contactinformation`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resContactInformation => {
            for (let i = 0; i < resContactInformation.data.length; i++) {
                cmb_contact_contactChannel.innerHTML += `<option value="${resContactInformation.data[i]._id}">${resContactInformation.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/company`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resCompany => {
            for (let i = 0; i < resCompany.data.length; i++) {
                cmb_contact_company.innerHTML += `<option value="${resCompany.data[i]._id}">${resCompany.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }
}

function loadContacts(){
    if (localStorage.getItem('token')) {
        request('/api/contact', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            printRow(response.contacts);
        }).catch(error => {
            console.log(error);
        })
    }
}

function getEditContactscmb(){

    if (localStorage.getItem('token')) {
        request(`/api/city`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resCities => {
            for (let i = 0; i < resCities.data.length; i++) {
                cmb_edit_contact_city.innerHTML += `<option value="${resCities.data[i]._id}">${resCities.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/country`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resCountries => {
            for (let i = 0; i < resCountries.data.length; i++) {
                cmb_edit_contact_country.innerHTML += `<option value="${resCountries.data[i]._id}">${resCountries.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/region`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resRegion => {
            for (let i = 0; i < resRegion.data.length; i++) {
                cmb_edit_contact_region.innerHTML += `<option value="${resRegion.data[i]._id}">${resRegion.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/interest`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resPercentage => {
            for (let i = 0; i < resPercentage.data.length; i++) {
                cmb_edit_contact_interest.innerHTML += `<option value="${resPercentage.data[i]._id}">${resPercentage.data[i].interest}%</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/contactinformation`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resContactInformation => {
            for (let i = 0; i < resContactInformation.data.length; i++) {
                cmb_edit_contact_contactChannel.innerHTML += `<option value="${resContactInformation.data[i]._id}">${resContactInformation.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }

    if (localStorage.getItem('token')) {
        request(`/api/company`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(resCompany => {
            for (let i = 0; i < resCompany.data.length; i++) {
                cmb_edit_contact_company.innerHTML += `<option value="${resCompany.data[i]._id}">${resCompany.data[i].name}</option>`
            };
            // loadContactsCmb(resCities.data);
        }).catch(error => { console.log(error); });
    }
}

function showEditContactModal(element){
    const input_edit_contact_name = document.getElementById('input_edit_contact_name');
    const input_edit_contact_lastname = document.getElementById('input_edit_contact_lastname');
    const input_edit_contact_email = document.getElementById('input_edit_contact_email');
    const input_edit_contact_adress = document.getElementById('input_edit_contact_adress');
    const input_edit_contact_occupation = document.getElementById('input_edit_contact_occupation');
    const cmb_edit_contact_company = document.getElementById('cmb_edit_contact_company');
    const cmb_edit_contact_city = document.getElementById('cmb_edit_contact_city');
    const cmb_edit_contact_country = document.getElementById('cmb_edit_contact_country');
    const cmb_edit_contact_region = document.getElementById('cmb_edit_contact_region');
    const cmb_edit_contact_interest = document.getElementById('cmb_edit_contact_interest');
    const cmb_edit_contact_contactChannel = document.getElementById('cmb_edit_contact_contactChannel');
    const btnEditContact = document.getElementById('btnEditContact');

    getEditContactscmb();
    
    request(`/api/contact/${element.target.dataset.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }).then(resCompany => {
        console.log(resCompany);
            input_edit_contact_name.value = resCompany.data.firstname;
            input_edit_contact_lastname.value = resCompany.data.lastname;
            input_edit_contact_adress.value = resCompany.data.adress;
            input_edit_contact_email.value = resCompany.data.email;
            input_edit_contact_occupation.value = resCompany.data.occupation_id._id;
            btnEditContact.addEventListener('click', () => {
                editContact(resCompany.data._id, {
                    firstname: input_edit_contact_name.value,
                    lastname: input_edit_contact_lastname.value,
                    adress: input_edit_contact_adress.value,
                    email: input_edit_contact_email.value,
                    cities_id: cmb_edit_contact_city.value,
                    interested_id: cmb_edit_contact_interest.value,
                    contact_information_id: cmb_edit_contact_contactChannel.value,
                    occupation_id: input_edit_contact_occupation.value,
                    company_id: cmb_edit_contact_company.value
                });
            });
        }).catch(error => { console.log(error); });
    UIkit.modal('#edit-contact').toggle();
}

function editContact(id, data){
    // let body = {
    //     name: data.name,
    //     adress: data.adress,
    //     email: data.email,
    //     phone: data.phone,
    //     cities_id: data.city
    // };

    request(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: data
    }).then((resEdit) => {
        console.log(resEdit);
        // loadContacts();
    }).catch((err) => {
        console.log(err);
    });
}

// sort o reverse. ordenar array de objetos. Primero mayus, luego minus, luego numeros. Esto es muy difícil de implementar. Lo más probable es que no lo haga.

// el request es el mismo pero cambia el URL. La funcion la asocio al eventlistener.

// funcion ejecutar que haga un request a buscar. Otra función para que pinte los contactos

//ejecutar el front en el puerto 3000, porque en el 3001 da error.

//funciona pero tengo que especificar qué campo estoy buscando (email, nombre, apellido, etc) ¿cómo hago para hacer esto dinámico?