const APP_ID = "f7133e8a";
const APP_KEY = "52719ec4bb9f6785d6dfbd676a3a52fe";
const SPOONACULAR_API_KEY = "c1098f0bc0bc42f4ab4c0050115d8af6";

export const getFoodsByName = async (name) => {
  try {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    return await resp.json();
  } catch (err) {
    console.error("Error getting foods", err);
  }
};

export const getIngredientInfoByName = async (ingredients) => {
  try {
    let query = "";
    ingredients.forEach((el, i) => {
      if (i !== 0) query = query.concat(` and ${el.amount} of ${el.name}`);
      else query = query.concat(`${el.amount} of ${el.name}`);
    });

    const data = {
      query: query,
    };

    const resp = await fetch(
      `https://trackapi.nutritionix.com/v2/natural/nutrients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": APP_ID,
          "x-app-key": APP_KEY,
          "x-remote-user-id": "0",
        },
        body: JSON.stringify(data),
      }
    );
    return await resp.json();
  } catch (err) {
    console.error(err);
  }
};

export const getDrinksByName = async (name) => {
  try {
    const resp = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );
    return await resp.json();
  } catch (err) {
    console.error(err);
  }
};

export const getRandomDrink = async () => {
  try {
    const resp = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await resp.json();
  } catch (err) {
    console.error(err);
  }
};

//recipe by nutrients

//test object
const values = {
  minCarbs: 10,
  maxCarbs: 150,
  minProtein: 30,
  maxProtein: 300,
  minFat: 10,
  maxFat: 50,
  minCalories: 100,
  maxCalories: 300,
};

const BASE_URL = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${SPOONACULAR_API_KEY}`;
export const getRecipeByNutrients = async (ingredients) => {
  try {
    let urlToFetch = BASE_URL;
    //add given properties
    Object.entries(ingredients).forEach(([key, value]) => {
      if (value) {
        urlToFetch = urlToFetch.concat(`&${key}=${value}`);
      }
    });
    const resp = await fetch(urlToFetch);
    return await resp.json();
  } catch (ex) {
    console.error(ex);
  }
};
