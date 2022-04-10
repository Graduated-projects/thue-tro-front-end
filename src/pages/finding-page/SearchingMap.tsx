import React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useApartmentStore, useLocationStore } from '../../app/store';
import { LocationSearching } from '../../types/location.type';
import L from 'leaflet';
import { makeStyles } from '@mui/styles';
import { Apartment } from '@/types/apartment.type';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';
import Logo from '@/assets/img/logo.png';
import { formatVND } from '@/configs/common-function';

interface MapEventCustomProps {
    location: LocationSearching;
}

const customMarker = L.icon({
    iconUrl: require('@/assets/img/001-home.png'),
    iconSize: [30, 30],
});

function MapEventCustom({ location }: MapEventCustomProps) {
    const map = useMap();
    map.setView(location.place.position, location.zoom, {
        duration: 1,
        easeLinearity: 1,
        animate: true,
    });

    return null;
}
const useStyles = makeStyles({
    homeIcon: {
        color: 'black',
    },
    imgPopup: {
        height: '100%',
        width: '100%',
        padding: '0 0 16px 0',
    },
    leftTitle: {
        color: '#17a2b8',
        fontsize: '16px',
    },
});
const renderImage = (apartment: Apartment) => {
    if (apartment?.imageUrls) return apartment.imageUrls[0];
    return Logo;
};

const SearchingMap = () => {
    const location = useLocationStore();
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const { apartments } = useApartmentStore();
    useEffect(() => {}, [dispatch]);

    console.log(apartments);
    const renderApartments = apartments.map((apartment: Apartment, index) => {
        const [lng, lat] = [apartment.longitude, apartment.latitude];

        return (
            <Marker key={index} position={[lat, lng] as LatLngExpression} icon={customMarker}>
                <Popup>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <img
                                src={renderImage(apartment)}
                                alt="#"
                                className={`${classes.imgPopup}`}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <div>
                                <span className={`${classes.leftTitle}`}>Địa chỉ:</span>{' '}
                                {apartment.address}
                            </div>
                            <div>
                                <span className={`${classes.leftTitle}`}>Giá trung bình:</span>{' '}
                                <span className="text-danger">
                                    {formatVND(Number(apartment.basePrice))}
                                </span>
                            </div>
                            <div>
                                <span className={`${classes.leftTitle}`}>Trạng thái:</span>{' '}
                                {apartment.numberOfRoomsAvailable ? 'còn phòng' : 'hết phòng'}
                            </div>
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Button
                                variant="contained"
                                onClick={() =>
                                    navigate(
                                        path.apartment.byId.replace(
                                            ':id',
                                            (apartment.id as string) || ''
                                        )
                                    )
                                }
                            >
                                Xem trọ
                            </Button>
                        </Grid>
                    </Grid>
                </Popup>
            </Marker>
        );
    });

    return (
        <div className="container mt-5">
            <MapContainer
                center={location.place.position}
                zoom={location.zoom}
                scrollWheelZoom={false}
                id="map"
                style={{ height: `600px` }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location.place.position as LatLngExpression}>
                    <Popup>
                        <React.Fragment>{location.place.name}</React.Fragment>
                    </Popup>
                </Marker>

                {apartments.length && renderApartments}

                {location.radius !== 0 && (
                    <Circle
                        center={location.place.position}
                        pathOptions={{ color: 'red' }}
                        radius={location.radius}
                    >
                        <Popup>{`${location.place.name} xung quanh ${location.radius}`}</Popup>
                    </Circle>
                )}
                <MapEventCustom location={location} />
            </MapContainer>
        </div>
    );
};

export default SearchingMap;
