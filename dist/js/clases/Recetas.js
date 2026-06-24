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

}