export default (axios) => ({
    getDetail: (params) => axios.get('/a/partner_reference/get_one', { params }),
});
