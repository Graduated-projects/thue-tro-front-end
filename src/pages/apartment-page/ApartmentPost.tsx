import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Apartment } from '@/types/apartment.type';
import React, { useEffect, useMemo, useState } from 'react';
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
import background from '@/assets/img/background-1.jpg';
import ImageIcon from '@mui/icons-material/Image';

const allCity = require('../../dataCity.json');

const TextAreaField = (props: any) => <TextField multiline {...props} rows={4} />;

const useStyle = makeStyles({
    apartmentContainer: {
        margin: '3rem 12rem',
        padding: '0 1rem',
        borderRadius: '7.5px',
        background: `url(${background})`,
        backgroundPositionY: '-100px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
        height: '80vh',
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
        height: '100px',
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
    const [filesUpload, setfilesUpload] = useState([]);
    const navigate = useNavigate();
    const [provinces, setprovinces] = useState([]);
    const [districts, setdistricts] = useState([]);
    const [wards, setwards] = useState([]);
    
    const [numberOptions, setnumberOptions] = useState({
        totalNumberOfRooms: 0,
        numberOfFloors: 0,
        numberOfRoomsAvailable: 0,
    });
    const [address, setaddress] = useState({
        province: '',
        district: '',
        wards: '',
        street: '',
    });

    const numbers = Array(50).fill(null);

    useEffect(() => {
        setprovinces(allCity.map((city: any) => city.name));
    }, []);

    useEffect(() => {
        const filterDistrict = allCity.find((city: any) => city.name === address.province);
        if (filterDistrict && filterDistrict.districts) setdistricts(filterDistrict.districts);
    }, [address.province]);

    useEffect(() => {
        const filterWards: any = districts.find(
            (district: any) => district.name === address.district
        );

        if (filterWards && filterWards.wards) setwards(filterWards.wards);
    }, [address.district]);

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

    const postApartment = (apartment: Apartment, formik: any) => {
        const apartmentPost = {
            ...apartment,
            address: `${apartment.address}, ${address.wards}, ${address.district}, ${address.province}`,
            totalNumberOfRooms: numberOptions.numberOfFloors,
            numberOfRoomsAvailable: numberOptions.numberOfRoomsAvailable,
            numberOfFloors: numberOptions.numberOfFloors,
        };

        const formData = new FormData();
        if (filesUpload.length) {
            filesUpload.forEach((file) => {
                formData.append('files', file);
            });

            mediaService
                .uploadFiles(formData)
                .then((resp) => {
                    const { urls } = resp.data.data;
                    apartment.imageUrls = urls;
                    
                    
                    apartmentService
                        .postApartment(apartmentPost)
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
                {(formik: any) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className="" textAlign="center">
                                <p className={`${classes.title}`}>Tạo một căn hộ</p>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid item xs={12} className="">
                                    <Field
                                        as={TextField}
                                        type="text"
                                        name="reminiscentName"
                                        id="reminiscentName"
                                        autoComplete="off"
                                        placeholder="ví dụ: Nhà trọ giá tốt Quận 5"
                                        label="Tiêu đề căn hộ (*)"
                                        spellCheck={false}
                                        className="w-100"
                                    />
                                    <ErrorMessage
                                        name="reminiscentName"
                                        render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                                    />
                                </Grid>
                                <Grid item xs={12} className="mt-5">
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth className="col-3">
                                                <InputLabel>Tổng số phòng</InputLabel>
                                                <Select
                                                    label="Tổng số phòng"
                                                    onChange={(e) =>
                                                        setnumberOptions({
                                                            ...numberOptions,
                                                            totalNumberOfRooms: Number(
                                                                e.target.value
                                                            ),
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
                                        <Grid item xs={4}>
                                            <FormControl fullWidth className="col-3">
                                                <InputLabel>Số phòng trống</InputLabel>
                                                <Select
                                                    label="Số phòng trống"
                                                    onChange={(e) =>
                                                        setnumberOptions({
                                                            ...numberOptions,
                                                            numberOfRoomsAvailable: Number(
                                                                e.target.value
                                                            ),
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
                                        <Grid item xs={4}>
                                            <FormControl fullWidth className="col-3">
                                                <InputLabel>Số Tầng</InputLabel>
                                                <Select
                                                    label="Số Tầng"
                                                    onChange={(e) =>
                                                        setnumberOptions({
                                                            ...numberOptions,
                                                            numberOfFloors: Number(e.target.value),
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
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className="mt-5 ">
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
                                </Grid>{' '}
                            </Grid>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth className="col-3">
                                                <InputLabel>Tỉnh</InputLabel>
                                                <Select
                                                    label="Tỉnh"
                                                    onChange={(e: any) =>
                                                        setaddress({
                                                            ...address,
                                                            province: e.target.value as string,
                                                        })
                                                    }
                                                    defaultValue=""
                                                >
                                                    {provinces.map((prv: any, index: number) => (
                                                        <MenuItem key={index} value={prv}>
                                                            {prv}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth className="col-3">
                                                <InputLabel>Quận/Huyện</InputLabel>
                                                <Select
                                                    label="Quận/Huyện"
                                                    onChange={(e: any) =>
                                                        setaddress({
                                                            ...address,
                                                            district: e.target.value as string,
                                                        })
                                                    }
                                                    defaultValue=""
                                                >
                                                    {districts.map(
                                                        (district: any, index: number) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={district.name}
                                                            >
                                                                {district.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth className="col-3">
                                                <InputLabel>Phường/Xã</InputLabel>
                                                <Select
                                                    label="Phường/Xã"
                                                    onChange={(e: any) =>
                                                        setaddress({
                                                            ...address,
                                                            wards: e.target.value as string,
                                                        })
                                                    }
                                                    defaultValue=""
                                                >
                                                    {wards.map((wards: any, index: number) => (
                                                        <MenuItem key={index} value={wards.name}>
                                                            {wards.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className="mt-5">
                                    <Field
                                        as={TextField}
                                        type="text"
                                        name="address"
                                        id="address"
                                        autoComplete="off"
                                        placeholder="ví dụ: 497/24/3 Phan văn trị"
                                        label="Địa chỉ (*)"
                                        spellCheck={false}
                                        className="w-100"
                                    />
                                    <ErrorMessage
                                        name="address"
                                        render={(err) => <div style={{ color: 'red' }}>{err}</div>}
                                    />
                                </Grid>
                                <Grid item xs={12} className="mt-5">
                                    <div className="w-100">
                                        <label htmlFor="apartmentUploadFiles">
                                            <div className={`${classes.dragFile} center`}>
                                                <DriveFolderUploadIcon />
                                                <p>kéo ảnh hoặc nhấn vào đây</p>
                                            </div>
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
                                <Grid item xs={12} className="">
                                    <div className="w-100 "> {renderFiles} </div>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="mt-5 mbot-5" textAlign="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    style={{ marginTop: 'auto' }}
                                >
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

export default ApartmentPost;
