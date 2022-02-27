import React, { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { LocationSearching } from '../../types/location.type';
import { Button, Grid, Slider, MenuItem, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLocationSlice } from '../../app/slice/location.slice';
import { hcmLatLng } from '../../configs/location';
import { useLocationStore } from '../../app/store';
import Swal from 'sweetalert2';
import SaiGonLocations from './SaiGonLocations';
import withReactContent from 'sweetalert2-react-content';
import { LocationOpenStreetMap } from '../../types/location.type';
import { unitStatus } from '../../configs/const';

const MySwal = withReactContent(Swal);

const initialLocation: LocationSearching = {
    place: { name: '', position: hcmLatLng },
    radius: 0,
    unit: 0,
    zoom: 12,
};

const getLocationAtSaiGonByAddress = async (
    location: LocationSearching
): Promise<Array<LocationOpenStreetMap>> => {
    //use openStreetMap to get positions
    const positions = await $.get(
        window.location.protocol +
            '//nominatim.openstreetmap.org/search?format=json&q=' +
            location.place.name
    );

    const SCOPE_SEARCHING = 'Sài Gòn';
    const locationsAtSaiGon = positions.filter((location: any, index: number) => {
        return location.display_name.includes(SCOPE_SEARCHING);
    });
    if (locationsAtSaiGon.length > 0) return Promise.resolve(locationsAtSaiGon);
    return Promise.reject();
};

const startSearching = (location: LocationSearching) => {
    console.log(location);
};

const FilterLocation = () => {
    const dispatch = useDispatch();
    const location = useLocationStore();
    const [currentUnit, setcurrentUnit] = useState(unitStatus.METER);
 
    const getInfoOfLocation = (place: LocationSearching): void => {
        getLocationAtSaiGonByAddress(place)
            .then((response) => {
                MySwal.fire({
                    title: '<strong><u>Chọn địa điểm</u></strong>',
                    html: (
                        <SaiGonLocations
                            dispatch={dispatch}
                            mySwal={MySwal}
                            place={place}
                            locations={response}
                            locationStore={location}
                        />
                    ),
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> đóng!',
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Không tìm thấy!',
                    text: 'Vui lòng nhập vào địa chỉ cụ thể',
                });
            });
    };

    const setLocationRadius = (radius: number) => {
        const realRadius = currentUnit === unitStatus.METER ? radius : radius * 1000;
        dispatch(setLocationSlice({ ...location, radius: realRadius }));
    };

    const setUnit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const unitValue = Number(e.target.value);
        setcurrentUnit(unitValue);
        if (unitValue === unitStatus.METER) {
            dispatch(setLocationSlice({ ...location, unit: unitValue, zoom: 15 }));
        } else {
            dispatch(setLocationSlice({ ...location, unit: unitValue, zoom: 13 }));
        }
    };

    return (
        <Formik initialValues={initialLocation} onSubmit={() => {}}>
            {(formik) => (
                <Form className="mt-5">
                    <Grid item container spacing={2} direction="column" alignItems="center">
                        <Field
                            as={TextField}
                            name="place.name"
                            id="place"
                            className="w-75"
                            autoComplete="off"
                            placeholder="Nhập vào một địa điểm bất kỳ"
                            label="Địa điểm"
                            spellCheck={false}
                            disabled={false}
                        />
                        <Grid item justifyContent="center">
                            <Button
                                variant="contained"
                                onClick={() => getInfoOfLocation(formik.values)}
                            >
                                chọn
                            </Button>
                        </Grid>
                        <Grid
                            item
                            container
                            spacing={2}
                            direction="column"
                            alignItems="center"
                            className="home-title mt-5"
                        >
                            <p>Bán kính tìm kiếm:</p>
                            {currentUnit === unitStatus.METER ? (
                                <Slider
                                    aria-label="Always visible"
                                    defaultValue={0}
                                    step={100}
                                    marks
                                    min={0}
                                    max={1000}
                                    valueLabelDisplay="on"
                                    className="w-75"
                                    name="radius"
                                    id="radius"
                                    onChange={(e, value) => {
                                        setLocationRadius(value as number);
                                    }}
                                />
                            ) : (
                                <Slider
                                    aria-label="Always visible"
                                    defaultValue={0}
                                    step={0.5}
                                    marks
                                    min={0}
                                    max={5}
                                    valueLabelDisplay="on"
                                    className="w-75"
                                    name="radius"
                                    id="radius"
                                    onChange={(e, value) => {
                                        setLocationRadius(value as number);
                                    }}
                                />
                            )}
                        </Grid>
                        <Grid item container justifyContent="center" spacing={2}>
                            <Field
                                component={TextField}
                                name="unit"
                                label="Đơn vị khoảng cách"
                                select
                                defaultValue={0}
                                variant="outlined"
                                margin="normal"
                                className="w-75"
                                disabled={false}
                                onChange={setUnit}
                            >
                                <MenuItem key="metter" value={0}>
                                    mét
                                </MenuItem>
                                <MenuItem key="kilometter" value={1}>
                                    ki lô mét
                                </MenuItem>
                            </Field>
                        </Grid>
                        <Grid item justifyContent="center">
                            <Button variant="contained" onClick={() => startSearching(location)}>
                                Tìm kiếm
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default FilterLocation;
