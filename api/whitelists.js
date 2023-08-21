import * as download from 'downloadjs';

export default (axios) => ({
    getAll: (params) => axios.get('/a/white_list_ip/get_all', { params }),
    create: (data) => axios.post('/a/white_list_ip', data),
    update: (whitelistId, data) => axios.patch(`/a/white_list_ip/${whitelistId}`, data),
    delete: (whitelistId) => axios.delete(`/a/white_list_ip/${whitelistId}`),
    exportXLSX: (params) => axios.get('/a/white_list_ip/get_all', { params, responseType: 'blob' }).then((data) => download(data, `Danh sách IP được phép truy cập-${new Date().toLocaleDateString()}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml')),
});
