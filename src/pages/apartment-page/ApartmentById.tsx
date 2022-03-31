import { useAppDispatch } from '@/app/hooks';
import { path } from '@/configs/path';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const useStyle = makeStyles({
    container: {
        padding: `4rem 0`,
    },
});
const ApartmentById = () => {
    const dispatch = useAppDispatch();
    const classes = useStyle();
    const navigate = useNavigate();
    const url = window.location.href.split('/')
    const apartmentId = url[url.length - 1]
     
    return (
        <div className="container">
            <div className={`${classes.container}`}>
                <React.Fragment>
                    <div className={`text-danger`}>
                        Chỉ có chủ trọ mới thấy chức năng thêm phòng!
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => navigate(path.room.create.replace(':id', apartmentId))}
                    >
                        Tạo thêm phòng cho căn hộ
                    </Button>
                </React.Fragment>
            </div>
        </div>
    );
};

export default ApartmentById;
