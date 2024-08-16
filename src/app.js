document.addEventListener("DOMContentLoaded", () => {
  let recipesContainer = document.getElementById("recipes");
  let singleRecipe = document.getElementById("singleRecipe");
  const searchBar = document.querySelector("#search");
  const searchbtn = document.querySelector("#btn");
  const searchHeading = document.querySelector("#searchHeading");

  searchbtn.addEventListener("click", () => {
    recipesContainer.innerHTML = "";
    singleRecipe.innerHTML = ""; // Clear previous recipe details
    let searchInput = searchBar.value;
    let capitalizedSearchInput =
      searchInput.charAt(0).toUpperCase() +
      searchInput.substring(1) +
      " Recipes";
    searchHeading.innerHTML = capitalizedSearchInput;

    fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        const recipes = data.data.recipes;
        recipes.forEach((recipe) => {
          let recipeElement = document.createElement("div");
          recipeElement.classList.add("recipe");
          recipeElement.dataset.recipeId = recipe.id; // Store recipe ID
          const text = document.createElement("div");
          const recipeTitle = document.createElement("h2");
          recipeTitle.textContent = recipe.title;
          recipeTitle.setAttribute("style", "color : #ef4444");
          const recipePublisher = document.createElement("p");
          recipePublisher.textContent = `Publisher : ${recipe.publisher}`;
recipePublisher.style.fontSize = "14px"
          const recipeImage = document.createElement("img");
          recipeImage.src = recipe.image_url;
          recipeImage.classList.add("image");

          text.appendChild(recipeTitle);
          text.appendChild(recipePublisher);
          recipeElement.appendChild(recipeImage);
          recipeElement.appendChild(text);
          recipeElement.addEventListener("click", () => {
            fetch(
              `https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}`
            )
              .then((response) => response.json())
              .then((data) => {
                const recipeDetails = data.data.recipe;
                singleRecipe.innerHTML = ""; // Clear previous details
                const recipeImage = document.createElement("img");
                recipeImage.src = recipeDetails.image_url;
                recipeImage.style.width = "100%"
                const recipeTitle = document.createElement("h2");
                recipeTitle.textContent = recipeDetails.title;
                recipeTitle.setAttribute("style", "font-size: 25px; margin-bottom: 10px; color: #ef4444;");

                const ingredientHeading = document.createElement("h2");
                ingredientHeading.innerHTML = "Recipe Ingredients";
                ingredientHeading.setAttribute("style", "color : #ef4444;font-size:20px;margin:10px 0px");
                const recipeIngredients = document.createElement("ul");
                recipeDetails.ingredients.forEach((ingredient) => {
                  const ingredientItem = document.createElement("li");
                  ingredientItem.textContent = ` ${ingredient.quantity || ""} ${
                    ingredient.unit || ""
                  } ${ingredient.description || ""}`;
                  recipeIngredients.appendChild(ingredientItem);
                });
                singleRecipe.appendChild(recipeTitle);
                singleRecipe.appendChild(recipeImage);
                singleRecipe.appendChild(ingredientHeading);
                singleRecipe.appendChild(recipeIngredients);

                // Adjust layout
                singleRecipe.classList.add("expanded");
              })
              .catch((error) => {
                console.error("Error fetching recipe details:", error);
              });
          });

          recipesContainer.appendChild(recipeElement);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
});
