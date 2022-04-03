import { useAppDispatch } from '@/app/hooks';
import { path } from '@/configs/path';
import { Room } from '@/types/room.type';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';
import { roomService } from '@/services/room.service';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fireErrorMessage, formatVND } from '@/configs/common-function';
import Swal from 'sweetalert2';

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
    addBtn: {
        cursor: 'pointer',
        '&:hover': {
            color: 'blue',
        },
    },
    serviceSaved: {
        padding: '1rem 0',
        borderBottom: '1px solid black',
    },
});

const initialRoom: Room = {
    nameOfRoom: '',
    numberOfPeople: '',
    acreage: '',
    floor: '',
    description: '',
    deposit: '',
    price: '',
    period: '',
    imageUrls: [],
};

const RoomCreate = () => {
    const dispatch = useAppDispatch();
    const classes = useStyle();
    const navigate = useNavigate();
    const url = window.location.href.split('/');
    const apartmentId = url[url.length - 1];
    const [filesUpload, setfilesUpload] = useState([]);
    const [services, setservices] = useState<Array<any>>([]);
    const [allServices, setallServices] = useState([]);

    useEffect(() => {
        roomService.getAllServiceOfRoom(0).then((resp) => {
            setallServices(resp.data.data);
        });
    }, []);

    const onChangeService = (e: any, index: number) => {
        const serviceId = e.target.value;
        const servicesClone = [...services];
        servicesClone[index] = allServices.find((x: any) => x.id === serviceId);
        setservices(servicesClone);
    };

    const onChangeUnits = (e: any, index: number) => {
        const value = e.target.value;
        const servicesClone = [...services];
        servicesClone[index].currentUnit = servicesClone[index].units.find(
            (x: any) => x.id === value
        );
        setservices(servicesClone);
    };

    const setValueToService = (e: any, index: number) => {
        const value = e.target.value;
        const servicesClone = [...services];
        servicesClone[index].value = value;
        setservices(servicesClone);
    };

    const saveService = (index: number) => {
        const servicesClone = [...services];
        services[index].saved = true;
        setservices(servicesClone);
    };

    const editService = (index: number) => {
        const servicesClone = [...services];
        services[index].saved = false;
        setservices(servicesClone);
    };

    const servicesMap = services.map((service, index) => {
        return (
            <React.Fragment key={index}>
                {service.saved ? (
                    <Grid
                        container
                        spacing={2}
                        className={`mt-5 ${classes.serviceSaved}`}
                        key={index}
                    >
                        <Grid item xs={12}>
                            <b>
                                Dịch vụ đã lưu:
                                {`${service.currentUnit.description}: ${formatVND(
                                    Number(service.value)
                                )}`}
                            </b>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => editService(index)}
                            >
                                sửa dịch vụ này
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={2} className="mt-5" key={index}>
                        <Grid item xs={12}>
                            <FormControl fullWidth className="col-3">
                                <InputLabel>Chọn dịch vụ</InputLabel>
                                <Select
                                    label="Chọn dịch vụ"
                                    onChange={(e) => onChangeService(e, index)}
                                >
                                    {allServices.map((service: any, index) => (
                                        <MenuItem key={index} value={service.id ?? 0}>
                                            {service.viName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth className="col-3">
                                        <InputLabel>Đơn vị tính</InputLabel>
                                        <Select
                                            label="Đơn vị tính"
                                            onChange={(e) => onChangeUnits(e, index)}
                                        >
                                            {service.units &&
                                                service.units.map(
                                                    (unit: any, indexOfUnit: number) => (
                                                        <MenuItem
                                                            key={indexOfUnit}
                                                            value={unit.id ?? 0}
                                                        >
                                                            {unit.description}
                                                        </MenuItem>
                                                    )
                                                )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        className={`w-100`}
                                        id={`services-${index}`}
                                        label="Số tiền: VND"
                                        variant="outlined"
                                        onChange={(e) => setValueToService(e, index)}
                                        disabled={!service.units}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => saveService(index)}
                            >
                                Lưu dịch vụ
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </React.Fragment>
        );
    });

    const pushService = () => {
        const clone = [...services];
        clone.push(0);
        setservices(clone);
    };

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
        const servicesDto = services.map((service) => ({
            serviceId: service.id,
            unitsUnitPrice: [{ unitId: service.currentUnit.id, price: Number(service.value) }],
        }));

        const newRoom = {
            ...room,
            acreage: Number(room.acreage),
            deposit: Number(room.deposit),
            floor: Number(room.floor),
            nameOfRoom: Number(room.nameOfRoom),
            numberOfPeople: Number(room.numberOfPeople),
            period: Number(room.period),
            price: Number(room.price),
            createRoomServiceList: servicesDto,
        };
        roomService
            .createRoom(newRoom, apartmentId)
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.success) {
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Bạn đã phòng vào căn hộ này!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Xác nhận',
                    }).then((result) => {
                        navigate(path.main.userInfo);
                    });
                } else {
                    fireErrorMessage('tạo phòng không thành công!');
                }
            })
            .catch((err) => {
                fireErrorMessage(err);
            });

        console.log(`newRoom: `, newRoom);
    };

    return (
        <div className={` `}>
            <Formik initialValues={initialRoom} onSubmit={createRoom}>
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
                        <Grid item xs={12} className="center">
                            <div className="w-50 ">
                                {servicesMap}
                                <div className={`${classes.addBtn}`} onClick={() => pushService()}>
                                    <AddCircleOutlineIcon /> thêm dịch vụ mới
                                </div>
                            </div>
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
