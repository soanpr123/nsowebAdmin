export default (axios) => ({
    getAll: (params) => axios.get('/a/sms_error/get_all', { params }),
});
