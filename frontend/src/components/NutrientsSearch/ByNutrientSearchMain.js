import * as React from "react";
import { useEffect, useState } from "react";
import {
  getRecipeByNutrients,
} from "../../services/publicAPIService";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { sliderLabelsAndRanges } from "../../enums/NutrientsSettings";
import { Paper, Slider } from "@mui/material";
import Typography from "@mui/material/Typography";

export const ByNutrientSearchMain = () => {
  const minDistance = 10;

  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchValues, setSearchValues] = useState({
    cal: [50, 300],
    carbs: [10, 100],
    fat: [10, 100],
    protein: [10, 100],
  });

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

  useEffect(() => {
    const getRecipes = async () => {
      const resp = await getRecipeByNutrients();
      if (resp) {
        console.log(resp);
      }
    };
    //getRecipes();
  }, [toggleSearch]);

  return (
    <>
      <Box
        component={Paper}
        sx={{
          width: 500,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        {sliderLabelsAndRanges.map((el) => (
          <div key={el.label}>
            <Typography gutterBottom>{el.label}</Typography>
            <Slider
              getAriaLabel={() => el.label}
              value={searchValues[el.val]}
              onChange={(e, n, a) => handleInputChange(e, n, a, el.val, el.max)}
              valueLabelDisplay="auto"
              disableSwap
              min={el.min}
              max={el.max}
            />
          </div>
        ))}
      </Box>
      <Divider />
      <div>Content</div>
    </>
  );
};
