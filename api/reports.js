export default (axios) => ({
    getByHours: (params) => axios.get('/a/report/by_hour', { params }),
    getLeaderboards: (params) => axios.get('/a/report/by_top', { params }),
});
