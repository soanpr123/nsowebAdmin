export const TOP_UP_CALLBACK_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    NULL: 'pendding',
    PROCESSING: 'processing',
    WAITING: null,
};

export const TOP_UP_CALLBACK_STATUS_OPTIONS = [{
    label: 'Thành công',
    htmlLabel: 'Thành công',
    color: 'green',
    value: TOP_UP_CALLBACK_STATUS.SUCCESS,
}, {
    label: 'Đang xử lý',
    htmlLabel: 'Đang xử lý <i class="fas fa-spinner animate-spin"></i>',
    color: 'blue',
    value: TOP_UP_CALLBACK_STATUS.PROCESSING,
}, {
    label: 'Chờ xử lý',
    htmlLabel: 'Chờ xử lý',
    color: 'orange',
    value: TOP_UP_CALLBACK_STATUS.NULL,
}, {
    label: 'Thất bại',
    htmlLabel: 'Thất bại',
    color: 'red',
    value: TOP_UP_CALLBACK_STATUS.ERROR,
}, {
    label: 'Chờ callback',
    htmlLabel: 'Chờ callback',
    color: 'blue',
    value: TOP_UP_CALLBACK_STATUS.WAITING,
}];
