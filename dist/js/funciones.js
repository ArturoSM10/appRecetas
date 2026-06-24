import { barMenu, menuUl, formulario, select, cardContainer, body } from "./selectores.js";
import { UI } from "./clases/UI.js";
import { Recetas } from "./clases/Recetas.js";

const ui = new UI();
const recetas = new Recetas;

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
    console.log(e.target.classList.value)
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

function limpiarHTML(elemento) {
    while(elemento.firstElementChild) {
        elemento.firstElementChild.remove();
    }
}

function obtenerRecetaSeleccionada(id) {
    const link = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(link).
        then(respuesta => respuesta.json()).
        then( datos => {
            const datosFormateados = recetas.formatearIngredientes(datos.meals[0]);
            ui.mostrarModal(datosFormateados);
        });
}

function cargarLocalStorage() {

}