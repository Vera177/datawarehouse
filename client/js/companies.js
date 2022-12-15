import request from './helpers/request';

const companyTBody = document.getElementById('companiesTableBody');

const allowedCompanyURL = "./companies.html";

function printCompanyRow(response){
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