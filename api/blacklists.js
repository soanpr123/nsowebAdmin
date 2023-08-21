export default (axios) => ({
    getAll: (params) => axios.get('/a/blacklist', { params }),
    create: (data) => axios.post('/a/blacklist', data),
    delete: (blacklistId) => axios.delete(`/a/blacklist/${blacklistId}`),
});
