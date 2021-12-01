import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export const NutritionTable = ({nutritionInfo, ingredients, loading}) => {

    console.log(ingredients)
    console.log(nutritionInfo)

    return (
        !loading && nutritionInfo.length ?
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ingredient</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nutritionInfo.map((el, i) => (
                        <TableRow key={ingredients[i].name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {`${ingredients[i].name}, ${ingredients[i].amount}`}
                        </TableCell>
                        <TableCell align="right">{el["nf_calories"]}</TableCell>
                        <TableCell align="right">{el["nf_total_fat"]}</TableCell>
                        <TableCell align="right">{el["nf_total_carbohydrate"]}</TableCell>
                        <TableCell align="right">{el["nf_protein"]}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer> : null
    )
}