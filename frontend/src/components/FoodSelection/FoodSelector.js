import * as React from "react";
import { useEffect, useState } from "react";
import { getFoodsByName } from "../../services/publicAPIService";
import Box from "@mui/material/Box";
import { FoodItem } from "./FoodItem";
import { SearchInput } from "../SearchInput";
import { Alert, Snackbar } from "@mui/material";
import { FoodDetailsModal } from "./FoodDetailsModal";
import { AddFoodDialog } from "./AddFoodDialog";

export const FoodSelector = () => {
  const [foods, setFoods] = useState();
  const [foodInput, setFoodInput] = useState("");
  const [searchToggle, setSearchToggle] = useState(false);
  const [modalFoodItem, setModalFoodItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [mealToAdd, setMealToAdd] = useState();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [calculatedCals, setCalculatedCals] = useState(0);

  useEffect(() => {
    const getFoods = async () => {
      let resp = await getFoodsByName(foodInput);
      if (resp) {
        if (resp.meals) {
          setFoods(resp.meals);
        } else {
          setSnackOpen(true);
        }
      }
    };
    if (foodInput) {
      getFoods();
    }
    //eslint-disable-next-line
  }, [searchToggle]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SearchInput
        input={foodInput}
        label={"Food Search"}
        setInput={setFoodInput}
        toggleSearch={setSearchToggle}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 320,
            height: 380,
          },
        }}
      >
        {foods &&
          foods.map((el) => (
            <FoodItem
              key={el.idMeal}
              food={el}
              setModalOpen={setModalOpen}
              setActiveFoodItem={setModalFoodItem}
              setMealToAdd={setMealToAdd}
              setOpenAdd={setAddModalOpen}
              calculatedCals={calculatedCals}
            />
          ))}
      </Box>
      <FoodDetailsModal
        foodItem={modalFoodItem}
        open={modalOpen}
        handleClose={handleModalClose}
        setCalculatedCals={setCalculatedCals}
        setOpenAdd={setAddModalOpen}
        setMealToAdd={setMealToAdd}
      />
      <AddFoodDialog
        open={addModalOpen}
        setOpen={setAddModalOpen}
        meal={mealToAdd}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          No foods found!
        </Alert>
      </Snackbar>
    </>
  );
};
