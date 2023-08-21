export default (axios) => ({
    getResultCodes: () => axios.get('/result_codes'),
});
