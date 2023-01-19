import { useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import Form from './Form';
import Chart from './Chart';
import { Grid, Paper, Stack } from '@mui/material';
import Calculations from './Calculations';
import Header from './Header/Header';

const Main = styled('main')(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3)
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MainLayout() {
  //const theme = useTheme();
  const { i18n } = useTranslation();

  useMemo(() => {
    const cookies = new Cookies();
    i18n.changeLanguage(cookies.get('i18next') || 'tr');
  }, [i18n])

  const [numberOfDice, setNumberOfDice] = useState(1);
  const [numberOfRolls, setNumberOfRolls] = useState(100);
  const [values, setValues] = useState({});
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Main>
        <DrawerHeader />
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          columns={{ xs: 4, sm: 4, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={4}>
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <Paper sx={{padding: '10px'}}>
                  <Form 
                    setValues={setValues} 
                    numberOfDice={numberOfDice}
                    setNumberOfDice={setNumberOfDice}
                    numberOfRolls={numberOfRolls}
                    setNumberOfRolls={setNumberOfRolls}
                  />
                </Paper>
                <Paper>
                  <Calculations valuesObject={values} numberOfRolls={numberOfRolls} />
                </Paper>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={4} sm={4} md={8}>
            <Paper sx={{ padding: '20px' }}>
              <Chart type="bar" 
                values={values}
                numberOfDice={numberOfDice}
              />
            </Paper>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
}