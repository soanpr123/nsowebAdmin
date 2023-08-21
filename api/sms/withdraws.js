import * as download from 'downloadjs';

export default (axios) => ({
    getAll: (params) => axios.get('/a/sms_withdraw/get_all', { params }),
    exportXLSX: (params) => axios.get('/a/sms_withdraw/get_all', { params, responseType: 'blob' }).then((data) => download(data, `SMS rút tiền-${new Date().toLocaleDateString()}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml')),
    update: (smsId, data) => axios.patch(`/a/sms_withdraw/${smsId}`, data),
    mapping: (smsId) => axios.patch(`/a/sms_withdraw/retry_mapping/${smsId}`),
});
