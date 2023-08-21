export default (axios) => ({
    getAll: (params) => axios.get('/a/user/get_all', { params }),
    getDetail: (userId) => axios.get(`/a/user/${userId}`),
    create: (data) => axios.post('/a/user', data),
    update: (userId, data) => axios.patch(`/a/user/${userId}`, data),
    delete: (userId) => axios.delete(`/a/user/${userId}`),
});
