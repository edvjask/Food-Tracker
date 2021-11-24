import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import "./styles.css";
import ReactPlayer from "react-player";

export const FoodDetailsModal = ({ foodItem, open, handleClose }) => {
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

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4">
            {foodItem && foodItem.strMeal}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}/>
          <Typography variant="h5">Instructions:</Typography>
          <p>{foodItem && foodItem.strInstructions}</p>
          <Typography variant="h6">Ingredients:</Typography>
          {foodItem &&
            [...Array(20)].map((ingr, i) => (
              <p key={i}>
                {foodItem[`strIngredient${i + 1}`] &&
                  `${foodItem[`strIngredient${i + 1}`]} : ${
                    foodItem[`strMeasure${i + 1}`]
                  }`}
              </p>
            ))}
          <Typography variant="h4">Video</Typography>
          <div>
            {foodItem && <ReactPlayer url={foodItem.strYoutube} controls />}
          </div>
        </Box>
      </Modal>
    </>
  );
};
