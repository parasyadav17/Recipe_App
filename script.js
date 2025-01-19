let searchBox = document.querySelector(".searchBox");
let searchBtn = document.querySelector(".searchBtn");
let rcpContainer = document.querySelector(".recipeContainer");
let rcpDetailsContent = document.querySelector(".recipeDetailsContent");
let rcpCloseBtn = document.querySelector(".recipeCloseBtn");
let h2 = document.querySelector("#scndtitle");

const BASE_URL = "https://themealdb.com/api/json/v1/1/search.php?s=Arrabiata";

const fetchRecipe = async (query) => {
  rcpContainer.innerHTML = "Fetching Recipes...";
  const data = await fetch(
    `https://themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();
  // console.log(response.meals[0]);
  rcpContainer.innerHTML = " ";
  h2.innerHTML="";
  response.meals.forEach((meal) => {


    console.log(meal.strMeal);
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
        
            <img src="${meal.strMealThumb}"/>
            <h3> ${meal.strMeal} </h3>
            <p>Origin : ${meal.strArea}</p>
            <p> Category : ${meal.strCategory}</p>
        
            `;
    const button = document.createElement("button");
    button.textContent = "Learn to Make This Item";
    button.classList.add("rcpbtn");
    recipeDiv.appendChild(button);

    button.addEventListener("click", () => {
      openrecipepopup(meal);
    });

    rcpContainer.appendChild(recipeDiv);
  });
};

// Fetching Ingredients

const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];

    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};
const openrecipepopup = (meal) => {
  rcpDetailsContent.innerHTML = `

    <h2 class = "recipeName class = "ingredientList"">${meal.strMeal}</h2>
    <h3>Ingreients:</h3>
    <ul class = "ingredientList">${fetchIngredients(meal)}</ul> 
    <div  class="instructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    
    `;

    
  rcpDetailsContent.parentElement.style.display = "block";
};

rcpCloseBtn.addEventListener("click", ()=>{
    rcpDetailsContent.parentElement.style.display = "none";
    
})

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipe(searchInput);
});
