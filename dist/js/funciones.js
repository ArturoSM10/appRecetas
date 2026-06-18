import { barMenu, menuUl, formulario, select } from "./selectores.js";

export function cargarPagina() {
    cargarLocalStorage();
    leerEventos();
    cargarDatosApi();
}

function leerEventos() {
    barMenu.addEventListener(`click`, menuHamburgesa);
    select.addEventListener(`input`, leerFormulario);

}

function leerApi() {
    
}

function menuHamburgesa() {
menuUl.classList.toggle(`mostrar`);
}

function leerFormulario(e) {
    console.log(e.target.value);
}

function cargarDatosApi() {

}

function cargarLocalStorage() {

}