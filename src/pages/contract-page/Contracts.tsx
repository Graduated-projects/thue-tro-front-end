import { useAppDispatch } from '@/app/hooks';
import { useAuthStore } from '@/app/store';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';
import { formatVND, limitString } from '@/configs/common-function';
import BackButton from '@/components/BackButton';
import { Contract } from '@/types/contract.type';
import ContractImage from '@/assets/img/contract.jpg';

const useStyle = makeStyles({
    my: {
        fontSize: `30px`,
        fontWeight: 'bold',
    },
    container: {
        padding: `4rem 0`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: `25px`,
        fontWeight: 'bold',
    },
    img: {
        width: '100%',
        height: '150px',
        margin: '0.25rem',
    },
    cardContainer: {
        boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
        cursor: `pointer`,
    },
    cardMedia: {
        height: '150px',
    },
    cardContent: {},
    cardAction: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
    },
});

interface Props {
    contracts: Array<Contract>;
    isLoadingContracts: boolean;
    pathTo: string;
    title: string;
}

const Contracts = ({ contracts, isLoadingContracts, pathTo, title }: Props) => {
    const { user, isLogin } = useAuthStore();
    const classes = useStyle();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate(path.main.home);
    }, []);

    console.log(contracts);

    const contractsMap = contracts.map((contract: Contract, index: number) => {
        return (
            <Grid item xs={3} key={index}>
                <Card variant="outlined" key={index} className={classes.cardContainer}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        className={classes.cardMedia}
                        image={ContractImage}
                    />
                    <CardContent className={classes.cardMedia}>
                        <Typography gutterBottom component="div" textAlign="center">
                            <span style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: 0.7 }}>
                                {' '}
                                Hợp đồng số {contract.id}{' '}
                            </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <React.Fragment>
                                <div>
                                    Ngày lập: <b> {contract.createDate} </b>
                                </div>
                                <div>
                                    Chủ nhà:{' '}
                                    <b className="text-danger">
                                        {' '}
                                        {Number(contract.owner.user.id) === Number(user?.id)
                                            ? 'Tôi'
                                            : contract.owner.ekyc.fullName}{' '}
                                    </b>
                                </div>
                                <div>
                                    Người thuê:{' '}
                                    <b className="text-success">
                                        {' '}
                                        {contract.renter.ekyc.fullName}{' '}
                                    </b>
                                </div>
                                <div>
                                    Kỳ hạn thuê:{' '}
                                    <b>{Math.ceil(Number(contract.room.period)) / 30} tháng</b>
                                </div>
                                <div>
                                    Giá phòng:
                                    <b className="text-danger">
                                        {' '}
                                        {formatVND(Number(contract.room.price))}{' '}
                                    </b>
                                </div>
                            </React.Fragment>
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <Button
                            size="small"
                            onClick={() => navigate(pathTo.replace(':id', contract.id.toString()))}
                        >
                            Xem chi tiết
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    });

    return (
        <div className="container">
            <BackButton />
            {isLoadingContracts ? (
                <CircularProgress />
            ) : (
                <div className={`container`}>
                    <div className={`${classes.container} `}>
                        <Grid
                            item
                            xs={12}
                            textAlign="center"
                            className={`text-success ${classes.my} mbot-3`}
                        >
                            {title}
                        </Grid>
                        <Grid container spacing={2}>
                            {contractsMap}
                        </Grid>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contracts;
