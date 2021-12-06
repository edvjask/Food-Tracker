import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { addNewPlan } from "../../services/internalAPI";

export const CreateNewDialog = ({ open, setOpen, setRefreshPlans }) => {
  const [value, setValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      const response = await addNewPlan(token, { name: value });
      if (response && response.status === 201) {
        setRefreshPlans((value) => !value);
        handleClose();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value.length >= 4) setButtonDisabled(false);
  }, [value]);

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle>{"Create new meal plan"}</DialogTitle>
      <DialogContent>
        <Box marginTop="10px">
          <TextField
            style={{ width: "100%" }}
            required
            helperText={"Name should be at least 4 characters"}
            id="outlined-error"
            label="Plan name"
            value={value}
            inputProps={{ minLength: 4 }}
            onChange={onInputChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={buttonDisabled} onClick={handleAddProject}>
          Create
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
