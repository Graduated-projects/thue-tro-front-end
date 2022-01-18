import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik, Field } from 'formik';
import { LocationSearching } from '../../models/locationSearching';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
} from '@mui/material';

const initialLocation = {
    location: '',
    radius: 100,
};

const onSubmit = (location: LocationSearching): void => {
    console.log(location);
};

const FilterLocation = () => {
    return (
        <div className="container ">
            <Formik initialValues={initialLocation} onSubmit={onSubmit}>
                {(formik) => (
                    <Form className="mt-5">
                        <Grid item container spacing={2} direction="column" alignItems="center">
                            <Field
                                component={TextField}
                                className="form-control w-50"
                                name="location"
                                id="location"
                                autoComplete="off"
                                placeholder="Nhập vào một địa điểm bất kỳ"
                                label="Địa điểm"
                                spellCheck={false}
                                variant="outlined"
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
                                <FormControl fullWidth className="w-50 mt-5">
                                    <InputLabel id="demo-simple-select-label">
                                        đơn vị khoảng cách
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value="m"
                                        label="đơn vị khoảng cách"
                                    >
                                        <MenuItem value="m">mét</MenuItem>
                                        <MenuItem value="km">kilo mét</MenuItem>
                                    </Select>
                                </FormControl>
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
