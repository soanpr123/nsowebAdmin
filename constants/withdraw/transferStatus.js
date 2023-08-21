export const WITHDRAW_TRANSFER_STATUS = {
    SUCCESS: 'success',
    PENDING: 'pendding',
    DOING: 'processing',
    ERROR: 'error',
    CANCELED: 'canceled',
};

export const WITHDRAW_TRANSFER_STATUS_OPTIONS = [{
    label: 'Đã chuyển',
    htmlLabel: 'Đã chuyển',
    color: 'green',
    value: WITHDRAW_TRANSFER_STATUS.SUCCESS,
}, {
    label: 'Chờ chuyển',
    htmlLabel: 'Chờ chuyển',
    color: 'orange',
    value: WITHDRAW_TRANSFER_STATUS.PENDING,
}, {
    label: 'Đang chuyển',
    htmlLabel: 'Đang chuyển <i class="fas fa-spinner animate-spin ml-1"></i>',
    color: 'blue',
    value: WITHDRAW_TRANSFER_STATUS.DOING,
}, {
    label: 'Thất bại',
    htmlLabel: 'Thất bại',
    color: 'red',
    value: WITHDRAW_TRANSFER_STATUS.ERROR,
}, {
    label: 'Đã hủy',
    htmlLabel: 'Đã hủy',
    color: 'red',
    value: WITHDRAW_TRANSFER_STATUS.CANCELED,
}];
