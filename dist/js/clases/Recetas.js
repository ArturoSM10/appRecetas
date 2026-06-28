// import { recetasFavoitas } from "../variables.js";
let recetasFavoritas;

export class Recetas {
    constructor() {
        this.almacenamiento = `appRecetas`;
    }

    formatearIngredientes(objeto) {
        let formateo = [];
        let i = 1;
        while(i <=20) {
            if(objeto[`strIngredient${i}`] === "") break;
            let cantidadesIngredientes = objeto[`strMeasure${i}`] + " " + objeto[`strIngredient${i}`];

            formateo = [...formateo, cantidadesIngredientes]
            i++;
        }

        return {
            idMeal: objeto.idMeal,
            strMeal: objeto.strMeal,
            strMealThumb: objeto.strMealThumb,
            strInstructions: objeto.strInstructions,
            ingredients: formateo,
        }
    }

    cargarFavoritos() {
        return recetasFavoritas = JSON.parse(localStorage.getItem(this.almacenamiento)) || [];
    }

    guardarFavorito(objeto) {
        recetasFavoritas = this.cargarFavoritos();
        if (this.comprobarSiExiste(recetasFavoritas, objeto.idMeal)) return;
        localStorage.setItem(this.almacenamiento, JSON.stringify([...recetasFavoritas, objeto]));
    }

    eliminarFavorito(id) {
        recetasFavoritas = this.cargarFavoritos()
        const recetasActualizadas = recetasFavoritas.filter(receta => receta.idMeal !== id);
        localStorage.setItem(this.almacenamiento, JSON.stringify(recetasActualizadas));
    }

    comprobarSiExiste(favoritos, id) {
        return favoritos.some(favorito => favorito.idMeal === id);
    }

}