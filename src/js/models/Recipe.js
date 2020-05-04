import axios from 'axios'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        } catch (error) {
            console.log(error);
            alert('something went wrong :(')
        }
    }
    calcTime() {
        //assuming that we need 15 min per 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;

    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const newIngredients = this.ingredients.map(el => {

            const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
            const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
            //1.uniform ingredients
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i])
            })

            //2.remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //3.parse ingredients into count, unit and ingredient
            return ingredient;
        })
        this.ingredients = newIngredients;
    }
}