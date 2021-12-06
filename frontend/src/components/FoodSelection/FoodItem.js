import * as React from "react";
import { Button, IconButton, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

export const FoodItem = ({
  food,
  setActiveFoodItem,
  setModalOpen,
  setOpenAdd,
  setMealToAdd,
  calculatedCals,
}) => {
  const handleClick = () => {
    setActiveFoodItem(food);
    setModalOpen(true);
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    setOpenAdd(true);
    setMealToAdd({ name: food.strMeal, cal: calculatedCals });
  };

  return (
    <Paper
      elevation={3}
      component={"div"}
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        variant={"h6"}
        sx={{
          marginTop: "20px",
        }}
      >
        {food.strMeal}
      </Typography>
      <div style={{ marginTop: "10px" }}>
        <img
          src={food.strMealThumb}
          width={128}
          height={128}
          alt={`Thumbnail of ${food.strMeal}`}
          style={{
            margin: "0 auto",
          }}
        />
      </div>
      <div>
        <Typography variant={"body"}>{food.strArea}</Typography>
      </div>
      <div
        style={{
          marginTop: "30px",
        }}
      >
        <Button variant={"outlined"} onClick={handleClick}>
          More
        </Button>
        <IconButton onClick={handleAddMeal}>
          <AddIcon />
        </IconButton>
      </div>
    </Paper>
  );
};
