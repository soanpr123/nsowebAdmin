export default (axios) => ({
    getAll: (params) => axios.get('/a/bank_official', { params }),
    update: (bankId, data) => axios.patch(`/a/bank_official/${bankId}`, data),
});
