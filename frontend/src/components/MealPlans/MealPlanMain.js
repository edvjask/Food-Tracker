import {useAuth0} from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {getSavedPlans} from "../../services/internalAPI";
import {PlanItem} from "./PlanItem";
import {Button} from "@mui/material";


export const MealPlanMain = () => {

    const {getAccessTokenSilently} = useAuth0();
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const getPlans = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await getSavedPlans(token);
                if (response) {
                    console.log(response.data);
                    setPlans(response.data);
                }
            } catch (e) {
                console.log(e)
            }
        }
        getPlans()
    }, [])

    const handleAddPlan = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <Button
                variant={'contained'}
                onClick={handleAddPlan}
            >
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
                key={el['_id']}
                item={el}
            />
        ))}
      </Box>
        </>
    );
}