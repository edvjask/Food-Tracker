import { IconButton, Paper, Typography } from "@mui/material";
import { Meal } from "./Meal";
import DeleteIcon from "@mui/icons-material/Delete";

export const PlanItem = ({ item, openDelete, setIdToDelete }) => {
  const { breakfast, lunch, dinner } = item.meals;

  const date = new Intl.DateTimeFormat("lt-LT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(item.date);

  const handleDelete = (e) => {
    e.preventDefault();
    setIdToDelete(item["_id"]);
    openDelete(true);
  };

  return (
    <Paper elevation={3} sx={{}}>
      <Typography
        sx={{ textAlign: "center", margin: "20px auto" }}
        variant={"h5"}
      >
        {item.name}
      </Typography>
      <Typography sx={{ textAlign: "center" }} variant={"h6"}>
        Breakfast
      </Typography>
      {breakfast.meal ? (
        <Meal name={breakfast.meal} cal={breakfast.calories} />
      ) : (
        <div style={{ textAlign: "center" }}>-</div>
      )}
      <Typography sx={{ textAlign: "center" }} variant={"h6"}>
        Lunch
      </Typography>
      {lunch.meal ? (
        <Meal name={lunch.meal} cal={lunch.calories} />
      ) : (
        <div style={{ textAlign: "center" }}>-</div>
      )}
      <Typography sx={{ textAlign: "center" }} variant={"h6"}>
        Dinner
      </Typography>
      {dinner.meal ? (
        <Meal name={dinner.meal} cal={dinner.calories} />
      ) : (
        <div style={{ textAlign: "center" }}>-</div>
      )}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Created on: {date}
        <IconButton
          size={"small"}
          aria-label={"delete plan"}
          onClick={handleDelete}
          color={"inherit"}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </Paper>
  );
};
