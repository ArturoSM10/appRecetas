import { barMenu, menuUl, formulario, select, cardContainer, body } from "./selectores.js";
import { UI } from "./clases/UI.js";

const ui = new UI();

export function cargarPagina() {
    cargarLocalStorage();
    leerEventos();
    cargarCategoriasApi();
}

function leerEventos() {
    body.addEventListener(`click`, manejoDeEventos);
    select.addEventListener(`input`, cargarRecetasCard);

}

function leerApi() {
    
}

function manejoDeEventos(e) {
    if (e.target.parentElement.classList.value === `menu__btn`) {
        menuUl.classList.toggle(`mostrar`);
    }
    if (e.target.classList.value === `card__btn`) {
        obtenerRecetaSeleccionada(e.target.dataset.id);
    }
}

function cargarRecetasCard(e) {
    limpiarHTML(cardContainer);
    
    const id = e.target.value;
    const link = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;
    fetch(link).
        then(respuesta => respuesta.json()).
        then(datos => ui.crearCards(datos.meals));
}

function cargarCategoriasApi() {
    const link = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    fetch(link).
        then(respuesta => respuesta.json()).
        then(datos => ui.agregarCategorias(datos.categories));
}

// function busquedaRecetas() {
//     const id = leerFormulario();
//     const link = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
//     fetch(link).
//         then(respuesta => respuesta.json()).
//         then(datos => console.log(datos));
//     // ui.crearCards()
// }

function limpiarHTML(elemento) {
    while(elemento.firstElementChild) {
        elemento.firstElementChild.remove();
    }
}

function obtenerRecetaSeleccionada(id) {
    const link = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(link).
        then(respuesta => respuesta.json()).
        then( datos => console.log(datos.meals));
}

function cargarLocalStorage() {

}