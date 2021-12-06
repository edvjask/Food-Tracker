import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addNewPlan,
  editPlan,
  getSavedPlans,
} from "../../services/internalAPI";
import * as React from "react";

export const AddFoodDialog = ({ meal, open, setOpen }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [plans, setPlans] = useState([]);
  const [type, setType] = useState("");
  const [newPlanName, setNewPlanName] = useState("");
  const [planSelectedId, setPlanSelectedId] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("success");
  const [snackText, setSnackText] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToPlan = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      let jsonToSend;
      switch (radioValue) {
        case "existing":
          //edit existing plan
          jsonToSend = {
            meals: {
              [type]: {
                meal: meal.name,
                calories: meal.cal,
              },
            },
          };
          const response = await editPlan(token, planSelectedId, jsonToSend);
          if (response && response.status === 200) {
            setSnackText("Plan edited successfully!");
            setSnackSeverity("success");
            setSnackOpen(true);
            handleClose();
          } else {
            setSnackText("Error editing plan!");
            setSnackSeverity("error");
            setSnackOpen(true);
          }

          break;
        case "new":
          jsonToSend = {
            name: newPlanName,
            meals: {
              [type]: {
                meal: meal.name,
                calories: meal.cal,
              },
            },
          };
          const resp = await addNewPlan(token, jsonToSend);
          if (resp && resp.status === 201) {
            setSnackText("Plan added successfully!");
            setSnackSeverity("success");
            setSnackOpen(true);
            handleClose();
          } else {
            setSnackText("Error adding plan!");
            setSnackSeverity("error");
            setSnackOpen(true);
          }
          break;
        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    const getPlans = async () => {
      try {
        const token = await getAccessTokenSilently();
        const resp = await getSavedPlans(token);
        if (resp && resp.status === 200) {
          setPlans(resp.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getPlans();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (radioValue) {
      case "existing":
        setButtonDisabled(!planSelectedId || !type);
        break;
      case "new":
        setButtonDisabled(newPlanName.length < 4 || !type);
        break;
      default:
        break;
    }
  }, [radioValue, newPlanName, planSelectedId, type]);

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const onPlanNameChange = (e) => {
    setNewPlanName(e.target.value);
  };

  const handlePlanChange = (e) => {
    setPlanSelectedId(e.target.value);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return meal ? (
    <>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>{`Add ${meal.name} to plan`}</DialogTitle>
        <DialogContent>
          <Box marginTop="10px">
            <FormControl component="fieldset">
              <FormLabel component="legend">Plan</FormLabel>
              <RadioGroup
                row
                aria-label="plan"
                name="row-radio-buttons-group"
                value={radioValue}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="existing"
                  control={<Radio />}
                  label="Select From Existing"
                />
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label="New Plan"
                />
              </RadioGroup>
            </FormControl>
            {radioValue === "existing" ? (
              <FormControl fullWidth>
                <InputLabel id="plan-select-label">Meal Plan</InputLabel>
                <Select
                  labelId="plan-select-label"
                  id="plan-select"
                  value={planSelectedId}
                  label="Meal Type"
                  onChange={handlePlanChange}
                >
                  {plans.map((el, i) => (
                    <MenuItem key={el["_id"]} value={el["_id"]}>
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : radioValue === "new" ? (
              <TextField
                style={{ width: "100%" }}
                required
                helperText={"Name should be at least 4 characters"}
                id="outlined-error"
                label="Plan name"
                value={newPlanName}
                inputProps={{ minLength: 4 }}
                onChange={onPlanNameChange}
              />
            ) : null}
            <FormControl fullWidth sx={{ marginTop: "15px" }}>
              <InputLabel id="type-select-label">Meal Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="demo-simple-select"
                value={type}
                label="Meal Type"
                onChange={handleTypeChange}
              >
                <MenuItem value={"breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"lunch"}>Lunch</MenuItem>
                <MenuItem value={"dinner"}>Dinner</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={buttonDisabled} onClick={handleAddToPlan}>
            Add
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackText}
        </Alert>
      </Snackbar>
    </>
  ) : null;
};
