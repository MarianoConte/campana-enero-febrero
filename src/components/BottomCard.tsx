import { Card, CardContent, Typography } from '@mui/material';
import { Punto } from './Map';

interface Props {
  marker?: Punto;
}

function BottomCard({ marker }: Props) {
  const renderLines = (text: string | undefined) => {
    if (!text) return null;

    const lines = text.split('\n'); // Divide el texto en líneas usando el salto de línea (\n)
    return lines.map((line, index) => (
      <Typography
        key={index}
        variant='body2'
        sx={{
          fontSize: '1.5rem',
          padding: '5px',
        }}
      >
        {line}
      </Typography>
    ));
  };

  return (
    <Card
      sx={{
        backgroundColor: '#0f1418',
        boxShadow: 'none',
        color: 'white',
        '& .MuiCardContent-root': {
          padding: '10px',
        },
        position: 'absolute',
        bottom: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        width: '95%',
        maxWidth: '500px',
      }}
    >
      <CardContent sx={{}}>
        <Typography
          variant='h5'
          component='div'
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            padding: '5px',
          }}
        >
          {marker?.nombre}
        </Typography>
        {marker?.direccion?.length !== 0 && (
          <Typography
            variant='body2'
            sx={{
              fontSize: '1.5rem',
              paddingX: '5px',
              paddingY: '10px',
            }}
          >
            {marker?.direccion}
          </Typography>
        )}
        {marker?.info?.length !== 0 && (
          <Typography
            variant='body2'
            sx={{
              fontSize: '1.5rem',
            }}
          >
            {renderLines(marker?.info)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default BottomCard;
