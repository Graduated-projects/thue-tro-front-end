import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Apartment } from '@/types/apartment.type';
import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';
import { mediaService } from '@/services/media.service';
import { fireErrorMessage } from '@/configs/common-function';
import { apartmentService } from '@/services/apartment.service';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';
import { useAuthStore } from '@/app/store';
const TextAreaField = (props: any) => <TextField multiline {...props} rows={6} />;

const useStyle = makeStyles({
    apartmentContainer: {
        margin: '3rem 2rem',
        padding: '2rem',
        borderRadius: '7.5px',
        boxShadow:
            'box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
    },
    fileUpload: {
        position: 'relative',

        display: 'flex',
        margin: '0.25rem',
    },
    fileName: {
        width: '400px',
        display: 'flex',
        alignItems: 'center',
    },
    removeFile: {
        borderRadius: '100%',
        border: '1px solid red',
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
            boxShadow: '0 0 5px red',
        },
    },

    img: {
        width: '75px',
        height: '50px',
    },
});

const initialApartment: Apartment = {
    reminiscentName: '',
    address: '',
    totalNumberOfRooms: '',
    numberOfRoomsUnAvailable: '',
    numberOfRoomsAvailable: '',
    description: '',
    numberOfFloors: '',
    imageUrls: [],
};

const ApartmentPost = () => {
    const classes = useStyle();
    const { isLogin } = useAuthStore();

    const [isDisabledFloorField, setisDisabledFloorField] = useState(false);
    const [filesUpload, setfilesUpload] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (!isLogin) navigate(path.main.home);
    }, []);

    const uploadFiles = (e: any) => {
        setfilesUpload(Array.from(e.target.files));
    };

    const onRemoveFile = (index: number) => {
        const filesUploadClone = [...filesUpload];
        filesUploadClone.splice(index, 1);
        setfilesUpload(filesUploadClone);
    };

    const renderFiles = filesUpload.map((file: any, index: number) => {
        const url = URL.createObjectURL(file);
        return (
            <div className={`${classes.fileUpload} w-100`} key={index}>
                <div>
                    <img className={`mr-2 ${classes.img}`} src={url} alt="#" key={index} />
                </div>
                <div className={`mr-5 ml-5 ${classes.fileName}`}> {file.name} </div>
                <div className={`center`} onClick={() => onRemoveFile(index)}>
                    <CloseIcon className={`${classes.removeFile} text-danger`} fontSize="small" />
                </div>
            </div>
        );
    });

    const postApartment = (apartment: Apartment, formik: any) => {
        const formData = new FormData();
        if (filesUpload.length) {
            filesUpload.forEach((file) => {
                formData.append('files', file);
            });
            mediaService
                .uploadFiles(formData)
                .then((resp) => {
                    const { urls } = resp.data;
                    apartment.imageUrls = urls;
                    apartmentService
                        .postApartment(apartment)
                        .then((resp) => {
                            Swal.fire({
                                title: 'Thành công!',
                                text: 'Bạn đã tạo 1 căn hộ!',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Xác nhận',
                            }).then((result) => {
                                navigate(path.main.userInfo);
                            });
                        })
                        .catch((err) => fireErrorMessage(err));
                })
                .catch((err) => fireErrorMessage(err));
        }
    };

    return (
        <div className={` ${classes.apartmentContainer}`}>
            <Formik initialValues={initialApartment} onSubmit={postApartment}>
                {(formik) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className="center">
                                <p className={`${classes.title}`}>Tạo một căn hộ</p>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mt-5 center center">
                            <Field
                                as={TextField}
                                type="text"
                                name="reminiscentName"
                                id="reminiscentName"
                                autoComplete="off"
                                placeholder="ví dụ: Nhà trọ giá tốt Quận 5"
                                label="Tiêu đề phòng (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="reminiscentName"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center center">
                            <Field
                                as={TextField}
                                type="text"
                                name="address"
                                id="address"
                                autoComplete="off"
                                placeholder="ví dụ: 497/24/3 Phan văn trị, Phường 5, Quận Gò Vấp, TP HCM"
                                label="Địa chỉ (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="address"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center">
                            <Field
                                as={TextField}
                                type="text"
                                name="totalNumberOfRooms"
                                id="totalNumberOfRooms"
                                autoComplete="off"
                                placeholder="ví dụ: 10"
                                label="Tổng số phòng trong căn hộ (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="totalNumberOfRooms"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center">
                            <Field
                                as={TextField}
                                type="text"
                                name="numberOfRoomsAvailable"
                                id="numberOfRoomsAvailable"
                                autoComplete="off"
                                placeholder="ví dụ: 8"
                                label="Số phòng còn trống (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="numberOfRoomsAvailable"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center">
                            <Field
                                as={TextAreaField}
                                name="description"
                                id="description"
                                autoComplete="off"
                                placeholder={`ví dụ: -phòng trọ sạch sẽ,...`}
                                label="Mô tả chi tiết"
                                spellCheck={false}
                                className={`w-50 `}
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
                                        onChange={() => {
                                            setisDisabledFloorField(!isDisabledFloorField);
                                        }}
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
                                disabled={isDisabledFloorField}
                            />
                            <ErrorMessage
                                name="numberOfFloors"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="center mt-5">
                            <div className="w-50">Thêm ảnh cho căn hộ:</div>
                        </Grid>
                        <Grid item xs={12} className="center">
                            <div className="w-50">
                                <label htmlFor="apartmentUploadFiles">
                                    <DriveFolderUploadIcon fontSize="large" />
                                    <input
                                        type="file"
                                        multiple
                                        id="apartmentUploadFiles"
                                        onChange={(e) => uploadFiles(e)}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={12} className="center">
                            <div className="w-50 "> {renderFiles} </div>
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
