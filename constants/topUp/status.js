export const TOP_UP_STATUS = {
    SUCCESS: 'success',
    PENDING: 'pendding',
    CANCELED: 'canceled',
};

export const TOP_UP_STATUS_OPTIONS = [{
    label: 'Thành công',
    color: 'green',
    value: TOP_UP_STATUS.SUCCESS,
}, {
    label: 'Đang chờ',
    color: 'orange',
    value: TOP_UP_STATUS.PENDING,
}, {
    label: 'Đã hủy',
    color: 'red',
    value: TOP_UP_STATUS.CANCELED,
}];
