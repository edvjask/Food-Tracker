import * as React from "react";
import { useState } from "react";
import { getRecipeByNutrients } from "../../services/publicAPIService";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { sliderLabelsAndRanges } from "../../enums/NutrientsSettings";
import { Button, Paper, Slider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { NutrientItem } from "./NutrientItem";
import { RecipeModal } from "./RecipeModal";

export const ByNutrientSearchMain = () => {
  const minDistance = 10;

  const [searchValues, setSearchValues] = useState({
    cal: [50, 300],
    carbs: [10, 100],
    fat: [10, 100],
    protein: [10, 100],
  });
  const [foods, setFoods] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleInputChange = (event, newValue, activeThumb, slider, max) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);
        setSearchValues({
          ...searchValues,
          [slider]: [clamped, clamped + minDistance],
        });
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setSearchValues({
          ...searchValues,
          [slider]: [clamped - minDistance, clamped],
        });
      }
    } else {
      setSearchValues({ ...searchValues, [slider]: newValue });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const getRecipes = async () => {
      let nutrients = {};
      Object.entries(searchValues).forEach(([key, value]) => {
        const [min, max] = value;
        switch (key) {
          case "carbs":
            nutrients = { ...nutrients, minCarbs: min, maxCarbs: max };
            break;
          case "cal":
            nutrients = { ...nutrients, minCalories: min, maxCalories: max };
            break;
          case "protein":
            nutrients = { ...nutrients, minProtein: min, maxProtein: max };
            break;
          case "fat":
            nutrients = { ...nutrients, minFat: min, maxFat: max };
            break;
          default:
            break;
        }
      });

      const resp = await getRecipeByNutrients(nutrients);
      if (resp) {
        setFoods(resp);
      }
    };
    getRecipes();
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={Paper}
          sx={{
            margin: "20px 20px",
            width: 800,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          {sliderLabelsAndRanges.map((el, i) => (
            <div
              key={el.label}
              style={{
                display: "flex",
                gap: "90px",
                marginBottom:
                  i !== sliderLabelsAndRanges.length - 1 ? "30px" : "inherit",
              }}
            >
              <Typography gutterBottom>{el.label}</Typography>
              <Slider
                getAriaLabel={() => el.label}
                value={searchValues[el.val]}
                onChange={(e, n, a) =>
                  handleInputChange(e, n, a, el.val, el.max)
                }
                valueLabelDisplay="on"
                disableSwap
                min={el.min}
                max={el.max}
              />
            </div>
          ))}
        </Box>
        <Button
          variant={"contained"}
          onClick={handleSearch}
          sx={{
            height: "40px",
            width: "100px",
          }}
        >
          Search
        </Button>
      </div>
      <Divider />
      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            p: 1,
            width: "80%",
            height: "200px",
          },
        }}
      >
        {foods &&
          foods.map((el, i) => (
            <NutrientItem
              key={el.id}
              item={el}
              setActiveId={setActiveId}
              openModal={setModalOpen}
            />
          ))}
      </Box>
      <RecipeModal
        open={modalOpen}
        handleClose={handleModalClose}
        activeId={activeId}
      />
    </>
  );
};
