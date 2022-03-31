import { useAppDispatch } from '@/app/hooks';
import { path } from '@/configs/path';
import { Room } from '@/types/room.type';
import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';

const TextAreaField = (props: any) => <TextField multiline {...props} rows={6} />;

const useStyle = makeStyles({
    container: {
        padding: `4rem 0`,
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

const initialApartment: Room = {
    nameOfRoom: '',
    numberOfPeople: '',
    acreage: '',
    floor: '',
    apartmentId: '',
    description: '',
    deposit: '',
    price: '',
    period: '',
};

const RoomCreate = () => {
    const dispatch = useAppDispatch();
    const classes = useStyle();
    const navigate = useNavigate();
    const url = window.location.href.split('/');
    const apartmentId = url[url.length - 1];

    const [filesUpload, setfilesUpload] = useState([]);
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

    const createRoom = (room: Room, formik: any) => {
        console.log(room);
    };

    return (
        <div className={` `}>
            <Formik initialValues={initialApartment} onSubmit={createRoom}>
                {(formik) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className="center mt-5">
                                <p className={`${classes.title}`}>Tạo phòng cho căn hộ</p>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="mt-5 center center">
                            <Field
                                as={TextField}
                                type="text"
                                name="nameOfRoom"
                                id="nameOfRoom"
                                autoComplete="off"
                                placeholder="ví dụ: 1"
                                label="Số phòng (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="nameOfRoom"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center center">
                            <Field
                                as={TextField}
                                type="text"
                                name="numberOfPeople"
                                id="numberOfPeople"
                                autoComplete="off"
                                placeholder="ví dụ: 3"
                                label="Số người / phòng (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="numberOfPeople"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center">
                            <Field
                                as={TextField}
                                type="text"
                                name="acreage"
                                id="acreage"
                                autoComplete="off"
                                placeholder="ví dụ: 10"
                                label="Diện tích phòng: m² (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="acreage"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center">
                            <Field
                                as={TextField}
                                type="text"
                                name="floor"
                                id="floor"
                                autoComplete="off"
                                placeholder="ví dụ: 1"
                                label="Số phòng còn trống (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="floor"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center">
                            <Field
                                as={TextField}
                                type="text"
                                name="price"
                                id="price"
                                autoComplete="off"
                                placeholder="ví dụ: 2500000"
                                label="Giá phòng: VND (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="price"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center">
                            <Field
                                as={TextField}
                                type="text"
                                name="deposit"
                                id="deposit"
                                autoComplete="off"
                                placeholder="ví dụ: 800000"
                                label="Tiền đặt cọc: VND (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="deposit"
                                render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-5 center">
                            <Field
                                as={TextField}
                                type="text"
                                name="period"
                                id="period"
                                autoComplete="off"
                                placeholder="ví dụ: 3"
                                label="Kỳ hạn: tháng (*)"
                                spellCheck={false}
                                className="w-50"
                            />
                            <ErrorMessage
                                name="period"
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
                        <Grid item xs={12} className="center mt-5">
                            <div className="w-50">Thêm ảnh cho phòng:</div>
                        </Grid>
                        <Grid item xs={12} className="center">
                            <div className="w-50">
                                <label htmlFor="roomUploadFiles">
                                    <DriveFolderUploadIcon fontSize="large" />
                                    <input
                                        type="file"
                                        multiple
                                        id="roomUploadFiles"
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

export default RoomCreate;
