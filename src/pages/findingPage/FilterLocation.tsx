import React from 'react';
import { Form, Formik, Field } from 'formik';
import { LocationSearching } from '../../models/location.type';
import { Button, Grid, Slider, MenuItem } from '@mui/material';
import { TextField } from 'formik-mui';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationSlice } from '../../app/slice/locationSlice';
import { hcmLatLng } from '../../configs/location';
import { RootState } from '../../app/store';
import Swal from 'sweetalert2';
import SaiGonLocations from './SaiGonLocations';
import withReactContent from 'sweetalert2-react-content';
import { LocationOpenStreetMap } from '../../models/location.type';
import { getConstantValue } from 'typescript';

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
    console.log(positions);

    if (locationsAtSaiGon.length > 0) return Promise.resolve(locationsAtSaiGon);
    return Promise.reject();
};

const startSearching = (location: LocationSearching) => {
    console.log(location);
};

const FilterLocation = () => {
    const dispatch = useDispatch();
    const location = useSelector((state: RootState) => state.location);

    const getInfoOfLocation = (place: LocationSearching): void => {
        getLocationAtSaiGonByAddress(place)
            .then((response) => {
                MySwal.fire({
                    title: '<strong><u>Chọn địa điểm</u></strong>',
                    html: (
                        <SaiGonLocations
                            mySwal={MySwal}
                            place={place}
                            locations={response}
                            dispatch={dispatch}
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

    const setLocationRadius = (radius: number | number[]) => {
        dispatch(setLocationSlice({ ...location, radius }));
    };

    const setUnit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(setLocationSlice({ ...location, unit: e.target.value }));
    };

    return (
        <div className="container ">
            <Formik initialValues={initialLocation} onSubmit={() => {}}>
                {(formik) => (
                    <Form className="mt-5">
                        <Grid item container spacing={2} direction="column" alignItems="center">
                            <Field
                                component={TextField}
                                className="form-control w-50"
                                name="place.name"
                                id="place"
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
                                <Slider
                                    aria-label="Always visible"
                                    defaultValue={1}
                                    step={100}
                                    marks
                                    min={0}
                                    max={1000}
                                    valueLabelDisplay="on"
                                    className="w-50"
                                    name="radius"
                                    id="radius"
                                    onChange={(e, value) => {
                                        setLocationRadius(value);
                                    }}
                                />
                            </Grid>
                            <Grid item container justifyContent="center" spacing={2}>
                                <Field
                                    component={TextField}
                                    type="text"
                                    name="unit"
                                    label="Đơn vị khoảng cách"
                                    select
                                    variant="outlined"
                                    margin="normal"
                                    className="w-50"
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
                                <Button
                                    variant="contained"
                                    onClick={() => startSearching(location)}
                                >
                                    Tìm kiếm
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FilterLocation;
