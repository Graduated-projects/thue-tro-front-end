import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik, Field } from 'formik';
import { LocationSearching } from '../../models/locationSearching';
import { Button, Grid, Slider, MenuItem } from '@mui/material';
import { TextField } from 'formik-mui';
import { useDispatch } from 'react-redux';
import { setLocationSlice } from '../../app/slice/locationSlice';

const initialLocation = {
    place: '',
    radius: 1,
    unit: 0,
};

const FilterLocation = () => {
    const dispatch = useDispatch();

    const onSubmit = (location: LocationSearching): void => {

        dispatch(setLocationSlice(location));
    };

    return (
        <div className="container ">
            <Formik initialValues={initialLocation} onSubmit={onSubmit}>
                {(formik) => (
                    <Form className="mt-5">
                        <Grid item container spacing={2} direction="column" alignItems="center">
                            <Field
                                component={TextField}
                                className="form-control w-50"
                                name="place"
                                id="place"
                                autoComplete="off"
                                placeholder="Nhập vào một địa điểm bất kỳ"
                                label="Địa điểm"
                                spellCheck={false}
                                disabled={false}
                            />
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
                                    step={0.5}
                                    marks
                                    min={1}
                                    max={10}
                                    valueLabelDisplay="on"
                                    className="w-50"
                                    name="radius"
                                    id="radius"
                                    onChange={(e, value) => formik.setFieldValue('radius', value)}
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
                                <Button variant="contained" type="submit">
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

FilterLocation.propTypes = {};

export default FilterLocation;
