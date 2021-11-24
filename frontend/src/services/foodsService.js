export const getFoodsByName = async (name) => {
  try {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const foods = await resp.json();
    return foods;
  } catch (err) {
    console.error("Error getting foods", err);
  }
};
