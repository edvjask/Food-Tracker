import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { getSavedPlans } from "../../services/internalAPI";
import { PlanItem } from "./PlanItem";
import { Button } from "@mui/material";
import { CreateNewDialog } from "./CreateNewDialog";
import { DeleteDialog } from "./DeleteDialog";

export const MealPlanMain = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [plans, setPlans] = useState([]);
  const [newPlanModalOpen, setNewPlanModalOpen] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await getSavedPlans(token);
        if (response) {
          setPlans(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getPlans();
  }, [toggleRefresh]);

  const handleAddPlan = (e) => {
    e.preventDefault();
    setNewPlanModalOpen(true);
  };

  return (
    <>
      <Button variant={"contained"} onClick={handleAddPlan}>
        Add Plan
      </Button>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 450,
            height: 390,
          },
        }}
      >
        {plans.map((el, i) => (
          <PlanItem
            key={el["_id"]}
            item={el}
            openDelete={setDeleteDialogOpen}
            setIdToDelete={setDeleteId}
          />
        ))}
      </Box>
      <CreateNewDialog
        open={newPlanModalOpen}
        setOpen={setNewPlanModalOpen}
        setRefreshPlans={setToggleRefresh}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        setRefreshPlans={setToggleRefresh}
        id={deleteId}
      />
    </>
  );
};
