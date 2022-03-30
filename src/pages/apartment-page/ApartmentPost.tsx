import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Apartment } from '@/types/apartment.type';
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CheckBox } from '@mui/icons-material';

const TextAreaField = (props: any) => <TextField multiline {...props} rows={6} />;

const useStyle = makeStyles({
    apartmentContainer: {
        margin: '3rem 2rem',
        padding: '2rem',
        border: '1px solid black',
        borderRadius: '7.5px',
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
    },
    textarea: {},
});

const initialApartment: Apartment = {
    reminiscentName: '',
    address: '',
    totalNumberOfRooms: null,
    numberOfRoomsUnAvailable: null,
    numberOfRoomsAvailable: null,
    description: '',
    numberOfFloors: null,
    imageUrls: [],
};

const postApartment = (user: Apartment, formik: any) => {
    console.log(user);
};

const ApartmentPost = () => {
    const classes = useStyle();
    const [isDisabledFloorField, setisDisabledFloorField] = useState(false);
    return (
        <div className={` ${classes.apartmentContainer}`}>
            <Formik initialValues={initialApartment} onSubmit={postApartment}>
                {(formik) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} textAlign="center">
                                <p className={`${classes.title}`}>Tạo một căn hộ</p>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} textAlign="center" className="mt-5">
                            <Field
                                as={TextField}
                                type="text"
                                name="reminiscentName"
                                id="reminiscentName"
                                autoComplete="off"
                                placeholder="ví dụ: Nhà trọ giá tốt Quận 5"
                                label="Tiêu đề phòng"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="reminiscentName"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center" className="mt-5">
                            <Field
                                as={TextField}
                                type="text"
                                name="address"
                                id="address"
                                autoComplete="off"
                                placeholder="ví dụ: 497/24/3 Phan văn trị, Phường 5, Quận Gò Vấp, TP HCM"
                                label="Địa chỉ"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="address"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center" className="mt-5">
                            <Field
                                as={TextField}
                                type="text"
                                name="totalNumberOfRooms"
                                id="totalNumberOfRooms"
                                autoComplete="off"
                                placeholder="ví dụ: 10"
                                label="Tổng số phòng trong căn hộ"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="totalNumberOfRooms"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center" className="mt-5">
                            <Field
                                as={TextField}
                                type="text"
                                name="numberOfRoomsAvailable"
                                id="numberOfRoomsAvailable"
                                autoComplete="off"
                                placeholder="ví dụ: 8"
                                label="Số phòng còn trống"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="numberOfRoomsAvailable"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center" className="mt-5">
                            <Field
                                as={TextAreaField}
                                name="description"
                                id="description"
                                autoComplete="off"
                                placeholder={`ví dụ: -phòng trọ sạch sẽ,...`}
                                label="Mô tả chi tiết"
                                spellCheck={false}
                                className={`w-50 ${classes.textarea}`}
                            />
                            <ErrorMessage
                                name="description"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center" className="mt-5">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        onChange={() =>
                                            setisDisabledFloorField(!isDisabledFloorField)
                                        }
                                    />
                                }
                                label="Căn hộ có tầng?"
                                className="w-50"
                            />
                            <Field
                                as={TextField}
                                type="text"
                                name="numberOfFloors"
                                id="numberOfFloors"
                                autoComplete="off"
                                placeholder="ví dụ: 10"
                                label="Tổng số tầng trong căn hộ"
                                spellCheck={false}
                                className="w-50"
                                disabled={!isDisabledFloorField}
                            />
                            <ErrorMessage
                                name="numberOfFloors"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center" className="mt-5">
                            <input type="file" className="w-50" multiple />
                        </Grid>
                        <Grid item xs={12} className="center mt-5">
                            <Button variant="contained" color="primary" type="submit">
                                Hoàn tất
                            </Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ApartmentPost;
