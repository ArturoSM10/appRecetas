import { select, cardContainer } from "../selectores.js";

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
            btnCard.textContent = `Ver receta`;
            divCardInfo.appendChild(mealTitle);
            divCardInfo.appendChild(btnCard);

            divCard.appendChild(divImgContainer);
            divCard.appendChild(divCardInfo);

            cardContainer.appendChild(divCard);
        }); 
    }
    
}