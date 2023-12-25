import React from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Box, Chip, Grid } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import mapStyles from '../constants/mapStyles';
import salonesDelReino from '../constants/salonesDelReino';
import BottomCard from './BottomCard';
import lugaresDePredicacion from '../constants/lugaresDePredicacion';
import lugaresDeInteres from '../constants/lugaresDeInteres';

export interface Punto {
  latitud: number;
  longitud: number;
  nombre: string;
  direccion: string;
  info: string;
  icon: string;
}

function Mapa() {
  // latitud y longitud de la ciudad de Mar del Plata
  const [lat, setLat] = React.useState<number>(-38.0054771);
  const [lng, setLng] = React.useState<number>(-57.5426106);
  const [zoom, setZoom] = React.useState<number>(10);
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>([
    'Salones del Reino',
    'Sitios de predicación',
    'Sitios de interés turístico',
  ]);
  const [markers, setMarkers] = React.useState<Punto[]>([
    ...salonesDelReino,
    ...lugaresDePredicacion,
    ...lugaresDeInteres,
  ]);
  const [selectedMarker, setSelectedMarker] = React.useState<Punto | null>(
    null
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_MAPS_API_KEY}`,
    libraries: ['places'],
  });

  const handleClickChip = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerText } = e.currentTarget;
    handleCloseInfoWindow();
    setLat(-38.0054771);
    setLng(-57.5426106);
    setZoom(10);
    switch (innerText) {
      case 'Salones del Reino':
        if (selectedLabels.includes('Salones del Reino')) {
          setSelectedLabels(
            selectedLabels.filter((label) => label !== 'Salones del Reino')
          );
          // filtro los markers que se encuentran dentro de salonesDelReino
          setMarkers(
            markers.filter(
              (marker) =>
                !salonesDelReino.find((salon) => salon.nombre === marker.nombre)
            )
          );
        } else {
          setSelectedLabels([...selectedLabels, 'Salones del Reino']);
          setMarkers([...markers, ...salonesDelReino]);
        }

        break;
      case 'Sitios de predicación':
        if (selectedLabels.includes('Sitios de predicación')) {
          setSelectedLabels(
            selectedLabels.filter((label) => label !== 'Sitios de predicación')
          );
          setMarkers(
            markers.filter(
              (marker) =>
                !lugaresDePredicacion.find(
                  (lugar) => lugar.nombre === marker.nombre
                )
            )
          );
        } else {
          setSelectedLabels([...selectedLabels, 'Sitios de predicación']);
          setMarkers([...markers, ...lugaresDePredicacion]);
        }
        break;
      case 'Sitios de interés turístico':
        if (selectedLabels.includes('Sitios de interés turístico')) {
          setSelectedLabels(
            selectedLabels.filter(
              (label) => label !== 'Sitios de interés turístico'
            )
          );
          setMarkers(
            markers.filter(
              (marker) =>
                !lugaresDeInteres.find(
                  (lugar) => lugar.nombre === marker.nombre
                )
            )
          );
        } else {
          setSelectedLabels([...selectedLabels, 'Sitios de interés turístico']);
          setMarkers([...markers, ...lugaresDeInteres]);
        }
        break;
      default:
        break;
    }
  };

  const handleClickMarker = (marker: Punto) => {
    setLat(marker.latitud);
    setLng(marker.longitud);
    setZoom(18);
    setSelectedMarker(marker);
  };

  const handleCloseInfoWindow = () => {
    setSelectedMarker(null);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          backgroundColor: 'transparent',
          position: 'absolute',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          width: '100%',
          paddingTop: '10px',
        }}
      >
        <Chip
          sx={{
            backgroundColor: `${
              selectedLabels.includes('Salones del Reino') ? '#006fe6' : 'white'
            }`,
            color: `
            ${
              selectedLabels.includes('Salones del Reino') ? 'white' : 'black'
            }`,
            '&:hover': {
              backgroundColor: `
                  ${
                    selectedLabels.includes('Salones del Reino')
                      ? '#006fe6'
                      : 'white'
                  }
                `,
            },
            marginRight: '5px',
          }}
          label='Salones del Reino'
          icon={<CircleIcon sx={{ fill: 'purple' }} />}
          onClick={handleClickChip}
        />
        <Chip
          sx={{
            backgroundColor: `${
              selectedLabels.includes('Sitios de predicación')
                ? '#006fe6'
                : 'white'
            }`,
            color: `
            ${
              selectedLabels.includes('Sitios de predicación')
                ? 'white'
                : 'black'
            }`,
            '&:hover': {
              backgroundColor: `
                  ${
                    selectedLabels.includes('Sitios de predicación')
                      ? '#006fe6'
                      : 'white'
                  }
                `,
            },
            marginRight: '5px',
          }}
          label='Sitios de predicación'
          icon={<CircleIcon sx={{ fill: 'red' }} />}
          onClick={handleClickChip}
        />
        <Chip
          sx={{
            backgroundColor: `${
              selectedLabels.includes('Sitios de interés turístico')
                ? '#006fe6'
                : 'white'
            }`,
            color: `
            ${
              selectedLabels.includes('Sitios de interés turístico')
                ? 'white'
                : 'black'
            }`,
            '&:hover': {
              backgroundColor: `
                  ${
                    selectedLabels.includes('Sitios de interés turístico')
                      ? '#006fe6'
                      : 'white'
                  }
                `,
            },
            marginRight: '5px',
          }}
          label='Sitios de interés turístico'
          icon={<CircleIcon sx={{ fill: 'green' }} />}
          onClick={handleClickChip}
        />
      </Box>
      <GoogleMap
        center={{ lat, lng }}
        mapContainerStyle={{
          width: '100%',
          height: '95vh',
        }}
        zoom={zoom}
        options={{
          styles: mapStyles,
          /* remuevo los botones de mapa/satelite y de pantalla completa*/
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onClick={handleCloseInfoWindow}
      >
        {markers.map((marker) => (
          <MarkerF
            key={String(marker.latitud) + String(marker.longitud)}
            position={{ lat: marker.latitud, lng: marker.longitud }}
            icon={{
              url: marker.icon,

              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(30, 30),
            }}
            onClick={() => handleClickMarker(marker)}
          />
        ))}
      </GoogleMap>
      {selectedMarker && <BottomCard marker={selectedMarker} />}
    </Grid>
  );
}

export default Mapa;
