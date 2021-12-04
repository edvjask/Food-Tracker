import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const InfoTable = ({ info }) => {
  return (
    <TableContainer sx={{ width: 300 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Information</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Source to original:
            </TableCell>
            <TableCell align="right">
              <Link href={info.sourceUrl}>Link</Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Dairy Free:
            </TableCell>
            <TableCell align="right">{info.dairyFree ? "Yes" : "No"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Health Score:
            </TableCell>
            <TableCell align="right">{`${info.healthScore} / 100`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Minutes to prepare:
            </TableCell>
            <TableCell align="right">{info.readyInMinutes} min</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Gluten free:
            </TableCell>
            <TableCell align="right">
              {info.glutenFree ? "Yes" : "No"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Price per serving:
            </TableCell>
            <TableCell align="right">{info.pricePerServing} $</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
