import { select, cardContainer, body, modal, notificacion, notificacionTexto, modalCard } from "../selectores.js";
let temporizador;

export class UI {
    agregarCategorias(recetas) {
        recetas.forEach(receta => {
            const { idCategory, strCategory } = receta;
            const option = document.createElement(`OPTION`);
            option.value = strCategory;
            option.textContent = strCategory;
            select.appendChild(option);
        });
    }

    crearCards(recetas) {
        
        recetas.forEach(receta => {
            const { idMeal, strMeal, strMealThumb} = receta;
            const divCard = document.createElement(`DIV`);
            divCard.classList.add(`card`);

            const divImgContainer = document.createElement(`DIV`);
            divImgContainer.classList.add(`card__img-container`);
            const img = document.createElement(`IMG`);
            img.classList.add(`card__img`);
            img.src = strMealThumb;
            img.alt = `Imagen de la receta ${strMeal}`;
            divImgContainer.appendChild(img);

            const divCardInfo = document.createElement(`DIV`);
            divCardInfo.classList.add(`card__info`);
            const mealTitle = document.createElement(`H3`);
            mealTitle.classList.add(`card__title`);
            mealTitle.textContent = strMeal;
            const btnCard = document.createElement(`BUTTON`);
            btnCard.classList.add(`card__btn`);
            btnCard.dataset.id = idMeal;
            btnCard.textContent = `Ver receta`;
            divCardInfo.appendChild(mealTitle);
            divCardInfo.appendChild(btnCard);

            divCard.appendChild(divImgContainer);
            divCard.appendChild(divCardInfo);

            cardContainer.appendChild(divCard);
        }); 
    }

    mostrarModal(objeto, existe) {
        /*
        fatla agregar efectos (notificacion, menu)
        quitar desplazamiento de barra de scroll
        hay un efecto que si esta el mouse ahi dentro no se quita nunca(opcional)
        
        ver si puedo actualizar la lista de favoritos al dar clic en cerrar(opcional)
        ver si se puede modificar el menu (opcional)
        
        */
       
       
       this.crearModal(objeto ,existe);
       body.style.paddingRight = `${this.barraMedida()}px`;
       body.classList.toggle(`overflow--inactivo`);
       modal.classList.add(`activo`);
       
       requestAnimationFrame(()=>{
            const modalCard = document.querySelector(`.modal-card`);
            modalCard.classList.toggle(`show`);
        }); 
    }

    crearModal(objeto, existe) {
        const { strMeal, strInstructions, strMealThumb, idMeal, ingredients} = objeto;

        const modalDiv = document.createElement(`DIV`);
        modalDiv.classList.add(`modal-card`);

        const header = document.createElement(`SECTION`);
        header.classList.add(`modal-card__header`);

        const headerTitle = document.createElement(`H4`);
        headerTitle.classList.add(`modal-card__title`);
        headerTitle.textContent = strMeal;

        const headerCerrar = document.createElement(`BUTTON`);
        headerCerrar.classList.add(`modal-card__btn`);
        headerCerrar.textContent = `X`;

        header.appendChild(headerTitle);
        header.appendChild(headerCerrar);

        const headerHr = document.createElement(`HR`);
        
        const main = document.createElement(`SECTION`);
        main.classList.add(`modal-card__body`);
        
        const imgContainer = document.createElement(`DIV`);
        imgContainer.classList.add(`modal-card__img`);
        const img = document.createElement(`IMG`); 
        img.src = strMealThumb;
        img.alt = `Imagen de la receta ${strMeal}`;
        
        imgContainer.appendChild(img);
        
        const mainInfo = document.createElement(`DIV`);
        mainInfo.classList.add(`modal-card__info`);
        
        const titleInstructions = document.createElement(`H4`);
        titleInstructions.classList.add(`modal-card__title`);
        titleInstructions.textContent = `Instrucciones`;
        
        const ingredientsP = document.createElement(`P`);
        ingredientsP.classList.add(`modal-card__p`);
        ingredientsP.textContent = strInstructions;
        
        const titleIngredients = document.createElement(`H4`);
        titleIngredients.classList.add(`modal-card__title`);
        titleIngredients.textContent = `Ingredientes y cantidades`;
        
        const ul = document.createElement(`UL`);

        ingredients.forEach(ingredient => {
            const li = document.createElement(`LI`);
            li.classList.add(`modal-card__ingrediente`);
            li.textContent = ingredient;
            ul.appendChild(li);
        });
        
        mainInfo.appendChild(titleInstructions);
        mainInfo.appendChild(ingredientsP);
        mainInfo.appendChild(titleIngredients);
        mainInfo.appendChild(ul);
        
        main.appendChild(imgContainer);
        main.appendChild(mainInfo);
        
        const bodyHr = document.createElement(`HR`);
        
        const footer = document.createElement(`SECTION`);
        footer.classList.add(`modal-card__footer`);

        const btnGuardar = document.createElement(`BUTTON`);
        btnGuardar.classList.add(`modal-card__favorito`);
        btnGuardar.dataset.id = idMeal;
        // btnGuardar.textContent = `Guardar favorito`
        (existe ? btnGuardar.textContent = `Eliminar favorito`: btnGuardar.textContent = `Guardar favorito`);

        const btnCerrar = document.createElement(`BUTTON`);
        btnCerrar.classList.add(`modal-card__cerrar`);
        btnCerrar.textContent = `Cerrar`;

        footer.appendChild(btnGuardar);
        footer.appendChild(btnCerrar);

        modalDiv.appendChild(header);
        modalDiv.appendChild(headerHr);
        modalDiv.appendChild(main);
        modalDiv.appendChild(bodyHr);
        modalDiv.appendChild(footer);

        modal.appendChild(modalDiv);
    }

    cerrarModal() {
        const modalDiv = document.querySelector(`.modal-card`);

        modalDiv.classList.remove(`show`);
        
        
        setTimeout(() => {
            body.classList.toggle(`overflow--inactivo`);
            body.style.paddingRight = `0`;
            modal.classList.remove(`activo`);
            this.limpiarHTML(modal);
        }, 300);
    }

    limpiarHTML(elemento) {
        while(elemento.firstElementChild) {
            elemento.firstElementChild.remove();
        }
    }

    cambiarTextoFavoritosBtn(texto) {
        const favorito = document.querySelector('.modal-card__favorito');
        favorito.textContent = texto;
    }

    mostrarNotificacion(texto){
        clearTimeout(temporizador);

        notificacion.classList.add(`mostrar`);
        notificacionTexto.textContent = texto;
        temporizador = setTimeout(() => {
            if (notificacion.style.display === `none`) return;
            setTimeout(() => {
                notificacion.classList.remove(`mostrar`);
            }, 1000);
        }, 15000);

    }

    cerrarNotificacion () {
        clearTimeout(temporizador);
        setTimeout(() => {
            notificacion.classList.remove(`mostrar`);
            notificacionTexto.textContent = ``;
        }, 1000);
    }

    barraMedida() {
        return (window.innerWidth - document.documentElement.clientWidth);
    }
}