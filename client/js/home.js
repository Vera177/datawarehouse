import request from './helpers/request';
const inputSearch = document.getElementById('inputSearch');

function printRow (contacts) {
    const table = document.getElementById("contactsTable");
    const tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    contacts.forEach(element => {
        console.log(element);
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
            <td class="tripleDot"><span id="editContact" class="material-symbols-outlined editContact">edit</span></td>
            </tr>`;
        });

        
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

// sort o reverse. ordenar array de objetos. Primero mayus, luego minus, luego numeros. Esto es muy difícil de implementar. Lo más probable es que no lo haga.

// el request es el mismo pero cambia el URL. La funcion la asocio al eventlistener.

// funcion ejecutar que haga un request a buscar. Otra función para que pinte los contactos

//ejecutar el front en el puerto 3000, porque en el 3001 da error.

//funciona pero tengo que especificar qué campo estoy buscando (email, nombre, apellido, etc) ¿cómo hago para hacer esto dinámico?