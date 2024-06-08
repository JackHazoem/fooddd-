const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

const fetchRecipes = async (query) => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    displayRecipes(response.meals);
}

const displayRecipes = (recipes) => {
    recipeContainer.innerHTML = ''; // Clear previous results
    if (recipes) {
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <h3>${recipe.strMeal}</h3>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <p>${recipe.strInstructions}</p>
            `;
            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        recipeContainer.innerHTML = '<p>No recipes found. Please try another search term.</p>';
    }
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (searchInput) {
        fetchRecipes(searchInput);
    }
});
