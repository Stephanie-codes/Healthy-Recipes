// Function to display favourites on the favourites html page
const displayFavourites = () => {
  const favouritesContainer = document.getElementById("favourites-container");
  const favorites = JSON.parse(localStorage.getItem("favourites")) || [];

  favouritesContainer.innerHTML = ""; // Clear previous favourites

  if (favorites.length > 0) {
    const favouriteElements = favorites.map((fav) => {
      const favouriteItem = document.createElement("div");
      favouriteItem.className = "newItem";

      // Create elements for the favorite recipe
      const newImage = document.createElement("img");
      const newTitle = document.createElement("h3");
      const newLink = document.createElement("a");
      const newCalories = document.createElement("p");
      const newYield = document.createElement("p");
      const newPerServing = document.createElement("p");

      // Set attributes and content for the new elements
      newImage.src = fav.image;
      newTitle.textContent = fav.label;
      newLink.href = fav.url;
      newLink.textContent = "View Recipe";
      newCalories.textContent = "Total Calories: " + Math.round(fav.calories) + "kcal";
      newYield.textContent = "Servings: " + fav.yield;
      newPerServing.textContent = "Calories Per Serving: " + Math.round(fav.calories / fav.yield) + "kcal";

      // Append new elements to the container
      favouriteItem.appendChild(newImage);
      favouriteItem.appendChild(newTitle);
      favouriteItem.appendChild(newLink);
      favouriteItem.appendChild(newCalories);
      favouriteItem.appendChild(newYield);
      favouriteItem.appendChild(newPerServing);

      return favouriteItem;
    });

    favouritesContainer.append(...favouriteElements);
  } else {
    favouritesContainer.textContent = "No favourites yet.";
  }
};

// Call displayFavourites to show existing favourites on page load
displayFavourites();
