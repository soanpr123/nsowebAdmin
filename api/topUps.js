import * as download from 'downloadjs';

export default (axios) => ({
    getAll: (params) => axios.get('/a/request_topup/get_all', { params }),
    exportXLSX: (params) => axios.get('/a/request_topup/get_all', { params, responseType: 'blob' }).then((data) => download(data, `Danh sách nạp tiền-${new Date().toLocaleDateString()}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml')),
    create: (data) => axios.post('/a/request_topup', data),
    createManual: (data) => axios.post('/a/request_topup/manual', data),
    update: (topUpId, data) => axios.patch(`/a/request_topup/${topUpId}`, data),
    callback: (topUpId) => axios.patch(`/a/request_topup/retry_callback/${topUpId}`),
});
