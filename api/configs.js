export default (axios) => ({
    getAll: (params) => axios.get('/a/config', { params }),
    update: (data) => axios.patch('/a/config', data),
});
