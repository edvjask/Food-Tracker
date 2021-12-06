import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, Modal } from "@mui/material";
import "./styles.css";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { getIngredientInfoByName } from "../../services/publicAPIService";
import { NutritionTable } from "./NutritionTable";
import AddIcon from "@mui/icons-material/Add";
import {useAuth0} from "@auth0/auth0-react";

export const FoodDetailsModal = ({
  foodItem,
  open,
  handleClose,
  setOpenAdd,
  setMealToAdd,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
  };

  const [ingredients, setIngredients] = useState([]);
  const [ingredientsNutrition, setIngredientsNutrition] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculatedCals, setCalculatedCals] = useState(0);

  const {isAuthenticated} = useAuth0();

  useEffect(() => {
    if (foodItem) {
      const ingr = [];
      [...Array(20)].forEach((el, i) => {
        const name = foodItem[`strIngredient${i + 1}`];
        const amount = foodItem[`strMeasure${i + 1}`];

        if (name) {
          ingr.push({ name: name, amount: amount });
        }
      });
      setIngredients(ingr);
    }
  }, [foodItem]);

  //fetch calorie info for table
  useEffect(() => {
    const getInfo = async () => {
      if (ingredients.length) {
        setLoading(true);
        const response = await getIngredientInfoByName(ingredients);
        if (response && response.foods) {
          setIngredientsNutrition(response.foods);
          let total = 0;
          response.foods.forEach((el, i) => {
            total += el["nf_calories"];
          });
          setCalculatedCals(Math.round(total));
        }
        setLoading(false);
      }
    };

    getInfo();
  }, [ingredients]);

  const handleAddMeal = (e) => {
    e.preventDefault();
    setOpenAdd(true);
    setMealToAdd({ name: foodItem.strMeal, cal: calculatedCals });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h4">
              {foodItem && foodItem.strMeal}
            </Typography>
            {isAuthenticated ? <IconButton size={"large"} onClick={handleAddMeal}>
              <AddIcon sx={{ fontSize: "40px", fill: "#3F5DCA" }} />
            </IconButton> : null}
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} />
          <Typography variant="h5">Instructions:</Typography>
          <p>{foodItem && foodItem.strInstructions}</p>
          <Typography variant="h6">Ingredients:</Typography>
          <NutritionTable
            nutritionInfo={ingredientsNutrition}
            loading={loading}
          />
          <Typography
            variant={"h5"}
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Video
          </Typography>
          <div>
            {foodItem && <ReactPlayer url={foodItem.strYoutube} controls />}
          </div>
        </Box>
      </Modal>
    </>
  );
};
