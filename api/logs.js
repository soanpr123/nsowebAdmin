export default (axios) => ({
    getSystemLogs: (params) => axios.get('/a/system_logs', { params }),
    getCallbackLogs: (params) => axios.get('/a/callbacklogs', { params }),
});
