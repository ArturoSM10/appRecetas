import { barMenu, menuUl, formulario, select, cardContainer, body, modal } from "./selectores.js";
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
    // console.log(e.target.classList)
    if (e.target.parentElement.classList.value === `menu__btn`) {
        menuUl.classList.toggle(`mostrar`);
        return;
    }
    if (e.target.classList.value === `card__btn`) {
        obtenerRecetaSeleccionada(e.target.dataset.id);
        return;
    }
    if(e.target.classList.value === `modal-card__favorito`) {
        console.log(`agregar a favoritos`);
        return;
    }
    if(e.target.classList.value === 'modal-card__cerrar' || e.target.classList.value === `modal-card__btn`){
        ui.cerrarModal();
        return;
    }
    if(e.target.classList.value ===`modal activo`) {
        const modalCard = document.querySelector(`.modal-card`);
        console.log(`presionaste fuera`)
        // modal.style.scale = `1.01`;
        modalCard.classList.add(`animacion-modal`);
        setTimeout(() => {
            modalCard.classList.remove(`animacion-modal`);
            //  modal.style.scale = `1`;
        }, 150);
    }
}

function cargarRecetasCard(e) {
    ui.limpiarHTML(cardContainer);
    
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