export default (axios) => ({
    getSummary: (params) => axios.get('/a/history_summary', { params }),
});
