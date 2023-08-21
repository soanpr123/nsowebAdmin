export const SMS_TOP_UP_STATUS = {
    SUCCESS: 'success',
    PENDING: 'pendding',
    ERROR: 'error',
};

export const SMS_TOP_UP_STATUS_OPTIONS = [{
    label: 'Thành công',
    color: 'green',
    value: SMS_TOP_UP_STATUS.SUCCESS,
}, {
    label: 'Chờ xử lý',
    color: 'orange',
    value: SMS_TOP_UP_STATUS.PENDING,
}, {
    label: 'Thất bại',
    color: 'red',
    value: SMS_TOP_UP_STATUS.ERROR,
}];
