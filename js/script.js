const SearchButton = document.querySelector(".search-btn");
const InputFeild = document.querySelector(".input-feild");
const RecipeContainer = document.querySelector(".recipe-container");
const recipeDetails = document.querySelector(".recipe-details");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeDetailsContent = document.querySelector(".recipe-details-content");


console.log(SearchButton)
SearchButton.addEventListener('click',fetchRecipes);

async function fetchRecipes(){
    RecipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const InputFeild = document.querySelector(".input-feild").value;
    if(!InputFeild){
        RecipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`
        return;
    }
    try
    {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${InputFeild}`);
        const response = await data.json();
        
        RecipeContainer.innerHTML = "";
    
     response.meals.forEach((recipe)=>{
    
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
             recipeDiv.innerHTML =
                `<img src="${recipe.strMealThumb}"/>
                <h1>${recipe.strMeal}</h1>
                <p><span>${recipe.strArea}</span> Dish</p>
                <p>Belongs to <span>${recipe.strCategory}</span> Category</p>`
    
            const button = document.createElement("button");
            button.innerHTML = 'View Recipe';
           // Recipebutton.classList.add("recipe-btn");
            recipeDiv.appendChild(button);
            console.log(button);
    
            RecipeContainer.appendChild(recipeDiv);
            document.querySelector(".input-feild").value = "";
            
            button.addEventListener("click",()=>{
                OpenRecipe(recipe);
            });
        });
    }catch(error){
        RecipeContainer.innerHTML = `<h2>Error in fetching Recipes...</h2>`
    }
    
}
// function to fetch ingredent and messurements
const fetchIngredients = (recipe) =>{
console.log(recipe);
let ingredentList = "";
for(let i = 1; i<=20; i++)
{
    const ingredient = recipe[`strIngredient${i}`];
    if(ingredient)
    {
        const measure = recipe[`strMeasure${i}`];
        ingredentList += `<li>${measure} ${ingredient}</li>`
    }
    else
    {
        break;
    }
}
return ingredentList;

}

const OpenRecipe = (recipe) =>
    {
    recipeDetailsContent.innerHTML = `<h2 class="recipeName">${recipe.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="IngredientList">${fetchIngredients(recipe)}</ul>
    <div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p >${recipe.strInstructions}</p>
    </div>`

    
    recipeDetails.style.display = "block";
    }


    recipeCloseBtn.addEventListener("click",()=>{
        recipeDetails.style.display = "none"
    })






