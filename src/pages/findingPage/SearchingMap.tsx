import { LatLngExpression } from 'leaflet';
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useLocationStore } from '../../app/store';
import { LocationSearching } from '../../types/location.type';

interface MapEventCustomProps {
    location: LocationSearching;
}

function MapEventCustom({ location }: MapEventCustomProps) {
    const map = useMap();
    map.setView(location.place.position, location.zoom, {
        duration: 1,
        easeLinearity: 1,
        animate: true,
    });

    return null;
}

const SearchingMap = () => {
    const location = useLocationStore();
    return (
        <div className="container mt-5">
            <MapContainer
                center={location.place.position}
                zoom={location.zoom}
                scrollWheelZoom={false}
                id="map"
                style={{ height: `480px` }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location.place.position as LatLngExpression}>
                    <Popup> {location.place.name} </Popup>
                </Marker>
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
