import * as download from 'downloadjs';

export default (axios) => ({
    getAll: (params) => axios.get('/a/sms_topup/get_all', { params }),
    exportXLSX: (params) => axios.get('/a/sms_topup/get_all', { params, responseType: 'blob' }).then((data) => download(data, `SMS nạp tiền-${new Date().toLocaleDateString()}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml')),
    update: (smsId, data) => axios.patch(`/a/sms_topup/${smsId}`, data),
    mapping: (smsId, data) => axios.patch(`/a/sms_topup/retry_mapping/${smsId}`, data),
});
