export const BANK_ACCOUNT_STATUS = {
    INACTIVE: 'inactive',
    ACTIVE: 'active',
};

export const BANK_ACCOUNT_STATUS_OPTIONS = [{
    label: 'Hoạt động',
    color: 'green',
    value: BANK_ACCOUNT_STATUS.ACTIVE,
}, {
    label: 'Không hoạt động',
    color: 'red',
    value: BANK_ACCOUNT_STATUS.INACTIVE,
}];
