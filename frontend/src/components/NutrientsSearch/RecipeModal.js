import { useEffect, useState } from "react";
import { getInfoFromId } from "../../services/publicAPIService";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { InfoTable } from "./InfoTable";

export const RecipeModal = ({ activeId, open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
  };

  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeId) {
      const getInfo = async () => {
        setLoading(true);
        const response = await getInfoFromId(activeId);
        if (response) {
          setInfo(response);
          setLoading(false);
        }
      };
      getInfo();
    }
  }, [activeId]);

  return activeId && !loading ? (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4">
          {info.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} />
        <div>
          <InfoTable info={info} />
        </div>
      </Box>
    </Modal>
  ) : null;
};
