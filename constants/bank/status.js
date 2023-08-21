export const BANK_STATUS = {
    INACTIVE: null,
    ACTIVE: 'active',
};

export const BANK_STATUS_OPTIONS = [{
    label: 'Hoạt động',
    color: 'green',
    value: BANK_STATUS.ACTIVE,
}, {
    label: 'Không hoạt động',
    color: 'red',
    value: BANK_STATUS.INACTIVE,
}];
