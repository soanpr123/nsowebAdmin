export default (axios) => ({
    getAll: (params) => axios.get('/a/account_bank', { params }),
    create: (data) => axios.post('/a/account_bank', data),
    update: (bankAccountId, data) => axios.patch(`/a/account_bank/${bankAccountId}`, data),
    delete: (bankAccountId) => axios.delete(`/a/account_bank/${bankAccountId}`),
});
