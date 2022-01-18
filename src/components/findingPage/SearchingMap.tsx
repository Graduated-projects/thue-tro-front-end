import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LocationMarker } from './LocationMarker';
const SearchingMap = () => {
    // $.get(
    //     'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=47.217954&lon=-1.552918',
    //     function (data: any) {
    //         console.log(data.address.road);
    //     }
    // );

    // $.get(
    //     window.location.protocol +
    //         '//nominatim.openstreetmap.org/search?format=json&q=' +
    //         '497 Phan Văn Trị ,Phường 5, Quận Gò Vấp,Thành phố Hồ Chí Minh',
    //     function (data) {
    //         console.log(data);
    //     }
    // );
   
    return (
        <div className="container mt-5">
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
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default SearchingMap;
