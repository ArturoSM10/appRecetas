import { barMenu, menuUl, formulario, select } from "./selectores.js";

export function cargarPagina() {
    cargarLocalStorage();
    leerEventos();
    cargarCategoriasApi();
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

function cargarCategoriasApi() {
    const link = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    fetch(link).
        then(respuesta => respuesta.json()).
        then(datos => console.log(datos.categories));
}

function cargarLocalStorage() {

}