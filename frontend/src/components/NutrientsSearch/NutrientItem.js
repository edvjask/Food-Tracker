import { Button, Paper, Typography } from "@mui/material";

export const NutrientItem = ({ item, setActiveId, openModal }) => {
  const handleModalOpen = (e) => {
    e.preventDefault();
    if (item.id) {
      setActiveId(item.id);
      openModal(true);
    }
  };

  return (
    <Paper elevation={3}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img src={item.image} width={"100px"} alt={item.title} />
            <Typography variant={"body1"}>{item.title}</Typography>
          </div>
          <div style={{ marginTop: 10 }}>
            <strong>Nutritional info</strong>
          </div>
          <div>
            {`Calories: ${item.calories}kcal, Protein: ${item.protein}, Carbohydrates: ${item.carbs}, Fat: ${item.fat}`}
          </div>
        </div>
        <Button variant={"outlined"} onClick={handleModalOpen}>
          More info
        </Button>
      </div>
    </Paper>
  );
};
