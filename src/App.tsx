import Grid from '@mui/material/Grid';
import Header from './components/Header';
import Map from './components/Map';

function App() {
  return (
    <Grid
      sx={{
        backgroundColor: '#F2F2F2',
        width: '100%',
        height: '100vh',
      }}
    >
      <Header />
      <Map />
    </Grid>
  );
}

export default App;
