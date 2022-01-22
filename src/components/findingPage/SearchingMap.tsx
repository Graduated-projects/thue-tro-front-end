import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { hcmLatLng } from '../../util/hcmLngLat';

const SearchingMap = () => {
    const location = useSelector((state: RootState) => state.location);
  
    console.log(location);
    

    return (
        <div className="container mt-5">
            <MapContainer
                center={hcmLatLng}
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
            </MapContainer>
        </div>
    );
};

export default SearchingMap;
