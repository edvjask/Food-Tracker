import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { deletePlan } from "../../services/internalAPI";

export const DeleteDialog = ({ id, open, setOpen }) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        const token = await getAccessTokenSilently();
        const response = await deletePlan(token, id);
        if (response && response.status === 200) {
          handleClose();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle>{"Create new meal plan"}</DialogTitle>
      <DialogContent>Are you sure you want to delete this plan?</DialogContent>
      <DialogActions>
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
