import {  Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Calculations({ valuesObject }) {
  const { t } = useTranslation();
  const keys = Object.keys(valuesObject);
  const sum = keys.reduce((a, b) => a + b * valuesObject[b], 0);
  const count = Object.values(valuesObject).reduce((a, b) => a + b, 0);
  const mean = sum / count;

  const getMedian = () => {
    const half = Math.ceil(count / 2);
    let tempSum = 0;

    if (count % 2 === 0) {
      for (let i = 0; i < keys.length; i++) {
        tempSum += valuesObject[keys[i]];
        if (tempSum === half) {
          return (Number(keys[i]) + Number(keys[i + 1])) / 2;
        } else if (tempSum > half) {
          return keys[i];
        }
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        tempSum += valuesObject[keys[i]];
        if (tempSum >= half) {
          return keys[i];
        }
      }
    }
  }
  const median = getMedian();

  const getVariance = () => {
    const sum = keys.reduce((out,key) => {
      return out + ((key  - mean) ** 2) * valuesObject[key];
    },0)

    return sum / count;
  }
  const variance = getVariance();
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
  
  var ztable = require('ztable');
  var zscore = -1.3452;
 
  console.log(ztable(zscore));

  return (<>
    <Typography variant="h5" gutterBottom>
      Hesaplanabilen Değerler
    </Typography>

    <TableContainer component={Paper}>
      <Table size="small" aria-label="Hesaplanabilen Değerler">
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