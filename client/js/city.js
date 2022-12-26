import request from './helpers/request';
var toggler = document.getElementsByClassName("caret");
const btnAddRegion = document.getElementById("btnAddRegion");
const input_region = document.getElementById("input_region");
var i;

const cityTreeView = document.getElementById('cityTreeView');

const allowedURLCity = "./city.html";

if (allowedURLCity.includes(location.pathname)) {
    if (localStorage.getItem('token')) {
        request(`/api/region`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            const Regions = response.data;
            getCities(Regions);
        }).catch(error=>{console.log(error);});
    }
}

if (allowedURLCity.includes(location.pathname)) {
    if(btnAddRegion){
        btnAddRegion.addEventListener("click", () => {
            createNewRegion();
        });
    }
}

function printCities(response, cuantityRegions){
    console.log(response, cuantityRegions);
    for (let i = 0; i < cuantityRegions.length; i++) {        
        cityTreeView.innerHTML += `<div class="countryContainer">
            <li>
                <span class="caret">${response[i].countries_id.regions_id.name}</span>
                <ul class="nested">
                    <li>
                        <span class="caret">Argentina</span>
                        <button class="btnEditCity">Edit</button>
                        <button class="btnDeleteCity">Delete</button>
                        <button class="btnAddCity">Add city</button>
                        <ul class="nested">
                            <li>Buenos Aires</li>
                            <button class="btnEditCity">Edit</button>
                            <button class="btnDeleteCity">Delete</button>
                            <li>Córdoba</li>
                            <button class="btnEditCity">Edit</button>
                            <button class="btnDeleteCity">Delete</button>
                        </ul>
                    </li>
                    <li>
                        <span class="caret">Colombia</span>
                        <button class="btnEditCity">Edit</button>
                        <button class="btnDeleteCity">Delete</button>
                        <button class="btnAddCity">Add city</button>
                        <ul class="nested">
                            <li>Bogotá</li>
                            <button class="btnEditCity">Edit</button>
                            <button class="btnDeleteCity">Delete</button>
                            <li>Medellín</li>
                            <button class="btnEditCity">Edit</button>
                            <button class="btnDeleteCity">Delete</button>
                        </ul>
                    </li>
                </ul>
            </li>
            <button class="btnAddCountry">Add country</button>
        </div>`
    }
}

function getCities(Regions){
    if (localStorage.getItem('token')) {
        request(`/api/city`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            // printCities(response.data, Regions);
            treeView();
        }).catch(error=>{console.log(error);});
    }
}

function treeView() {
    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function () {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }
}



function createNewRegion() {
    if (localStorage.getItem('token')) {
        request(`/api/region`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: {name: input_region.value}
        }).then(response => {
            console.log(response);
        }).catch(error=>{console.log(error);});
    }
}
