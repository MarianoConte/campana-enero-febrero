import { Card, CardContent, Typography } from '@mui/material';
import { Punto } from './Map';
import { useEffect, useState } from 'react';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

interface Props {
  marker?: Punto;
  setDirections: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | null>
  >;
}

function BottomCard({ marker, setDirections }: Props) {
  useEffect(() => {
    setTravelInfo({
      distance: null,
      duration: null,
    });
  }, [marker]);

  const [travelInfo, setTravelInfo] = useState<{
    distance: string | null;
    duration: string | null;
  }>({
    distance: null,
    duration: null,
  });

  const renderLines = (text: string | undefined) => {
    if (!text) return null;

    const lines = text.split('\n'); // Divide el texto en líneas usando el salto de línea (\n)
    return lines.map((line, index) => (
      <Typography
        key={index}
        variant='body2'
        sx={{
          fontSize: '1.2rem',
        }}
      >
        {line}
      </Typography>
    ));
  };

  const calculateRoute = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setDirections(null);
      const { latitude, longitude } = position.coords;

      const origin = `${latitude},${longitude}`;
      const destination = `${marker?.latitud},${marker?.longitud}`;
      const directionsService = new google.maps.DirectionsService();

      const results = await directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      if (results) {
        setDirections(results);
        setTravelInfo({
          distance: results?.routes[0]?.legs[0]?.distance?.text || null,
          duration: results?.routes[0]?.legs[0]?.duration?.text || null,
        });
      }
    });
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
        {(marker?.direccion?.length !== 0 || marker?.info?.length !== 0) && (
          <Typography
            variant='body2'
            sx={{
              fontSize: '1.2rem',
              paddingX: '5px',
              paddingY: '10px',
            }}
          >
            {marker?.direccion}
            {marker?.info?.length !== 0 && renderLines(marker?.info)}
          </Typography>
        )}

        <Typography
          variant='body2'
          sx={{
            fontSize: '1.2rem',
            color: 'lightblue',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={calculateRoute}
        >
          ¿Cómo llegar?
        </Typography>
        {travelInfo?.distance && travelInfo?.duration && (
          <Typography
            variant='body2'
            sx={{
              fontSize: '1.2rem',
            }}
            onClick={calculateRoute}
          >
            {travelInfo?.distance} - {travelInfo?.duration}{' '}
            <DriveEtaIcon
              sx={{
                fontSize: '1.2rem',
                verticalAlign: 'middle',
                marginLeft: '5px',
              }}
            />
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default BottomCard;
