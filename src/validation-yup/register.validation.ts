import * as Yup from 'yup';
const phoneRegExp =
    /^((\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const Step1Schema = Yup.object({
    fullName: Yup.string()
        .min(8, 'Tên ít nhất 8 ký tự')
        .max(50, 'Tên nhiều nhất 50 ký tự')
        .required('Không được rỗng'),
    email: Yup.string().email('không được rổng').required('Không được rỗng'),
    phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Số điện thoại từ 10 - 11 số')
        .min(10, 'Số điện thoại từ 10 - 11 số')
        .max(11, 'Số điện thoại từ 10 - 11 số')
        .required('Không được rỗng'),
    password: Yup.string()
        .required('Không được rỗng')
        .min(8, 'tối thiểu 8 ký tự')
        .max(20, 'tối đa 20 ký tự'),
    confirmPassword: Yup.string().required('Không được rỗng'),
});
