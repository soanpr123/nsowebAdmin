export const TOP_UP_TRANSFER_STATUS = {
    SUCCESS: 'success',
    PENDING: 'pendding',
};

export const TOP_UP_TRANSFER_STATUS_OPTIONS = [{
    label: 'Đã nhận',
    color: 'green',
    value: TOP_UP_TRANSFER_STATUS.SUCCESS,
}, {
    label: 'Đang chờ',
    color: 'orange',
    value: TOP_UP_TRANSFER_STATUS.PENDING,
}];
