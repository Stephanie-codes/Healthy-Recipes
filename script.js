// // Using asynchronous function as it might take time to complete
// getRecipes = async () => {
//   // Selecting DOM elements
//   const submit = document.querySelector("#submit");
//   const diet = document.querySelector("#diet");
//   const ingredient = document.querySelector("#ingredient");
//   const calories = document.querySelector("#calories");
//   const recipes = document.querySelector("#output");

//   // API credentials
//   const apiId = "e3ba27a3";
//   const apiKey = "75067f98dc574dbe3884605d1018d5ea";

//   // Adding an event listener to the submit button
//   submit.addEventListener("click", async () => {
//     // Retrieving values from the user input
//     const selectedDiet = diet.value;
//     const selectedIngredient = ingredient.value;
//     const selectedCalories = calories.value;
//     try {
//       // Fetching data from the API endpoint using the 'fetch' function & using await keyword, which lets you pause the execution of the function until the promise is resolved or rejected.
//       const response = await fetch(
//         `https://api.edamam.com/api/recipes/v2?type=public&q=${selectedIngredient}&app_id=${apiId}&app_key=${apiKey}&diet=${selectedDiet}&calories=${selectedCalories}`
//       );

//       // Parsing the response data as JSON
//       const data = await response.json();

//       // Clear previous results
//       recipes.innerHTML = "";

//       // Checking if there are hits in the data
//       if (data.hits && data.hits.length > 0) {
//         // Using map() to create an array of recipe elements
//         const recipeElements = data.hits.map((hit) => {
//           const firstRecipe = hit.recipe;

//           console.log(hit.recipe);

//           // Creating new DOM elements for each recipe
//           const newItem = document.createElement("div");
//           //To add CSS Styling
//           newItem.className = "newItem";
//           const newImage = document.createElement("img");
//           const newTitle = document.createElement("h3");
//           const newLink = document.createElement("a");
//           const newCalories = document.createElement("p");
//           const newYield = document.createElement("p")
//           const newPerServing = document.createElement("p")
//           const numCalories = Number(firstRecipe.calories) //using Number to convert the JSON text
//           const numYield = Number(firstRecipe.yield)

//           // Adding the favourites button
//           function addToFavourites(recipe) {
//             // Retrieve existing favorites from local storage
//             const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
//             // Check if the recipe is already in favorites
//             const isAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label);
//             if (!isAlreadyInFavorites) {
//               // Add the recipe to favorites
//               favorites.push(recipe);
//               // Save the updated favorites back to local storage
//               localStorage.setItem("favourites", JSON.stringify(favorites));
//               console.log("Recipe added to favourites:", recipe);
//             } else {
//               console.log("Recipe is already in favourites.");
//             }
//             // console.log("Recipe added to favourites:", recipe);
//           }
//           const addToFavouritesContainer = document.createElement("div");
//           const imgElement = document.createElement("img");
//           imgElement.src = "images/heart1.png";
//           imgElement.alt = "Add to Favourites";
//           imgElement.classList.add("addToFav");
//           imgElement.addEventListener("click", () => {
//             console.log("Before addToFavourites");
//             addToFavourites(firstRecipe);
//             console.log("After addToFavourites");
//             // Change the image source permanently after clicking
//             imgElement.src = "images/heart2.png";
//             console.log("Image source changed to heart2.png");
//           });
//           addToFavouritesContainer.appendChild(imgElement);

//           // Setting attributes and content for the new elements
//           newImage.src = firstRecipe.image;
//           newTitle.textContent = firstRecipe.label;
//           newLink.href = firstRecipe.url;
//           newLink.textContent = "View Recipe";
//           newCalories.textContent = "Total Calories: " + Math.round(numCalories) + "kcal";
//           newYield.textContent = "Servings: " + numYield;
//           newPerServing.textContent = "Calories Per Serving: " + Math.round(numCalories / numYield) + "kcal"; //Math.round to round to the nearest whole number (remove any decimals) & dividing the total calories by the serving number to get kcal per serving 

//           // Appending new elements to the container
//           newItem.appendChild(newImage);
//           newItem.appendChild(newTitle);
//           newItem.appendChild(newLink);
//           newItem.appendChild(newCalories);
//           newItem.appendChild(newYield);
//           newItem.appendChild(newPerServing);
//           newItem.appendChild(addToFavouritesContainer);

//           return newItem; // Returning the new item for each recipe

//         });

//         // Appending the array of recipe elements to the 'recipes' container
//         recipes.append(...recipeElements);
//       }

//       //shows the output since initial html display: none
//       recipes.style.display = "flex";
//     } catch (error) {
//       // Handling errors during the asynchronous operations
//       console.error("Error fetching data:", error);
//     }
//   });
// };

// getRecipes();


//Re- write the above in separate functions 
// Selecting DOM elements
const submit = document.querySelector("#submit");
const diet = document.querySelector("#diet");
const ingredient = document.querySelector("#ingredient");
const calories = document.querySelector("#calories");
const recipes = document.querySelector("#output");
// API credentials
const apiId = "e3ba27a3";
const apiKey = "75067f98dc574dbe3884605d1018d5ea";

// Function to handle the submit event
const handleSubmit = async () => {
  const recipesData = await getRecipes();

  if (recipesData?.hits?.length) {
    const recipeElements = createRecipeElements(recipesData);
    recipes.innerHTML = "";
    recipes.append(...recipeElements);
  } else {
    console.log("error, no recipes found")
  }
  //shows the output since initial html display: none
  recipes.style.display = "flex";
};

// Function which just deals with data fetching 
const getRecipes = async () => {
  const selectedDiet = diet.value;
  const selectedIngredient = ingredient.value;
  const selectedCalories = calories.value;
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${selectedIngredient}&app_id=${apiId}&app_key=${apiKey}&diet=${selectedDiet}&calories=${selectedCalories}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error getting data", error);
    return false;
  }
};

// Function to create HTML elements
const createRecipeElements = (recipes) => {
  const recipeElements = recipes.hits.map((hit) => {
    const firstRecipe = hit.recipe;
    // Creating new DOM elements for each recipe
    const newItem = document.createElement("div");
    newItem.className = "newItem";
    const newImage = document.createElement("img");
    const newTitle = document.createElement("h3");
    const newLink = document.createElement("a");
    const newCalories = document.createElement("p");
    const newYield = document.createElement("p")
    const newPerServing = document.createElement("p")
    const numCalories = Number(firstRecipe.calories) //using Number to convert the JSON text
    const numYield = Number(firstRecipe.yield)

    // Adding the favourites button
    function addToFavourites(recipe) {
      // Retrieve existing favorites from local storage
      const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
      // Check if the recipe is already in favorites
      const isAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label);
      if (!isAlreadyInFavorites) {
        // Add the recipe to favorites
        favorites.push(recipe);
        // Save the updated favorites back to local storage
        localStorage.setItem("favourites", JSON.stringify(favorites));
        console.log("Recipe added to favourites:", recipe);
      } else {
        console.log("Recipe is already in favourites.");
      }
      // console.log("Recipe added to favourites:", recipe);
    }
    const addToFavouritesContainer = document.createElement("div");
    const imgElement = document.createElement("img");
    imgElement.src = "images/heart1.png";
    imgElement.alt = "Add to Favourites";
    imgElement.classList.add("addToFav");
    imgElement.addEventListener("click", () => {
      console.log("Before addToFavourites");
      addToFavourites(firstRecipe);
      console.log("After addToFavourites");
      // Change the image source permanently after clicking
      imgElement.src = "images/heart2.png";
      console.log("Image source changed to heart2.png");
    });
    addToFavouritesContainer.appendChild(imgElement);

    // Setting attributes and content for the new elements
    newImage.src = firstRecipe.image;
    newTitle.textContent = firstRecipe.label;
    newLink.href = firstRecipe.url;
    newLink.textContent = "View Recipe";
    newCalories.textContent = "Total Calories: " + Math.round(numCalories) + "kcal";
    newYield.textContent = "Servings: " + numYield;
    newPerServing.textContent = "Calories Per Serving: " + Math.round(numCalories / numYield) + "kcal"; //Math.round to round to the nearest whole number (remove any decimals) & dividing the total calories by the serving number to get kcal per serving 

    // Appending new elements to the container
    newItem.appendChild(newImage);
    newItem.appendChild(newTitle);
    newItem.appendChild(newLink);
    newItem.appendChild(newCalories);
    newItem.appendChild(newYield);
    newItem.appendChild(newPerServing);
    newItem.appendChild(addToFavouritesContainer);

    return newItem; // Returning the new item for each recipe

  });

  return recipeElements;
};

// Attach your handleSubmit function to the submit element
submit.addEventListener("click", handleSubmit);

// Call the main function
getRecipes();
