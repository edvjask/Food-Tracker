import * as React from "react";
import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

export const FoodItem = ({ food, setActiveFoodItem, setModalOpen }) => {
  const handleClick = () => {
    setActiveFoodItem(food);
    setModalOpen(true);
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
      </div>
    </Paper>
  );
};
