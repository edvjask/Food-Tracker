import {Paper, Typography} from "@mui/material";
import {Meal} from "./Meal";


export const PlanItem = ({item}) => {

    const {breakfast, lunch, dinner} = item.meals;

    const date = new Intl.DateTimeFormat('lt-LT', {year: 'numeric', month: '2-digit',
    day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(item.date);

    return (
        <Paper elevation={3}>
            <Typography sx={{textAlign: 'center', margin: '20px auto'}} variant={'h5'}>
                {item.name}
            </Typography>
            <Typography sx={{textAlign: 'center'}} variant={'h6'}>
                Breakfast
            </Typography>
            {breakfast.meal ? (
                <Meal
                    name={breakfast.meal}
                    cal={breakfast.calories}
                />
            ) : (<div style={{textAlign: 'center'}}>'-'</div>)}
            <Typography sx={{textAlign: 'center'}} variant={'h6'}>
                Lunch
            </Typography>
            {lunch.meal ? (
                <Meal
                    name={lunch.meal}
                    cal={lunch.calories}
                />
            ) : (<div style={{textAlign: 'center'}}>'-'</div>)}
            <Typography sx={{textAlign: 'center'}} variant={'h6'}>
                Dinner
            </Typography>
            {dinner.meal ? (
                <Meal
                    name={dinner.meal}
                    cal={dinner.calories}
                />
            ) : (<div style={{textAlign: 'center'}}>'-'</div>)}
            Created on: {date}
        </Paper>
    )
}