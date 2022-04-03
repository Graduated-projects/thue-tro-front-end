import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

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
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
});
interface Props {
    setStep: any;
}

const RoomRules = ({ setStep }: Props) => {
    const classes = useStyle();
    const [isAcceptRules, setisAcceptRules] = useState<boolean>(false);

    const CREATE_RULES_NEXT_STEP = 1;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setisAcceptRules(event.target.checked);
    };
    const generalRules = [
        'Hợp đồng chỉ được tạo thành công khi bên A chấp nhận hợp đồng và bên B phải thanh toán chi phí ban đầu(tiền cọc và tiền nhà tháng đầu).',
        '2 bên phải chấp thuận các điều khoản đề ra.',
    ];
    const ownerRules = [
        'Tiền phòng sẽ được chuyển về tài khoản của bên A sau 15 ngày kể từ ngày thành lập hợp đồng hàng tháng.',
        'Bên A không được phép tự hủy hợp đồng sau 15 ngày kể từ ngày lập hợp đồng. ',
        'Được quyền yêu cầu bên B thanh toán tiền thuê nhà đầy đủ theo thời hạn đã thoả thuận tại Điều 3 của hợp đồng này.',
        'Giữ nguyên hiện trạng toàn bộ cơ sở vật chất của Diện tích thuê khi bàn giao cho Bên B.',
        'Chịu trách nhiệm sửa chữa đối với những hư hỏng về mặt kết cấu của Diện tích thuê không phải do lỗi của bên B gây ra. Trong thời hạn chậm nhất 30 ngày kể từ ngày nhận được thông báo của bên B về những hư hỏng đó.',
        'Ưu tiên gia hạn hợp đồng với bên B với các điều khoản đã thoả thuận trong hợp đồng này.',
        'Chịu trách nhiệm đăng ký tạm trú cho nhân viên của Bên B trực tiếp sử dụng Diện tích thuê theo quy định của pháp luật Việt Nam.',
        'Bên A không được phép tăng giá thuê phòng trong thời gian hợp đồng.',
    ];

    const renterRules = [
        'Tiền cọc sẽ được Houflex giữ trong thời gian mà bên chủ đưa ra (ví dụ: 2 tháng, 6 tháng,...).',
        'Tại thời điểm hai bên ký Hợp đồng này, Bên B sẽ thanh toán cho Bên A Tiền thuê hàng tháng.',
        'Tiền dịch vụ(điện,nước,...) sẽ được cộng vào số tiền phải thanh toán vào tháng sau. ',
        'Tiền dịch vụ sẽ do bên A nhập. Bên B sẽ xác nhận tiền dịch vụ này và đồng ý thanh toán. Trường hợp bên B có cảm thấy không thỏa đáng thì có thể khiếu nại. ',
        'Bên thuê sẽ nhận lại tiền cọc khi đáp ứng đủ thời gian bên cho thuê đưa ra.',
        'Trong trường hợp bên thuê vi phạm hợp đồng trước thời gian quy định của bên cho thuê thì tiền cọc sẽ được chuyển cho bên A đồng thời hợp đồng sẽ bị hủy.',
        'Không cho phép bên thứ 3 thuê lại.',
        'Trong trường hợp thiết bị trong phòng xảy ra sự cố, bên B phải báo lại cho bên A để khắc phục sự cố. Nếu sự cố đó do bên B gây ra thì toàn bộ chi phí sửa chửa sẽ do bên B chi trả. Tiền chi trả sẽ được cộng vào phí dịch vụ tháng sau.',
        'Được phép trang trí, lắp đặt các trang thiết bị để phù hợp với sinh hoạt của Bên B. Nhưng không làm ảnh hưởng đến kết cấu của toà nhà(do bên A quyết định).',
        'Nếu bên B muốn trả phòng thì phải thông báo cho bên A ít nhất 15 ngày. 	',
    ];
    const renderGeneralRules = (rules: Array<string>) => rules.map((rule, index) => <p key={index}> - {rule} </p>);

    return (
        <React.Fragment>
            <Grid item xs={12} className={`center`}>
                <div className={`${classes.title}`}>Điều khoản lập hợp đồng</div>
            </Grid>
            <Grid item xs={12} className={``}>
                <p className={`${classes.subTitle}`}>1. Điều khoản chung</p>
                {renderGeneralRules(generalRules)}
            </Grid>
            <Grid item xs={12} className={``}>
                <p className={`${classes.subTitle}`}>2. Điều khoản của bên cho thuê (Bên A)</p>
                {renderGeneralRules(ownerRules)}
            </Grid>
            <Grid item xs={12} className={``}>
                <p className={`${classes.subTitle}`}>2. Điều khoản của bên thuê (Bên B)</p>
                {renderGeneralRules(renterRules)}
            </Grid>
            <Grid item xs={12} className={``}>
                <p className={`${classes.subTitle}`}>2. Điều khoản của bên thuê (Bên B)</p>
                {renderGeneralRules(renterRules)}
            </Grid>
            <Grid item xs={12} className={`center`} textAlign="center">
                <FormControlLabel
                    label="Tôi đồng ý với điều khoản này"
                    control={<Checkbox checked={isAcceptRules} onChange={handleChange} />}
                />
            </Grid>
            <Grid item xs={12} className={``} textAlign="center">
                <Button
                    variant="contained"
                    disabled={!isAcceptRules}
                    onClick={() => setStep(CREATE_RULES_NEXT_STEP)}
                >
                    Tiếp tục
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default RoomRules;
