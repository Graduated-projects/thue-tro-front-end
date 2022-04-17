import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuthStore } from '@/app/store';
import { contractService } from '@/services/contract.service';
import { fireErrorMessage, formatVND } from '@/configs/common-function';

import Swal from 'sweetalert2';
import { authService } from '@/services/auth.service';
import withReactContent from 'sweetalert2-react-content';
import { PAYMENT_STORAGE, typeOfPayment } from '@/configs/const';

const useStyle = makeStyles({
    container: {
        padding: `4rem 2rem`,
        boxShadow:
            'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
        margin: '2rem 0',
        borderRadius: '7.5px',
    },

    body: {
        padding: '1rem',
    },
    contractTitle: {
        fontSize: '36px',
        fontWeight: 'bold',
    },
    law: {
        fontStyle: 'italic',
        color: 'blue',
    },
    signal: {
        marginTop: '1rem',
        color: 'blue',
        cursor: 'pointer',
        '&:hover': {
            color: 'red',
        },
    },
});
interface Props {
    setStep: any;
}

const RoomContractCreated = ({ setStep }: Props) => {
    const classes = useStyle();
    const [contractInfo, setcontractInfo] = useState<any>();
    const { user } = useAuthStore();

    const url = window.location.href.split('/');
    const roomId = url[url.length - 1];
    const today = new Date();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        sessionStorage.setItem(PAYMENT_STORAGE, contractInfo?.totalCost);
    }, [contractInfo]);

    useEffect(() => {
        contractService
            .getInfoBeforeCreateContract(roomId || '')
            .then((resp) => {
                setcontractInfo(resp.data.data);
            })
            .catch((err) => fireErrorMessage(err));
    }, [roomId]);

    const signContract = () => {
        const email = user?.email;
        Swal.fire({
            title: 'Xác nhận!',
            text: 'Bạn có đồng ý ký tên?',
            icon: 'question',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'hủy',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                authService
                    .genOtp({
                        email,
                        type: 2,
                    })
                    .then((resp) => {
                        MySwal.fire({
                            title: 'Xác thực OTP!',
                            html: (
                                <div>
                                    <p>
                                        Một mã OTP đã gửi về email: <b>{email}</b>
                                    </p>
                                    <p>Vui lòng xác thực OTP để hoàn tất ký hợp đồng</p>
                                    <TextField
                                        id="outlined-basic"
                                        label="OTP"
                                        variant="outlined"
                                        onChange={(e) => {
                                            sessionStorage.setItem('otppay', e.target.value);
                                        }}
                                    />
                                </div>
                            ),
                            icon: 'info',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Xác thực',
                            cancelButtonText: 'hủy',
                            showCancelButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                const otp = sessionStorage.getItem('otppay');

                                authService.verifyEmail({ email, otp }, 2).then((resp) => {
                                    if (resp.data.data.success) {
                                        const sessionContract = {
                                            roomId,
                                            renterId: user?.id,
                                            period: contractInfo?.room?.period,
                                        };
                                        sessionStorage.setItem(
                                            'sessionContract',
                                            JSON.stringify(sessionContract)
                                        );
                                        sessionStorage.removeItem('otppay');
                                        setStep(2);
                                    } else {
                                        fireErrorMessage('OTP không hợp lệ!');
                                    }
                                });
                            }
                        });
                    });
            }
        });
    };

    return (
        <Grid container spacing={2} className={`${classes.container}`}>
            <Grid item xs={12} textAlign="center" className={``}>
                CỘNG HÒA XÃ HỘI - CHỦ NGHĨA VIỆT NAM
            </Grid>
            <Grid item xs={12} textAlign="center" className={``}>
                Độc lập - Tự do - Hạnh phúc
            </Grid>
            <Grid item xs={12} textAlign="right" className={``}>
                {`TP HCM, ngày ${today.getDate()}, tháng ${
                    today.getMonth() + 1
                }, năm ${today.getFullYear()}`}
            </Grid>
            <Grid item xs={12} textAlign="center" className={classes.contractTitle}>
                HỢP ĐỒNG THUÊ NHÀ
            </Grid>
            <Grid item xs={12} textAlign="left" className={``}>
                Căn cứ
                <span className={`${classes.law}`}>
                    Bộ luật Dân sự số 91/2015/QH13 ngày 24/11/2015
                </span>
            </Grid>
            <Grid item xs={12} textAlign="left" className={``}>
                Căn cứ
                <span className={`${classes.law}`}>
                    Luật Thương mại số 36/2005/QH11 ngày 14 tháng 06 năm 2005
                </span>
            </Grid>
            <Grid item xs={12} textAlign="left" className={``}>
                Căn cứ
                <span className={`${classes.law}`}>
                    Căn cứ vào nhu cầu và sự thỏa thuận của các bên tham gia Hợp đồng
                </span>
            </Grid>
            <Grid item xs={12} textAlign="left" className={``}>
                {`Hôm nay, ngày ${today.getDate()}, tháng ${
                    today.getMonth() + 1
                }, năm ${today.getFullYear()}, các Bên gồm:`}
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b> BÊN CHO THUÊ (Bên A):</b> {contractInfo?.owner?.ekyc?.fullName}
                <div>CMND số: {contractInfo?.owner?.ekyc?.idCardNo}</div>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b> BÊN THUÊ (Bên B):</b> {user?.fullName.toUpperCase()}
                <div>CMND số:. {contractInfo?.renter?.ekyc?.idCardNo}</div>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <p>
                    {' '}
                    Bên <b>A</b> và Bên <b>B</b> sau đây gọi chung là <b>“Hai Bên”</b>{' '}
                    <b> hoặc “Các Bên”</b>.{' '}
                </p>
                <p>
                    Sau khi thảo luận, Hai Bên thống nhất đi đến ký kết Hợp đồng thuê nhà (“Hợp
                    Đồng”) với các điều khoản và điều kiện dưới đây:
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <p>
                    <b> Điều 1. Nhà ở và các tài sản cho thuê kèm theo nhà ở:</b>
                </p>
                <p>
                    1.1. Bên A đồng ý cho Bên B thuê và Bên B cũng đồng ý thuê quyền sử dụng đất và
                    một căn nhà gắn liền với quyền sử dụng đất tại địa chỉ{' '}
                    <b>{contractInfo?.room?.address} </b> để sử dụng làm nơi để ở.
                </p>
                <p>
                    Diện tích căn nhà :<b> {contractInfo?.room?.acreage}m² </b>
                </p>
                <p>
                    1.2. Bên A cam kết quyền sử sụng đất và căn nhà gắn liền trên đất trên là tài
                    sản sở hữu hợp pháp của Bên A. Mọi tranh chấp phát sinh từ tài sản cho thuê trên
                    Bên A hoàn toàn chịu trách nhiệm trước pháp luật.
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b>Điều 2. Bàn giao và sử dụng diện tích thuê:</b>
                <p>
                    2.1. Thời điểm Bên A bàn giao Tài sản thuê vào{' '}
                    <b>
                        {' '}
                        {`ngày ${today.getDate()}, tháng ${
                            today.getMonth() + 1
                        }, năm ${today.getFullYear()}`}
                    </b>
                </p>
                <p>
                    2.2. Bên B được toàn quyền sử dụng Tài sản thuê kể từ thời điểm được Bên A bàn
                    giao như quy định tại Mục 2.1 trên đây.
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b>Điều 3. Thời hạn thuê</b>
                <p>
                    3.1. Bên A cam kết cho Bên B thuê Tài sản thuê với thời hạn là{' '}
                    <b>{Math.ceil(contractInfo?.room?.period) / 30}</b> tháng kể từ ngày bàn giao
                    Tài sản thuê;
                </p>
                <p>
                    3.2. Hết thời hạn thuê nêu trên nếu bên B có nhu cầu tiếp tục sử dụng thì Bên A
                    phải ưu tiên cho Bên B tiếp tục thuê.
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b>Điều 4. Đặc cọc tiền thuê nhà</b>
                <p>
                    4.1. Bên B sẽ giao cho Bên A một khoản tiền là{' '}
                    <b className="text-danger"> {formatVND(contractInfo?.room?.deposit || '')}</b>{' '}
                    ngay sau khi ký hợp đồng này. Số tiền này là tiền đặt cọc để đảm bảm thực hiện
                    Hợp đồng cho thuê nhà. Kể từ ngày Hợp Đồng có hiệu lực.
                </p>
                <p>
                    4.2. Nếu Bên B đơn phương chấm dứt hợp đồng mà không thực hiện nghĩa vụ báo
                    trước tới Bên A thì Bên A sẽ không phải hoàn trả lại Bên B số tiền đặt cọc này.
                </p>{' '}
                <p>
                    Nếu Bên A đơn phương chấm dứt hợp đồng mà không thực hiện nghĩa vụ báo trước tới
                    bên B thì bên A sẽ phải hoàn trả lại Bên B số tiền đặt cọc và phải bồi thường
                    thêm một khoản bằng chính tiền đặt cọc.
                </p>{' '}
                <p>
                    4.3. Tiền đặt cọc của Bên B sẽ không được dùng để thanh toán Tiền Thuê. Nếu Bên
                    B vi phạm Hợp Đồng làm phát sinh thiệt hại cho Bên A thì Bên A có quyền khấu trừ
                    Tiền Đặt Cọc để bù đắp các chi phí khắc phục thiệt hại phát sinh. Mức chi phí bù
                    đắp thiệt hại sẽ được Các Bên thống nhất bằng văn bản.
                </p>
                <p>
                    4.4. Vào thời điểm kết thúc Thời Hạn Thuê hoặc kể từ ngày Chấm dứt Hợp Đồng, Bên
                    A sẽ hoàn lại cho Bên B số Tiền Đặt Cọc sau khi đã khấu trừ khoản tiền chi phí
                    để khắc phục thiệt hại (nếu có).
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b>Điều 5. Tiền thuê nhà:</b>
                <p>
                    5.1. Tiền Thuê nhà đối với Diện Tích Thuê nêu tại mục 1.1 Điều 1 là:{' '}
                    <b className="text-danger">
                        {' '}
                        {formatVND(contractInfo?.room?.price || '')} /tháng{' '}
                    </b>
                </p>
                <p>
                    5.2 Tiền Thuê nhà không bao gồm chi phí sử dụng Diên tích thuê. Mọi chi phí sử
                    dụng Diện tích thuê nhà bao gồm tiền điện, nước, vệ sinh....sẽ do bên B trả theo
                    khối lượng, công suất sử dụng thực tế của Bên B hàng tháng, được tính theo đơn
                    giá của nhà nước.
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b>Điều 6. Phương thức thanh toán tiền thuê nhà:</b>
                <p>
                    Tiền Thuê nhà và chi phí sử dụng Diện tích thuê được thành toán theo 01 (một)
                    tháng/lần vào ngày <b>{today.getDate()}</b> hàng tháng. Việc thanh toán Tiền
                    Thuê nhà và chi phí sử dụng Diện tích thuê theo Hợp Đồng này được thực hiện bằng
                    đồng tiền Việt Nam.
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b>Điều 7. Quyền và nghĩa vụ của bên cho thuê nhà:</b>
                <p>
                    {' '}
                    <b>7.1. Quyền của Bên Cho Thuê:</b>{' '}
                </p>
                <p>
                    Yêu cầu Bên B thanh toán Tiền Thuê và Chi phí sử dụng Diện Tích Thuê đầy đủ,
                    đúng hạn theo thoả thuận trong Hợp Đồng.<br></br> Yêu cầu Bên B phải sửa chữa
                    phần hư hỏng, thiệt hại do lỗi của Bên B gây ra.
                </p>
                <b>7.2. Nghĩa vụ của Bên Cho Thuê:</b>
                <p>
                    - Bàn giao Diện Tích Thuê cho Bên B theo đúng thời gian quy định trong Hợp Đồng;
                </p>
                <p>- Đảm bảo việc cho thuê theo Hợp Đồng này là đúng quy định của pháp luật;</p>
                <p>
                    - Đảm bảo cho Bên B thực hiện quyền sử dụng Diện Tích Thuê một cách độc lập và
                    liên tục trong suốt Thời Hạn Thuê, trừ trường hợp vi phạm pháp luật và/hoặc các
                    quy định của Hợp Đồng này.
                </p>
                <p>
                    - Không xâm phạm trái phép đến tài sản của Bên B trong phần Diện Tích Thuê. Nếu
                    Bên A có những hành vi vi phạm gây thiệt hại cho Bên B trong Thời Gian Thuê thì
                    Bên A phải bồi thường.
                </p>
                <p>
                    - Tuân thủ các nghĩa vụ khác theo thoả thuận tại Hợp Đồng này hoặc/và các văn
                    bản kèm theo Hợp đồng này; hoặc/và theo quy định của pháp luật Việt Nam.
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b>Điều 8. Quyền và nghĩa vụ của bên thuê nhà:</b>

                <p>
                    <b>8.1. Quyền của Bên Cho Thuê:</b>
                </p>
                <p>+ Nhận bàn giao Diện tích Thuê theo đúng thoả thuận trong Hợp Đồng;</p>
                <p>
                    + Được sử dụng phần Diện Tích Thuê làm nơi để ở và các hoạt động hợp pháp khác;
                </p>
                <p>
                    + Yêu cầu Bên A sửa chữa kịp thời những hư hỏng không phải do lỗi của Bên B
                    trong phần Diện Tích Thuê để bảo đảm an toàn;
                </p>
                <p>
                    + Được tháo dỡ và đem ra khỏi phần Diện Tích Thuê các tài sản, trang thiết bị
                    của bên B đã lắp đặt trong phần Diện Tích Thuê khi hết Thời Hạn Thuê hoặc Đơn
                    phương chấm dứt hợp đồng Bên thoả thuận chấm dứt Hợp Đồng.
                </p>
                <b>8.2. Nghĩa vụ của Bên Thuê:</b>
                <p>
                    + Sử dụng Diện Tích Thuê đúng mục đích đã thỏa thuận, giữ gìn nhà ở và có trách
                    nhiệm trong việc sửa chữa những hư hỏng do mình gây ra;
                </p>
                <p>+ Thanh toán Tiền Đặt Cọc, Tiền Thuê đầy đủ, đúng thời hạn đã thỏa thuận;</p>
                <p>
                    + Trả lại Diện Tích Thuê cho Bên A khi hết Thời Hạn Thuê hoặc chấm dứt Hợp Đồng
                    Thuê;
                </p>
                <p>
                    + Mọi việc sửa chữa, cải tạo, lắp đặt bổ sung các trang thiết bị làm ảnh hưởng
                    đến kết cấu của căn phòng…, Bên B phải có văn bản thông báo cho Bên A và chỉ
                    được tiến hành các công việc này sau khi có sự đồng ý bằng văn bản của Bên A;
                </p>
                <p>
                    + Tuân thủ một cách chặt chẽ quy định tại Hợp Đồng này, các nội quy phòng trọ
                    (nếu có) và các quy định của pháp luật Việt Nam.
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b>
                    Điều 9. Đơn phương chấm dứt{' '}
                    <span className="text-danger"> HỢP ĐỒNG THUÊ NHÀ: </span>
                </b>
                <p>
                    Trong trường hợp một trong Hai Bên muốn đơn phương chấm dứt Hợp Đồng trước hạn
                    thì phải thông báo bằng văn bản cho Bên kia trước <b> 15 (mười lăm) </b> ngày so
                    với ngày mong muốn chấm dứt. Nếu một trong Hai Bên không thực hiện nghĩa vụ
                    thông báo cho Bên kia thì sẽ phải bồi thường cho bên đó một khoản Tiền thuê
                    tương đương với thời gian không thông báo và các thiệt hại khác phát sinh do
                    việc chấm dứt Hợp Đồng trái quy định.
                </p>
            </Grid>
            <Grid item xs={12} textAlign="left" className={`mt-5`}>
                <b>Điều 10. Điều khoản thi hành:</b>
                <p>- Hợp đồng này được thành lập kể từ ngày hai bên cũng ký kết;</p>
                <p>
                    - Các Bên cam kết thực hiện nghiêm chỉnh và đầy đủ các thoả thuận trong Hợp Đồng
                    này trên tinh thần hợp tác, thiện chí.
                </p>
                <p>
                    - Mọi sửa đổi, bổ sung đối với bất kỳ điều khoản nào của Hợp Đồng phải được lập
                    thành văn bản, có đầy đủ chữ ký của mỗi Bên. Văn bản sửa đổi bổ sung Hợp Đồng có
                    giá trị pháp lý như Hợp Đồng, là một phần không tách rời của Hợp Đồng này.
                </p>
                <p>
                    - Hợp Đồng được lập thành 02 (hai) bản có giá trị như nhau, mỗi Bên giữ 01 (một)
                    bản để thực hiện.
                </p>
            </Grid>
            <Grid item xs={12} textAlign="center" className={`mt-5`}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div>
                            {' '}
                            <b> BÊN CHO THUÊ (BÊN A)</b>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <b> BÊN THUÊ (BÊN B)</b>
                            <div className={`${classes.signal}`} onClick={() => signContract()}>
                                {' '}
                                Bấm vào đây để ký tên{' '}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RoomContractCreated;
