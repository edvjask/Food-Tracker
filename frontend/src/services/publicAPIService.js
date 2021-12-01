const APP_ID = "f7133e8a";
const APP_KEY = "52719ec4bb9f6785d6dfbd676a3a52fe";

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
