import { useAuthStore } from '@/app/store';
import { walletService } from '@/services/wallet.service';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import BackButton from '@/components/BackButton';
import { makeStyles } from '@mui/styles';
import styled from '@emotion/styled';
import { formatVND } from '@/configs/common-function';
import { WalletHistory } from '@/types/wallet.type';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1976d2',
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#dddddd',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    transition: '0.5',
    '&:hover': {
        backgroundColor: '#c4fcef',
    },
}));

const useStyles = makeStyles({
    container: {
        padding: '1rem 3rem',
    },
});

const WalletHistoryPage = () => {
    const [walletHistories, setwalletHistories] = useState<any>([]);
    const [page, setpage] = useState(0);
    const { user } = useAuthStore();
    const classes = useStyles();

    useEffect(() => {
        walletService.getTransactionHistory(page).then((resp) => {
            if (resp.data.data) {
                const clone = [...walletHistories, ...resp.data.data.content];
                setwalletHistories(clone);
            }
        });
    }, [user, page]);

    console.log(page);

    const walletMap = walletHistories.map((wallet: WalletHistory, index: number) => {
        return (
            <StyledTableRow key={index}>
                <StyledTableCell> {wallet.createdDate} </StyledTableCell>
                <StyledTableCell> {formatVND(Number(wallet.cost))} </StyledTableCell>
                <StyledTableCell> {wallet.detail} </StyledTableCell>
            </StyledTableRow>
        );
    });

    return (
        <div className={`${classes.container}`}>
            <BackButton />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Thời gian</StyledTableCell>
                                    <StyledTableCell align="left">Số tiền</StyledTableCell>
                                    <StyledTableCell align="left">
                                        Nội dung giao dịch
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{walletMap}</TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setpage((p) => p + 1);
                        }}
                    >
                        Xem thêm lịch sử
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default WalletHistoryPage;
