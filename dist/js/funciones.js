import { barMenu, menuUl, formulario, select, cardContainer, body, modal, notificacion, resultadosFavoritos, notificacionTexto } from "./selectores.js";
import { UI } from "./clases/UI.js";
import { Recetas } from "./clases/Recetas.js";
// import { temporizador } from "./variables.js";
import { Notificacion } from "./clases/Notificacion.js";

const ui = new UI();
const recetas = new Recetas();
const toastNotificacion = new Notificacion(notificacion, notificacionTexto);

export function cargarPagina() {
    leerEventos();
    cargarCategoriasApi();
}

export function cargarFavoritos() {
    cargarLocalStorage();
    leerEventosFavoritos();
}

function leerEventos() {
    body.addEventListener(`click`, manejoDeEventos);
    select.addEventListener(`input`, cargarRecetasCard);
    notificacion.addEventListener(`mouseover`, notificacionPersistente);
    notificacion.addEventListener(`mouseleave`, notificacionNormal);
}

function leerEventosFavoritos() {
    body.addEventListener(`click`, manejoDeEventos);
}

function manejoDeEventos(e) {
    if (e.target.parentElement.classList.value === `menu__btn`) {
        menuUl.classList.toggle(`mostrar`);
        return;
    }
    if (e.target.classList.value === `card__btn`) {
        const favoritos = recetas.cargarFavoritos();
        const existe = recetas.comprobarSiExiste(favoritos, e.target.dataset.id);

        obtenerRecetaSeleccionada(e.target.dataset.id, existe);
        return;
    }
    if(e.target.classList.value === `modal-card__favorito`) {
        const favoritos = recetas.cargarFavoritos();
        const existe = recetas.comprobarSiExiste(favoritos, e.target.dataset.id);
        
        administrarFavoritos(e.target.dataset.id, existe);

        return;
    }
    if(e.target.classList.value === 'modal-card__cerrar' || e.target.classList.value === `modal-card__btn`){
        ui.cerrarModal();
        return;
    }

    if(e.target.classList.value ===`modal activo`) {
        const modalCard = document.querySelector(`.modal-card`);
        // modal.style.scale = `1.01`;
        modalCard.classList.add(`animacion-modal`);
        setTimeout(() => {
            modalCard.classList.remove(`animacion-modal`);
            //  modal.style.scale = `1`;
        }, 150);
    }

    if(e.target.classList.value === `notificacion__cerrar`) {
        toastNotificacion.cerrarNotificacion();
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

function obtenerRecetaSeleccionada(id, existe) {
    const link = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(link).
        then(respuesta => respuesta.json()).
        then( datos => {
            const datosFormateados =recetas.formatearIngredientes(datos.meals[0]);
            ui.mostrarModal(datosFormateados, existe);
        });
    
}

function almacenarLocalStorage(id) {
     const link = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(link).
        then(respuesta => respuesta.json()).
        then( datos => {
            const datosFormateados =recetas.formatearIngredientes(datos.meals[0]);
            recetas.guardarFavorito(datosFormateados);
        });
}

function administrarFavoritos(id, existe){
    if(existe) {
        recetas.eliminarFavorito(id);
        ui.cambiarTextoFavoritosBtn(`Guardar favorito`);
        toastNotificacion.mostrarNotificacion(`Se eliminó de favoritos`);
    } else {
        almacenarLocalStorage(id);
        ui.cambiarTextoFavoritosBtn(`Eliminar favorito`);
        toastNotificacion.mostrarNotificacion(`Se agrego a favoritos`);
    }
}

function cargarLocalStorage() {
    if(recetas.cargarFavoritos().length !== 0) {
        resultadosFavoritos.textContent = `Resultados`;
        ui.crearCards(recetas.cargarFavoritos());
        return;
    }
    resultadosFavoritos.textContent = `No hay resultados aún`;
}

function notificacionPersistente(e) {
    toastNotificacion.pausarNotificacion();
}

function notificacionNormal() {
    toastNotificacion.reanudarNotificacion();
}