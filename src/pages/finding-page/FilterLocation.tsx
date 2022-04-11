import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { LocationSearching } from '@/types/location.type';
import {
    Button,
    Grid,
    Slider,
    MenuItem,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { setLocationSlice } from '@/app/slice/location.slice';
import { hcmLatLng } from '@/configs/location';
import { useApartmentStore, useLocationStore } from '@/app/store';
import Swal from 'sweetalert2';
import SaiGonLocations from './SaiGonLocations';
import withReactContent from 'sweetalert2-react-content';
import { LocationOpenStreetMap } from '@/types/location.type';
import { unitStatus } from '@/configs/const';
import { fireErrorMessage } from '@/configs/common-function';
import { apartmentAction } from '@/app/action/apartment.action';
import { useAppDispatch } from '@/app/hooks';
import { formatVND } from '@/configs/common-function';
import PriceSlider from '@/components/PriceSlider';
import ArceageSlider from '@/components/ArceageSlider';

const MySwal = withReactContent(Swal);

const initialLocation: LocationSearching = {
    place: { name: '', position: hcmLatLng },
    radius: 0,
    unit: 0,
    zoom: 15,
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

function valueTextPrice(price: number) {
    return formatVND(price);
}
function valueTextDistanceByMetter(distance: number) {
    return distance + 'm';
}
function valueTextDistanceByKm(distance: number) {
    return distance + 'km';
}
function valueTextArceage(arceage: number) {
    return arceage + 'm²';
}
const priceMarks = [
    { label: formatVND(1000000), value: 1000000 },
    { label: formatVND(2000000), value: 2000000 },
    { label: formatVND(3000000), value: 3000000 },
    { label: formatVND(4000000), value: 4000000 },
    { label: formatVND(5000000), value: 5000000 },
];

const arceageMarks = [
    { label: `10m²`, value: 10 },
    { label: `15m²`, value: 15 },
    { label: `20m²`, value: 20 },
    { label: `25m²`, value: 25 },
    { label: `30m²`, value: 30 },
];

const FilterLocation = () => {
    const dispatch = useAppDispatch();
    const location = useLocationStore();
    const [currentUnit, setcurrentUnit] = useState(unitStatus.METER);
    const [price, setprice] = React.useState<number[]>([1000000, 4000000]);
    const [arceage, setarceage] = React.useState<number[]>([10, 20]);
    const { isLoadingApartments } = useApartmentStore();

    const handleChangePrice = (event: Event, newPrice: number | number[]) => {
        setprice(newPrice as number[]);
    };
    const handleChangeArceage = (event: Event, newArceage: number | number[]) => {
        setarceage(newArceage as number[]);
    };

    const getInfoOfLocation = (place: LocationSearching): Promise<void> => {
        return getLocationAtSaiGonByAddress(place)
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
                return Promise.resolve();
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Không tìm thấy!',
                    text: 'Vui lòng nhập vào địa chỉ cụ thể',
                });
                return Promise.reject();
            });
    };

    const startSearching = (location: LocationSearching) => {
        const hcm = ['SÀI GÒN', 'THÀNH PHỐ HỒ CHÍ MINH', 'VIỆT NAM'];
        const configAddress = location.place.name.split(', ').map((x) => x.toUpperCase());

        const removeSaigonAddress = configAddress.filter((x) => !hcm.includes(x));
        if (Number(removeSaigonAddress[removeSaigonAddress.length - 1])) removeSaigonAddress.pop();

        const searchingAddress = removeSaigonAddress.join(', ');

        const priceSorting = price.sort((a, b) => a - b);
        const arceageSorting = arceage.sort((a, b) => a - b);

        const params = {
            address: searchingAddress.replaceAll(' ', '%20'),
            latitude: location.place.position[0],
            longitude: location.place.position[1],
            distanceFrom: 0,
            distanceTo: location.radius / 1000,
            priceFrom: priceSorting[0],
            priceTo: priceSorting[1],
            acreageFrom: arceageSorting[0],
            acreageTo: arceageSorting[1],
            size: 500,
        };

        console.log(params);
        if (params.distanceTo === 0) {
            fireErrorMessage('vui lòng chọn bán kính tìm kiếm!');
        } else {
            dispatch(apartmentAction.searchRoom(params));
        }
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
        <Formik
            initialValues={initialLocation}
            onSubmit={(user, onFormik) => {
                getInfoOfLocation(user)
                    .then(() => onFormik.setSubmitting(false))
                    .catch(() => onFormik.setSubmitting(false));
            }}
        >
            {(formik) => (
                <Form>
                    <Backdrop
                        open={isLoadingApartments}
                        sx={{
                            color: '#fff',
                            fontSize: '28px',
                            zIndex: 9999,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <p> Đang tìm kiếm </p>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Field
                                as={TextField}
                                name="place.name"
                                id="place"
                                className="w-100"
                                autoComplete="off"
                                placeholder="Nhập vào một địa điểm bất kỳ"
                                label="Địa điểm"
                                spellCheck={false}
                                disabled={false}
                            />
                        </Grid>

                        <Grid item xs={4} justifyContent="center">
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="w-75"
                                style={{ height: '100%' }}
                            >
                                chọn
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className=" mt-1">
                        <Grid item xs={4} className="center">
                            Bán kính tìm kiếm:
                        </Grid>
                        <Grid item xs={6}>
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
                        <Grid item xs={12}>
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
                                    valueLabelFormat={valueTextDistanceByMetter}
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
                                    valueLabelFormat={valueTextDistanceByKm}
                                    onChange={(e, value) => {
                                        setLocationRadius(value as number);
                                    }}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography gutterBottom>Giá phòng:</Typography>
                            <PriceSlider
                                value={price}
                                onChange={handleChangePrice}
                                valueLabelDisplay="on"
                                className="w-75"
                                min={1000000}
                                max={5000000}
                                step={100000}
                                getAriaValueText={valueTextPrice}
                                valueLabelFormat={valueTextPrice}
                                marks={priceMarks}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography gutterBottom>Diện tích phòng (m²):</Typography>
                            <ArceageSlider
                                value={arceage}
                                onChange={handleChangeArceage}
                                valueLabelDisplay="on"
                                className="w-75"
                                min={10}
                                max={30}
                                step={1}
                                getAriaValueText={valueTextArceage}
                                valueLabelFormat={valueTextArceage}
                                marks={arceageMarks}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} justifyContent="center">
                        <Button variant="contained" onClick={() => startSearching(location)}>
                            Tìm kiếm
                        </Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default FilterLocation;
