import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

export default function Form({setValues}) {
  const { t } = useTranslation();
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [numberOfRolls, setNumberOfRolls] = useState(100);

  const dice = () => {
    const result = {};
    for (let i = 0; i < numberOfRolls; i++) {
      let count = 0;
      for (let j = 0; j < numberOfDice; j++) {
        count += Math.ceil(Math.random() * 6)
      }
      result[count] ? result[count]++ : result[count] = 1;
    }
    setValues(result);
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="numberOfDice"
          label={t("number_of_dice")}
          type="number"
          value={numberOfDice}
          onChange={e => setNumberOfDice(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="numberOfRolls"
          label={t("number_of_dice_rolls")}
          value={numberOfRolls}
          onChange={e => setNumberOfRolls(e.target.value)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <Button 
        variant="contained"
        onClick={dice}
      >{t("roll_dice")}</Button>
    </Box>
  );
}