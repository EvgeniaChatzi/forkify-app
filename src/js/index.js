import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'


/** Global State of the App
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}


/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
    //1.Get the query from View
    //const query = searchView.getInput();
    const query = 'pizza';


    if (query) {
        //2.New search object and add it to State
        state.search = new Search(query);

        //3.Prepare UI for the results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4.Search for recipes
            await state.search.getResult();

            //5. Render results on UI after the API returns the results
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('something went wrong :(');
            clearLoader();
        }

    }
}

elements.searchButton.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//TESTING
window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage)
    }
})

const search = new Search('pizza');
console.log(search)

/**
 * RECIPE CONTROLLER
 */

//get the Id from the URL
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        //prepare UI for changes

        //create a new Recipe object
        state.recipe = new Recipe(id);

        //TESTING
        window.r = state.recipe;

        try {
            //get recipe data
            await state.recipe.getRecipe();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render the recipe on the UI
            console.log(state.recipe);
        } catch (error) {
            alert('Error processing recipe :(');
        }


    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const r = new Recipe(54454);
r.getRecipe();
console.log(r);


