export const CONFIG_KEYS = {
    NOTIFY_BOT: 'NOTIFY_BOT',
    TOPUP_CHAT: 'TOPUP_CHAT',
    WITHDRAW_CHAT: 'WITHDRAW_CHAT',
    OTHER_CHAT: 'OTHER_CHAT',
    TOPUP_ALERT: 'TOPUP_ALERT',
    WITHDRAW_ALERT: 'WITHDRAW_ALERT',
    TOPUP_MAX: 'TOPUP_MAX',
    WITHDRAW_MIN: 'WITHDRAW_MIN',
    ALLOW_IPS: 'ALLOW_IPS',
    WITHDRAW_ACCEPT_AUTO_MIN: 'WITHDRAW_ACCEPT_AUTO_MIN',
    TOPUP_CASHOUT_MAX: 'TOPUP_CASHOUT_MAX',
    UNIQUE_USER_ACCBANK: 'UNIQUE_USER_ACCBANK',
};

export const CONFIG_KEY_OPTIONS = [{
    label: 'Bot Telegram',
    value: CONFIG_KEYS.NOTIFY_BOT,
    type: 'notification',
}, {
    label: 'Nhóm nạp',
    value: CONFIG_KEYS.TOPUP_CHAT,
    type: 'notification',
}, {
    label: 'Nhóm rút',
    value: CONFIG_KEYS.WITHDRAW_CHAT,
    type: 'notification',
}, {
    label: 'Nhóm khác',
    value: CONFIG_KEYS.OTHER_CHAT,
    type: 'notification',
}, {
    label: 'Ngưỡng thông báo nạp',
    value: CONFIG_KEYS.TOPUP_ALERT,
    type: 'notification',
    currencyFormat: true,
}, {
    label: 'Ngưỡng thông báo rút',
    value: CONFIG_KEYS.WITHDRAW_ALERT,
    type: 'notification',
    currencyFormat: true,
}, {
    label: 'Ngưỡng cảnh báo tài khoản nạp quá số dư',
    value: CONFIG_KEYS.TOPUP_MAX,
    type: 'notification',
    currencyFormat: true,
}, {
    label: 'Ngưỡng cảnh báo tài khoản rút số dư quá ít',
    value: CONFIG_KEYS.WITHDRAW_MIN,
    type: 'notification',
    currencyFormat: true,
}, {
    label: 'Danh sách IP được phép vào cms',
    value: CONFIG_KEYS.ALLOW_IPS,
    note: 'Cấu hình dạng gần đúng theo dải IP, cách nhau bởi dấu ","',
    type: 'system',
}, {
    label: 'Ngưỡng tự động duyệt rút',
    value: CONFIG_KEYS.WITHDRAW_ACCEPT_AUTO_MIN,
    type: 'system',
    currencyFormat: true,
}, {
    label: 'Ngưỡng tự động rút tiền khỏi tài khoản nạp',
    value: CONFIG_KEYS.TOPUP_CASHOUT_MAX,
    type: 'system',
    currencyFormat: true,
}, {
    label: 'On/Off chế độ user chỉ được phép rút về 1 acc bank',
    value: CONFIG_KEYS.UNIQUE_USER_ACCBANK,
    type: 'system',
    note: 'Nhập 2 giá trị "on"/"off"',
}];
