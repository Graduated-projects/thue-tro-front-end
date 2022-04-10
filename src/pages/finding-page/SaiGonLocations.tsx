import React, { Dispatch } from 'react';

import { LocationOpenStreetMap } from '@/types/location.type';
import { latlng } from '@/types/interface';
import { setLocationSlice } from '@/app/slice/location.slice';
import { LocationSearching } from '@/types/location.type';

interface SaiGonLocationsProps {
    locations: Array<LocationOpenStreetMap>;
    dispatch: Dispatch<any>;
    place: LocationSearching;
    mySwal: any;
    locationStore: LocationSearching;
}

const SaiGonLocations = ({
    locations,
    dispatch,
    place,
    mySwal,
    locationStore,
}: SaiGonLocationsProps) => {
    const chooseLocations = (location: LocationOpenStreetMap) => {
        const position: latlng = [location.lat as number, location.lon as number];

        const locationDto = {
            place: { position, name: location.display_name },
            zoom: 15,
            radius: locationStore.radius,
            unit: locationStore.unit,
        };
        dispatch(setLocationSlice(locationDto));
        mySwal.close();
    };

    const locationsMap = locations.map((location: LocationOpenStreetMap, index: number) => {
        return (
            <div
                key={index}
                className="swal-saigon-positions"
                onClick={() => chooseLocations(location)}
            >
                {location.display_name}
            </div>
        );
    });

    return (
        <div className="center-column">
            <p className="text-success">
                có <b> {locations.length} </b>địa điểm được tìm thấy!
            </p>
            {locationsMap}{' '}
        </div>
    );
};

SaiGonLocations.propTypes = {};

export default SaiGonLocations;
