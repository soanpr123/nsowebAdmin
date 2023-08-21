export default [{
    label: 'Dashboard',
    route: '/',
    icon: 'fas fa-home',
    roles: ['admin'],
    childs: [],
}, {
    label: 'Báo cáo',
    icon: 'far fa-file-alt',
    route: '/reports',
    roles: ['admin'],
    childs: [],
}, {
    //     label: 'Momo In',
    //     route: '/momo/in',
    //     style: {
    //         'margin-top': '40px !important',
    //     },
    //     icon: 'fas fa-money-bill-wave',
    //     childs: [],
    // }, {
    //     label: 'Momo Out',
    //     route: '/momo/out',
    //     icon: 'fas fa-money-bill',
    //     childs: [],
    // }, {
    //     label: 'Lịch sử map ví',
    //     icon: 'fas fa-money-bill-alt',
    //     route: '/momo/map',
    //     childs: [],
    // }, {
    label: 'Bank In',
    route: '/top-ups',
    style: {
        'margin-top': '40px !important',
    },
    icon: 'fas fa-money-check-alt',
    roles: ['admin'],
    childs: [],
}, {
    label: 'Bank Out',
    style: {
        'margin-bottom': '40px !important',
    },
    route: '/withdraws',
    icon: 'fas fa-hand-holding-usd',
    roles: ['admin'],
    childs: [],
}, {
    label: 'Tài khoản',
    icon: 'fas fa-users',
    route: '/users',
    roles: ['admin'],
    childs: [],
}, {
    label: 'Cấu hình',
    icon: 'fas fa-university',
    roles: ['admin'],
    route: '/setting',
    childs: [{
        label: 'Hệ thống',
        route: '/setting/configs',
        roles: ['admin'],
        childs: [],
    }, {
        label: 'Bank',
        route: '/setting/banks',
        roles: ['admin'],
        childs: [],
    }, {
        label: 'Whitelist IP',
        route: '/setting/white-list',
        roles: ['admin'],
        childs: [],
    }, {
        label: 'Blacklist rút',
        route: '/setting/black-list',
        roles: ['admin'],
        childs: [],
    }],
}, {
    label: 'SMS',
    route: '/sms',
    roles: ['admin'],
    icon: 'fas fa-sms',
    childs: [{
        label: 'Nạp tiền',
        route: '/sms/top-ups',
        roles: ['admin'],
        childs: [],
    }, {
        label: 'Rút tiền',
        route: '/sms/withdraws',
        roles: ['admin'],
        childs: [],
    }, {
        label: 'Khác',
        route: '/sms/orther',
        roles: ['admin'],
        childs: [],
    }],
}];
