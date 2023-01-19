import {  Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getMean, getMedian, getSumOfDiceValues, getVariance } from "../utils/utils";

export default function Calculations({ valuesObject }) {
  const { t } = useTranslation();

  const sum = getSumOfDiceValues(valuesObject);
  const mean = getMean(valuesObject);
  const median = getMedian(valuesObject);
  const variance = getVariance(valuesObject);
  const stdev = Math.sqrt(variance);

  const rows = [
    {
      label: t("sum"),
      value: sum || null
    },
    {
      label: `${t("mean")} (μ)`,
      value: mean || null
    },
    {
      label: `${t("median")} (x̄)`,
      value: median || null
    },
    {
      label: `${t("variance")} (σ²)`,
      value: variance || null
    },
    {
      label: `${t("standard_deviation")} (σ)`,
      value: stdev || null
    },
  ]
  
  const label = t("calculations");
  return (
  <>
    <Typography variant="h5" gutterBottom>
      {label}
    </Typography>

    <TableContainer component={Paper}>
      <Table size="small" aria-label={label}>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.label}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>)

}