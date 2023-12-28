import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Header = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: '#0f1418',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
      }}
    >
      <Typography
        variant='h1'
        sx={{
          fontSize: '1rem',
          color: 'white',
          verticalAlign: 'middle',
          display: 'inline-block',
        }}
      >
        Mapa de la Campaña de Predicación de Enero y Febrero
      </Typography>
    </Grid>
  );
};

export default Header;
