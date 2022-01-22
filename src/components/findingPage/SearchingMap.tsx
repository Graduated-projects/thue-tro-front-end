import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { LocationSearching } from '../../models/locationSearching';
import { hcmLatLng } from '../../util/hcmLngLat';

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
    const location = useSelector((state: RootState) => state.location);
    console.log(location);

    return (
        <div className="container mt-5">
            <MapContainer
                center={location.place.position}
                zoom={location.zoom}
                scrollWheelZoom={true}
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
                <MapEventCustom location={location} />
            </MapContainer>
        </div>
    );
};

export default SearchingMap;
