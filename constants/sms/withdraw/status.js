export const SMS_WITHDRAW_STATUS = {
    SUCCESS: 'success',
    PENDING: 'pendding',
    ERROR: 'error',
};

export const SMS_WITHDRAW_STATUS_OPTIONS = [{
    label: 'Thành công',
    color: 'green',
    value: SMS_WITHDRAW_STATUS.SUCCESS,
}, {
    label: 'Chờ xử lý',
    color: 'orange',
    value: SMS_WITHDRAW_STATUS.PENDING,
}, {
    label: 'Thất bại',
    color: 'red',
    value: SMS_WITHDRAW_STATUS.ERROR,
}];
