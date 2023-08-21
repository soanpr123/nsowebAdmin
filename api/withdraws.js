import * as download from 'downloadjs';

export default (axios) => ({
    getAll: (params) => axios.get('/a/request_withdraw/get_all', { params }),
    exportXLSX: (params) => axios.get('/a/request_withdraw/get_all', { params, responseType: 'blob' }).then((data) => download(data, `Danh sách rút tiền-${new Date().toLocaleDateString()}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml')),
    getDetail: (withdrawId) => axios.get(`/a/request_withdraw/${withdrawId}`),
    create: (data) => axios.post('/a/request_withdraw', data),
    update: (withdrawId, data) => axios.patch(`/a/request_withdraw/${withdrawId}`, data),
    callback: (withdrawId) => axios.patch(`/a/request_withdraw/retry_withdraw/${withdrawId}`),
});
