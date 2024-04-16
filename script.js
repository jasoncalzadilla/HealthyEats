// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
    const dataDisplay = document.getElementById("nutritionalInfo");
    const nutritionDetails = document.getElementById("nutritionDetails");
    const foodsDatalist = document.getElementById("foods");
    const foodsChoice = document.getElementById("foods-choice");
    const itemsDisplay = document.getElementById("itemsDisplay");
    let selectedItems = []; //To Store the Item in the Array for display and Calculate the Calories
  
    //Function to display nutritional information
    function displayNutritionalInfo(food, category) {
      const nutrients = food.nutrients;
      typicalValues.innerHTML = `
      <div>Category: ${category}</div><br>
      
    `;
      nutritionDetails.innerHTML = `
            <div>Protein: ${nutrients.protein}</div><br>
            <div>Carbohydrates: ${nutrients.carbohydrates}</div><br>
            <div>Fat: ${nutrients.fat}</div><br>
            <div>Calories: ${nutrients.calories}</div><br>
          `;
      dataDisplay.style.display = "flex";
    }
  
    //that function update the items that user add in the list to calculate the calories
    function updateItemsDisplay() {
      itemsDisplay.innerHTML = "";
      selectedItems.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.innerText = `${index + 1}: ${item.name}`;
        itemsDisplay.appendChild(itemElement);
      });
    }
  
    //Function to load food data and populate datalist
    function loadFoodData() {
      fetch("food.json")
        .then((response) => response.json())
        .then((data) => {
          for (const category in data.food_categories) {
            data.food_categories[category].forEach((food) => {
              const option = document.createElement("option");
              option.value = food.name;
              foodsDatalist.appendChild(option);
            });
          }
        })
        .catch((error) => console.error("Error fetching JSON data:", error));
    }
  
    loadFoodData();
  
    //that function add the item in the array
    addItem.addEventListener("click", function () {
      console.log("Add Item Button Click");
      const selectedFoodName = foodsChoice.value;
      if (selectedFoodName) {
        fetch("food.json")
          .then((response) => response.json())
          .then((data) => {
            const foodCategories = data.food_categories;
            for (const category in foodCategories) {
              const foods = foodCategories[category];
              for (const food of foods) {
                if (food.name === selectedFoodName) {
                  selectedItems.push(food);
                  selectedItems.forEach((item) => console.log(item));
                  updateItemsDisplay();
                  return;
                }
              }
            }
            dataDisplay.style.display = "none";
          })
          .catch((error) => console.error("Error fetching JSON data:", error));
      }
    });
  
    // Function to calculate the sum of calories
    function calculateCalories() {
      let totalCalories = selectedItems.reduce(
        (total, item) => total + parseFloat(item.nutrients.calories),
        0
      );
  
      const caloriesDisplay = document.createElement("div");
      caloriesDisplay.textContent = "Total Calories: " + totalCalories + "calories";
  
      const button = document.getElementById("CalculateCalories");
      button.parentNode.insertBefore(caloriesDisplay, button);
  
      // alert("Single Digit Sum: " + totalCalories);
    }
  
    //Event Listener to Calculate the Calories
    CalculateCalories.addEventListener("click", function () {
      calculateCalories();
    });
  
    //for display the Nutrition
    displayButton.addEventListener("click", function () {
      const selectedFoodName = foodsChoice.value;
      if (selectedFoodName) {
        fetch("food.json")
          .then((response) => response.json())
          .then((data) => {
            const foodCategories = data.food_categories;
            for (const category in foodCategories) {
              const foods = foodCategories[category];
              for (const food of foods) {
                if (food.name === selectedFoodName) {
                  displayNutritionalInfo(food, category);
  
                  return;
                }
              }
            }
            dataDisplay.style.display = "none";
          })
          .catch((error) => console.error("Error fetching JSON data:", error));
      }
    });
  });
  