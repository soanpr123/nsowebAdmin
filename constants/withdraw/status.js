export const WITHDRAW_STATUS = {
    SUCCESS: 'success',
    PENDING: 'pendding',
    CANCELED: 'canceled',
};

export const WITHDRAW_STATUS_OPTIONS = [{
    label: 'Đã duyệt',
    color: 'green',
    value: WITHDRAW_STATUS.SUCCESS,
}, {
    label: 'Chờ duyệt',
    color: 'orange',
    value: WITHDRAW_STATUS.PENDING,
}, {
    label: 'Đã hủy',
    color: 'red',
    value: WITHDRAW_STATUS.CANCELED,
}];
