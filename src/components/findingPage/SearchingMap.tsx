import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const SearchingMap = () => {
    return (
        <>
            <MapContainer
                center={[10.762622, 106.660172]}
                zoom={12}
                scrollWheelZoom={true}
                id="map"
                style={{ height: `480px` }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[10.762622, 106.660172]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default SearchingMap;
