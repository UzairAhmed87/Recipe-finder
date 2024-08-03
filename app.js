document.addEventListener("DOMContentLoaded", () => {
  let recipesContainer = document.getElementById("recipes");
  const searchBar = document.querySelector("#search");
  const searchbtn = document.querySelector("#btn");
  const searchHeading = document.querySelector("#searchHeading");
  searchbtn.addEventListener("click", () => {
    recipesContainer.innerHTML = ""
    let searchInput = searchBar.value;
    let capitalizedSearchInput =
      searchInput.charAt(0).toUpperCase() +
      searchInput.substring(1) +
      " " +
      "Recipes";
    searchHeading.innerHTML = capitalizedSearchInput;

    fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchInput}`
    )
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
        const recipes = data.data.recipes;
        recipes.forEach((recipe) => {
          let recipeElement = document.createElement("div");
          recipeElement.classList.add("recipe");
          const text = document.createElement("div");

          const recipeTitle = document.createElement("h2");
          recipeTitle.textContent = recipe.title;

          const recipePublisher = document.createElement("p");
          recipePublisher.textContent =  recipe.publisher;

          const recipeImage = document.createElement("img");
          recipeImage.src = recipe.image_url;
          recipeImage.classList.add("image")
          text.appendChild(recipeTitle);
          text.appendChild(recipePublisher);
          recipeElement.appendChild(recipeImage);
          recipeElement.appendChild(text);

          recipesContainer.appendChild(recipeElement);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
});
