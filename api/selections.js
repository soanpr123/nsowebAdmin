export default (axios) => ({
    getProvinces: (params) => axios.get('/provinces', { params }),
    getDistricts: (provinceId, params) => axios.get(`/provinces/${provinceId}/districts`, { params }),
    getWards: (provinceId, districtId, params) => axios.get(`/provinces/${provinceId}/districts/${districtId}/wards`, { params }),
    getCountries: (params) => axios.get('/countries', { params }),
    getCurrencyUnits: (params) => axios.get('/currency_units', { params }),
    getPaymentMethods: (params) => axios.get('/payment_methods', { params }),
    getChannels: (params) => axios.get('/channels', { params }),
    getGenders: (params) => axios.get('/genders', { params }),
    getServices: (params) => axios.get('/services', { params }),
    getItems: (params) => axios.get('/items', { params }),
    getResultCodes: (params) => axios.get('/result_codes', { params }),
    getBanks: (params) => axios.get('/banks', { params }),
    getGroups: (params) => axios.get('/groups', { params }),
    getItemUnits: (params) => axios.get('/item_units', { params }),
    getFlights: (params) => axios.get('/flights', { params }),
});
