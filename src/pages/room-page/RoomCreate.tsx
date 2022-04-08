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
import { mediaService } from '@/services/media.service';
import background from '@/assets/img/background-1.jpg';
import ImageIcon from '@mui/icons-material/Image';
import NumericInput from 'material-ui-numeric-input';

const TextAreaField = (props: any) => <TextField multiline {...props} rows={4} />;
// const CustomNumericInput = (props: any) => <NumericInput {...props} />;
const useStyle = makeStyles({
    container: {
        margin: '3rem 12rem',
        padding: '1rem',
        borderRadius: '7.5px',
        background: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
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
        alignItems: '',
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
    dragFile: {
        border: '1px dashed gray',
        height: '124px',
        flexDirection: 'column',
        transition: '0.2s',
        '&:hover': {
            color: 'blue',
            border: '1px dashed blue',
            cursor: 'pointer',
        },
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

    const [numberOptions, setnumberOptions] = useState({
        floor: 0,
        period: 0,
        numberOfPeople: 0,
    });

    const numbers = Array(50).fill(null);

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
        servicesClone[index].saved = true;
        setservices(servicesClone);
    };

    const removeService = (index: number) => {
        const servicesClone = [...services];
        servicesClone.splice(index, 1);
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
                    <Grid container spacing={2} className={` ${classes.serviceSaved}`} key={index}>
                        <Grid item xs={6}>
                            Dịch vụ đã lưu:
                            <b>
                                {`${service.description} - ${
                                    service.currentUnit.description
                                }: ${formatVND(Number(service.value))}`}
                            </b>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => editService(index)}
                            >
                                sửa dịch vụ này
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={2} className="mt-5" key={index}>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                                    <NumericInput
                                        precision={0}
                                        decimalChar=","
                                        thousandChar="."
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
                        <Grid item xs={3} style={{ display: 'flex' }}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => saveService(index)}
                                className="mr-2"
                            >
                                Lưu dịch vụ
                            </Button>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={() => removeService(index)}
                            >
                                Xóa dịch vụ
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
        if (index >= 4) return null;
        if (index === 3) return <div>...</div>;

        return (
            <div className={`${classes.fileUpload} w-100`} key={index}>
                <ImageIcon />
                <div className={`mr-5 ml-5 ${classes.fileName}`}> {file.name} </div>
                <div className={``} onClick={() => onRemoveFile(index)}>
                    <CloseIcon className={`${classes.removeFile} text-danger`} fontSize="small" />
                </div>
            </div>
        );
    });

    const createRoom = async (room: Room, formik: any) => {
        const servicesDto = services.map((service) => ({
            serviceId: service.id,
            unitsUnitPrice: [{ unitId: service.currentUnit.id, price: Number(service.value) }],
        }));
        let urlUploaded: Array<string> = [];

        if (filesUpload.length) {
            const formData = new FormData();

            filesUpload.forEach((file) => {
                formData.append('files', file);
            });

            await mediaService
                .uploadFiles(formData)
                .then((resp) => {
                    const { urls } = resp.data.data;
                    urlUploaded = urls;
                })
                .catch((err) => fireErrorMessage(err));
        }

        const newRoom = {
            ...room,
            imageUrls: urlUploaded,
            acreage: Number(room.acreage),
            deposit: Number(room.deposit),
            floor: Number(numberOptions.floor),
            nameOfRoom: room.nameOfRoom,
            numberOfPeople: Number(numberOptions.numberOfPeople),
            period: Number(numberOptions.period),
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
        <div className={` ${classes.container} `}>
            <Formik initialValues={initialRoom} onSubmit={createRoom}>
                {(formik) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className="center">
                                <p className={`${classes.title}`}>Tạo phòng cho căn hộ</p>
                            </Grid>
                            <Grid item xs={3} className="mt-5  ">
                                <Field
                                    as={TextField}
                                    type="text"
                                    name="nameOfRoom"
                                    id="nameOfRoom"
                                    autoComplete="off"
                                    placeholder="ví dụ: Phòng số 12"
                                    label="Tiêu đề phòng (*)"
                                    spellCheck={false}
                                    className="w-100"
                                />
                                <ErrorMessage
                                    name="nameOfRoom"
                                    render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                                />
                            </Grid>
                            <Grid item xs={3} className="mt-5 ">
                                <Field
                                    as={TextField}
                                    type="text"
                                    name="acreage"
                                    id="acreage"
                                    autoComplete="off"
                                    placeholder="ví dụ: 10"
                                    label="Diện tích phòng: m² (*)"
                                    spellCheck={false}
                                    className="w-100"
                                />
                                <ErrorMessage
                                    name="acreage"
                                    render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                                />
                            </Grid>
                            <Grid item xs={3} className="mt-5 ">
                                <Field
                                    as={NumericInput}
                                    precision={0}
                                    decimalChar=","
                                    thousandChar="."
                                    name="price"
                                    id="price"
                                    autoComplete="off"
                                    placeholder="ví dụ: 2500000"
                                    label="Giá phòng: VND (*)"
                                    spellCheck={false}
                                    className="w-100"
                                />
                                <ErrorMessage
                                    name="price"
                                    render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                                />
                            </Grid>{' '}
                            <Grid item xs={3} className="mt-5 ">
                                <Field
                                    as={NumericInput}
                                    precision={0}
                                    decimalChar=","
                                    thousandChar="."
                                    name="deposit"
                                    id="deposit"
                                    autoComplete="off"
                                    placeholder="ví dụ: 800000"
                                    label="Tiền đặt cọc: VND (*)"
                                    spellCheck={false}
                                    className="w-100"
                                />
                                <ErrorMessage
                                    name="deposit"
                                    render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                                />
                            </Grid>
                            <Grid item xs={4} className="mt-5  ">
                                <FormControl fullWidth className="col-3">
                                    <InputLabel>Số người/Phòng</InputLabel>
                                    <Select
                                        label="Số người/Phòng"
                                        onChange={(e: any) =>
                                            setnumberOptions({
                                                ...numberOptions,
                                                numberOfPeople: e.target.value as number,
                                            })
                                        }
                                        defaultValue={0}
                                    >
                                        {numbers.map((none: any, index: number) => (
                                            <MenuItem key={index} value={index + 1}>
                                                {index + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} className="mt-5 ">
                                <FormControl fullWidth className="col-3">
                                    <InputLabel>Vị trí: Tầng</InputLabel>
                                    <Select
                                        label="Vị trí: Tầng"
                                        onChange={(e: any) =>
                                            setnumberOptions({
                                                ...numberOptions,
                                                floor: e.target.value as number,
                                            })
                                        }
                                        defaultValue={0}
                                    >
                                        {numbers.map((none: any, index: number) => (
                                            <MenuItem key={index} value={index + 1}>
                                                {index + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} className="mt-5 ">
                                <FormControl fullWidth className="col-3">
                                    <InputLabel>Kỳ hạn thuê (Tháng)</InputLabel>
                                    <Select
                                        label="Kỳ hạn thuê (Tháng)"
                                        onChange={(e: any) =>
                                            setnumberOptions({
                                                ...numberOptions,
                                                period: e.target.value as number,
                                            })
                                        }
                                        defaultValue={0}
                                    >
                                        {numbers.map((none: any, index: number) => (
                                            <MenuItem key={index} value={index + 1}>
                                                {index + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} className="mt-5">
                                <Field
                                    as={TextAreaField}
                                    name="description"
                                    id="description"
                                    autoComplete="off"
                                    placeholder={`ví dụ: -phòng trọ sạch sẽ,...`}
                                    label="Mô tả chi tiết"
                                    spellCheck={false}
                                    className={`w-100 `}
                                />
                                <ErrorMessage
                                    name="description"
                                    render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                                />
                            </Grid>
                            <Grid item xs={6} className="mt-5">
                                <div className="w-100">
                                    <label htmlFor="roomUploadFiles">
                                        <div className={`${classes.dragFile} center`}>
                                            <p>
                                                <b> Thêm Ảnh cho Phòng </b>
                                            </p>
                                            <DriveFolderUploadIcon />
                                            <p >
                                                kéo ảnh hoặc nhấn vào đây
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            id="roomUploadFiles"
                                            onChange={(e) => uploadFiles(e)}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </div>
                                <div className="w-100 "> {renderFiles} </div>
                            </Grid>
                            <Grid item xs={12} className="">
                                <div className="w-100 ">
                                    {servicesMap}
                                    <div
                                        className={`${classes.addBtn} center mt-4`}
                                        onClick={() => pushService()}
                                    >
                                        <AddCircleOutlineIcon /> &nbsp; thêm dịch vụ mới
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} className="center mt-5">
                                <Button variant="contained" color="primary" type="submit">
                                    Hoàn tất
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RoomCreate;
