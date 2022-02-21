import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

export function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e: any) {
            setPosition(e.latlng);
            map.panTo(e.latlng, { duration: 1, easeLinearity: 0.25, noMoveStart: false });
        },
    });

    return position === null ? null : (
        <Marker position={position as any}>
            <Popup>You are here</Popup>
        </Marker>
    );
}
