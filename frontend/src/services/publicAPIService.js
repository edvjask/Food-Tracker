const APP_ID = "36385a6f";
const APP_KEY = "45b5b9a7050303aef9fbee0d812be88e";

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

export const getIngredientInfoByName = async (name) => {
  try {
    const data = {
      query: name,
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
